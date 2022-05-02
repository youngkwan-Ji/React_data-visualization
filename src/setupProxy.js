const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    const socketProxy= createProxyMiddleware('/socket.io', {
        target: 'http://localhost:8290',
        changeOrigin: true,
        ws: true,
        logLevel: 'debug',
    });

    app.use(socketProxy);
};