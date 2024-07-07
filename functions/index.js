import { onRequest } from 'firebase-functions/v2/https'
import { info, debug, warn, error } from 'firebase-functions/logger'

const version = 1

export const testLogging = onRequest(
  {
    region: 'australia-southeast1',
  },
  async (req, res) => {
    debug(`Testing debug log level from gcp-case-52054407 v${version}`)
    info(`Testing info log level from gcp-case-52054407 v${version}`)
    warn(`Testing warn log level from gcp-case-52054407 v${version}`)
    error(`Testing error log level from gcp-case-52054407 v${version}`)

    res.status(200).send(`gcp-case-52054407 v${version} 👋`)
  }
)
