import Koa from 'koa';
const router = require('koa-router')();

const app = new Koa();


router.get('/', (ctx, next) => {
    ctx.response.body = '<h1>hello</h1>'
});

app.use(router.routes());

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
