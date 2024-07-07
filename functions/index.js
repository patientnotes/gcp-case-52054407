import { onRequest } from 'firebase-functions/v2/https'
import { info, debug, warn, error } from 'firebase-functions/logger'

export const testLogging = onRequest(
  {
    region: 'australia-southeast1',
  },
  async (req, res) => {
    debug('Testing debug log level from gcp-case-52054407')
    info('Testing info log level from gcp-case-52054407')
    warn('Testing warn log level from gcp-case-52054407')
    error('Testing error log level from gcp-case-52054407')

    res.status(200).send('gcp-case-52054407 👋')
  }
)
