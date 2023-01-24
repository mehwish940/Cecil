const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/hotel", { target: "http://localhost:4000/" })
  );
};