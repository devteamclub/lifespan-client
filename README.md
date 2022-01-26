# Web Client for LifeSpan app [![Dev](https://github.com/devteamclub/lifespan-client/actions/workflows/dev.yml/badge.svg)](https://github.com/devteamclub/lifespan-client/actions/workflows/dev.yml)

## Enviroments:
**DEV:** https://lifespan.plush.dev/

**STAGE:** https://lifespan.plush.network/

**PROD:** https://lifespan.plush.family/

Dev API Swagger: https://api.lifespan.plush.dev/swagger/


### Requirements
- Node.js v16.13.2

### Setup
```
npm install
npm run serve
npm run build
npm run lint
```

### .env
```
VUE_APP_API_URL=https://api.lifespan.plush.dev
```

## Hosting
**DNS** -> https://dash.cloudflare.com/

**Google Firebase** https://console.firebase.google.com/


## CI/CD
1. **Development** follows `GitFlow`.
2. **Preview** Every time you creat PR agains `master` branch, GithubActions will generate Preview link that will last for `7 days` on Firebase Hosting.
3. **Deployment** Every time you merge PR to `master` branch, GithubActions will build and deploy website to **DEV** enviroment.
4. **RollBack** You can alsways rollback via Firebase Hosting interface
