const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost:7001',
            changeOrigin: true,
            ws: false,
            pathRewrite: {
                '^/api': '/api',
            },
        })
    );
};
