const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

import test from './routers/test';
console.log(test);

router.get('/', (ctx, next) => {
  
});

app.use(router.routes());

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});