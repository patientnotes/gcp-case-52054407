# GCP Support Case 52054407

This is a reproduction of the issue reported in https://github.com/firebase/firebase-functions/issues/1580.

The symptom is that quite recently (first detected `2024-06-27 18:55:02.663 AEST`) log messages emitted by `firebase-functions/logger`'s `warn` function are showing up in Google Cloud Log Explorer as errors rather than warnings. 

With this code:

```
import { onRequest } from 'firebase-functions/v2/https'
import { info, debug, warn, error } from 'firebase-functions/logger'

export const testLogging = onRequest(
  {
    region: 'australia-southeast1',
  },
  async (req, res) => {
    debug(`Testing debug log level`)
    info(`Testing info log level`)
    warn(`Testing warn log level`)
    error(`Testing error log level`)

    res.status(200).send(`👋`)
  }
)
```

We see the following in the logs, which is showing the `warn` as an error:

<img width="1405" alt="incorrect_warn_screenshot" src="https://github.com/patientnotes/gcp-case-52054407/assets/15758/0443916d-86a3-4fc7-a89d-854654a56cc7">

On closer inspection, the warn is outputting `severity: "ERROR"`.

## Diagnosis

On a new project with just these dependencies, the issues doesn't present itself:

```
"firebase-admin": "^12.2.0",
"firebase-functions": "^5.0.1",
```

But the addition of this introduces the issue:

```
"@google-cloud/functions-framework": "v3.4.0"
```

Downgrading to `v3.3.0` brings back the correct logging behaviour.

Accordingly, this seems like an issue introduced in the https://github.com/GoogleCloudPlatform/functions-framework-nodejs/releases/tag/v3.4.0. 


## Deploying

```
firebase deploy --only functions:testLogging
```
