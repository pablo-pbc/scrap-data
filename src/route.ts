import { createPlaywrightRouter, Dataset } from 'crawlee'

// createPlaywrightRouter() is only a helper to get better
// intellisense and typings. You can use Router.create() too.
export const router = createPlaywrightRouter()

// This replaces the request.label === DETAIL branch of the if clause.
router.addHandler('DETAIL', async ({ request, page, log }) => {
  log.debug(`Extracting data: ${request.url}`)

  const title = await page.locator('.product-meta h1').textContent()
  const sku = await page.locator('span.product-meta__sku-number').textContent()

  const priceElement = page
    .locator('span.price')
    .filter({
      hasText: '$'
    })
    .first()

  const currentPrice = await priceElement.textContent()
  const rawPrice = currentPrice?.split('$')[1]
  const price = Number(rawPrice?.replace(',', ''))

  const inStockElement = page
    .locator('span.product-form__inventory')
    .filter({
      hasText: 'In stock'
    })
    .first()

  const inStock = (await inStockElement.count()) > 0

  const results = {
    url: request.url,
    title,
    sku,
    currentPrice: price,
    availableInStock: inStock
  }

  log.debug(`Saving data: ${request.url}`)
  await Dataset.pushData(results)
  // await Dataset.exportToJSON('saved-products')
  // await Dataset.exportToCSV('saved-products')
})

router.addHandler(
  'COLLECTION',
  async ({ page, enqueueLinks, request, log }) => {
    log.debug(`Enqueueing pagination for: ${request.url}`)
    // We are now on a COLLECTION page. We can use this to paginate through and enqueue all products,
    // as well as any subsequent pages we find

    await page.waitForSelector('.product-item > a')
    await enqueueLinks({
      selector: '.product-item > a',
      label: 'DETAIL' // <= note the different label
    })

    // Now we need to find the "Next" button and enqueue the next page of results (if it exists)
    const nextButton = await page.$('a.pagination__next')
    if (nextButton) {
      await enqueueLinks({
        selector: 'a.pagination__next',
        label: 'COLLECTION' // <= note the same label
      })
    }
  }
)

// This is a fallback route which will handle the start URL
// as well as the LIST labeled URLs.
router.addDefaultHandler(async ({ request, page, enqueueLinks, log }) => {
  log.debug(`Enqueueing categories from page: ${request.url}`)
  // This means we're on the start page, with no label.
  // On this page, we just want to enqueue all the COLLECTION pages.

  await page.waitForSelector('.collection-block-item')
  await enqueueLinks({
    selector: '.collection-block-item',
    label: 'COLLECTION'
  })
})
