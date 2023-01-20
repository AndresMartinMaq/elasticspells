# elasticspells

Welcome. This is a small project that was made to practice Vue and learn Elasticsearch. It's full of comments around illustrative examples of elasticsearch features and query types.

It's supposed to be a spellbook with D&D spells, but it only has 3 spells - this is by design, to keep the data simple so it is really obvious what the answer to each query should be.

## Project setup
```
yarn install
```

Seed:
Run  `node scripts/createSpellsIndex.js`

Run  `node scripts/addSampleDataToElastic.js`

If you ever need to reset your elasticsearch data, delete indexes (I use elasticvue for this) and re-run the above to recreate and seed.

### How to run
Need to run both backend and frontend.

Backend - go to path /backend, then run `npm run dev`

Frontend - go to path /frontend/elasticspells, run `npm run serve`


Note: Only running the backend serves the /public folder, where the vue app will put its built artifacts. If you make a change to the frontend code, to see it you need to be running the frontend app or to building it and then run the backend app. Just like with bit-jobs!

### Build it (compile and minify for production)
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

## Things that could be added
Make the linter consistent between the backend and the frontend.

Make it prefer single quotes.

Make it use css modules like bit-jobs has.

Break up routes into separate files.

Use express router.

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
