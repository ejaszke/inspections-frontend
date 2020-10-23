// const path = require('path');

module.exports = {
    webpack: {
        alias: {
            // "@api": path.resolve(__dirname, "./src/app/api")
        }
    },
    mode: "development",
    devServer: {
        port: 9001,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://localhost:8080",
                changeOrigin: true,
            },
        },
    },
};
