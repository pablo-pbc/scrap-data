import { PlaywrightCrawler, Dataset } from 'crawlee'

const crawler = new PlaywrightCrawler({
  requestHandler: async ({ page, enqueueLinks, request }) => {
    // console.log(request.url)
    if (request.label === 'DETAIL') {
      // what to do when we get to a product detail page

      const title = await page.locator('.product-meta h1').textContent()
      const sku = await page.locator('.product-meta__sku-number').textContent()

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
          hasText: 'In Stock'
        })
        .first()

      const inStock = (await inStockElement.count()) > 0

      await Dataset.pushData({ title, sku, price, inStock })
      await Dataset.exportToJSON('saved-products')
      await Dataset.exportToCSV('saved-products')
    } else if (request.label === 'COLLECTION') {
      // what to do when we get to a collection page
      const productSelector = '.product-item > a'
      const nextPageSelector = 'a.pagination__next'

      await page.waitForSelector(productSelector)
      await enqueueLinks({
        selector: productSelector,
        label: 'DETAIL'
      })

      const nextButton = await page.$(nextPageSelector)
      if (nextButton) {
        await enqueueLinks({
          selector: nextPageSelector,
          label: 'COLLECTION'
        })
      }
    } else {
      const collectionSelector = '.collection-block-item'
      await page.waitForSelector(collectionSelector)
      await enqueueLinks({
        selector: collectionSelector,
        label: 'COLLECTION'
      })
    }
  }
})

await crawler.run(['https://warehouse-theme-metal.myshopify.com/collections'])
