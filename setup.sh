cd api;
yarn install;
cd ../app;
 yarn install;
npm run build && cp -R build ../api/src
cd ../api && yarn start
