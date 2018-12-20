import Koa from 'koa';
import koaRouter from 'koa-router';

import routerConnect from './routers/index';

const router = koaRouter();
const app = new Koa();

routerConnect(router)({});

app.use(router.routes());

app.listen(3000, () => {
    /* eslint-disable-next-line */
    console.log('server is running at http://localhost:3000');
});
