import { Actor } from 'apify'
import { PlaywrightCrawler, log } from 'crawlee'
import { router } from './routes.js'
import { BASE_URL } from './constants.js'

await Actor.init()

log.setLevel(log.LEVELS.DEBUG)
log.debug('Setting up crawler.')

const crawler = new PlaywrightCrawler({
  // maxRequestsPerCrawl: 200,
  requestHandler: router,
  headless: true
})

const Urls: string[] = [
  `${BASE_URL}/c/sapatos`,
  `${BASE_URL}/c/bolsas`,
];

await crawler.run(Urls)
await Actor.exit()
