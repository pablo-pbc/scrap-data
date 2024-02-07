import { PlaywrightCrawler, log } from 'crawlee'
import { router } from './route.js'

// This is better set with CRAWLEE_LOG_LEVEL env var
// or a configuration option. This is just for show 😈
log.setLevel(log.LEVELS.DEBUG)

log.debug('Setting up crawler.')
const crawler = new PlaywrightCrawler({
  // I'm using a low maxRequestsPerCrawl so the
  // crawler ends quicker for demo purposes
  maxRequestsPerCrawl: 50,

  // Instead of the long requestHandler with
  // if clauses we provide a router instance.
  requestHandler: router
})

await crawler.run(['https://warehouse-theme-metal.myshopify.com/collections'])
