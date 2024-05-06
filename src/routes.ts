import { createPlaywrightRouter, Dataset, handleRequestTimeout } from 'crawlee'
import { 
  labels, 
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

  const name = await page.locator(PRODUCT_NAME).textContent();
  const code = await page.locator(PRODUCT_CODE).textContent();   
  const price = await page.locator(PRODUCT_PRICE).textContent();
  const category = await page.locator(PRODUCT_CATEGORY).allInnerTexts(); 

  const brand = PRODUCT_BRAND;
  const collection = PRODUCT_COLLECTION;
  const gender = PRODUCT_GENDER;
  const material = PRODUCT_MATERIAL;

  const description = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    return element ? element.textContent : "";
  }, PRODUCT_DESCRIPTION);

  const color = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    return element ? element.getAttribute('data-description') : "padrao";
  }, PRODUCT_COLOR);

  const special_price = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    return element ? element.textContent : "R$ 00,00";
  }, PRODUCT_SPECIAL_PRICE);

  const imagesLocator = await page.locator(PRODUCT_IMAGES).all();
  const images = await Promise.all(imagesLocator.slice(0,4).map(async (element) => {
      return await element.getAttribute('src');
  }));
  
  const results = {
    url: request.url,
    name,
    code: code?.split('Estilo: ')[1],
    color,
    brand,
    collection,
    gender,
    description: description != "" && description ? description : name,
    price,
    special_price,
    material,
    category: category.join(' > '),
    images
  };

  log.debug(`Saving data: ${request.url}`);
  await Dataset.pushData(results);
  await Dataset.exportToJSON('saved-products');
});

router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing pagination for: ${request.url}`);

  await page.waitForSelector(PRODUCT_URL);

  await enqueueLinks({
    selector: PRODUCT_URL,
    label: labels.PRODUCT
  });

  const nextButton = await page.$(NEXT_PAGE);
  if (nextButton) {
    log.debug(`Next Page URL: ${NEXT_PAGE}`);

    await enqueueLinks({
      selector: NEXT_PAGE
    });
  }
});