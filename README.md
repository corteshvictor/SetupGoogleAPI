# YouTube Data API (v3) Code Samples

### Setup A Google API in NodeJS - OAuth 2.0

- Create new project - https://console.developers.google.com/
- Search YouTube Data API and enable https://console.developers.google.com/apis/library?project= NAME_PROJECT
- OAuth consent screen
- Create Credentials OAuth Client ID
- Authorized redirection URIs - For use with requests from a web server
  - http://localhost:3000
  - http://localhost:3000/channel

Read more

- [Obtaining authorization credentials](https://developers.google.com/youtube/registering_an_application)
- [YouTube Data API Overview](https://developers.google.com/youtube/v3/getting-started)
- [API Reference](https://developers.google.com/youtube/v3/docs)

## .env

```
PORT
CLIENT_OAUTH_ID
CLIENT_OAUTH_SECRET
YOUTUBE_CHANNEL_ID
```
