import routerConfig from './router';

function connect(router) {
    /* eslint-disable */
    return function(options) {
        for (const moduleName of Object.keys(routerConfig)) {
            const configs = routerConfig[moduleName];

            for (const config of configs) {
                console.log(config);
                const fn = router[config.method.toLocaleLowerCase()];
                if (fn) {
                    fn.call(router, config.router, config.handler);
                }
            }
        }
    };
}

export default connect;
