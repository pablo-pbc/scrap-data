import { createPlaywrightRouter, Dataset } from 'crawlee'
import { 
  labels, 
  BASE_URL,
  CATEGORY_URL,
  NEXT_PAGE,
  PRODUCT_URL,
  PRODUCT_NAME,
  PRODUCT_CODE,
  PRODUCT_COLOR,
  PRODUCT_DESCRIPTION,
  PRODUCT_PRICE,
  PRODUCT_SPECIAL_PRICE,
  PRODUCT_IMAGES,
  PRODUCT_MATERIAL,
  PRODUCT_COLLECTION,
  PRODUCT_GENDER,
  PRODUCT_CATEGORY,
  PRODUCT_BRAND
 } from './constants.js'

export const router = createPlaywrightRouter();

router.addHandler(labels.PRODUCT, async ({ request, page, log }) => {
  log.debug(`Extracting data: ${request.url}`);

  page.waitForSelector(PRODUCT_CODE)

  const name = await page.locator(PRODUCT_NAME).textContent();
  const code = await page.locator(PRODUCT_CODE).textContent();
  const color = await page.locator(PRODUCT_COLOR).textContent();  
  const price = await page.locator(PRODUCT_PRICE).textContent();
  const material = await page.locator(PRODUCT_MATERIAL).textContent();
  const category = await page.locator(PRODUCT_CATEGORY).allTextContents();
  const special_price = await page.locator(PRODUCT_SPECIAL_PRICE).textContent();  
  const description = await page.locator(PRODUCT_DESCRIPTION).textContent();
  const brand = PRODUCT_BRAND;
  const collection = PRODUCT_COLLECTION;
  const gender = PRODUCT_GENDER;
  
  const results = {
    url: request.url,
    name,
    code,
    color: color ?? "padrao",
    brand,
    collection: collection ?? "",
    gender: gender ?? "",
    description: description ?? "",
    price,
    special_price: special_price ?? "",
    material: material ?? "",
    category
  };

  log.debug(`Saving data: ${request.url}`);
  await Dataset.pushData(results);
  await Dataset.exportToJSON('saved-products');
});

router.addHandler(labels.CATEGORY, async ({ page, enqueueLinks, request, log }) => {
    log.debug(`Enqueueing pagination for: ${request.url}`);

    await page.waitForSelector(PRODUCT_URL);
    await enqueueLinks({
      selector: PRODUCT_URL,
      label: labels.PRODUCT
    });

    const nextButton = await page.$(NEXT_PAGE);
    if (nextButton) {
      await enqueueLinks({
        selector: NEXT_PAGE,
        label: labels.CATEGORY
      });
    };
  }
);

router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`);

  await page.waitForSelector(CATEGORY_URL);
  await enqueueLinks({
    selector: CATEGORY_URL,
    label: labels.CATEGORY
  });
});
