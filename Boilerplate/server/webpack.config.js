// webpack.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = [
    {
        mode: 'development',
        entry: './electron/ElectronStarter.ts',
        target: 'electron-main',
        plugins: [
            new webpack.EnvironmentPlugin({
                ELECTRON_START_URL: 'http://localhost:3000', // use 'development' unless process.env.NODE_ENV is defined
            }),
            require('webpack-electron-reload')({
                path: path.join(__dirname, './dist/ElectronStarter.js'),
            })(),
        ],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /electron/,
                    use: [{ loader: 'ts-loader' }],
                },
            ],
        },
        output: {
            path: __dirname + '/dist',
            filename: 'ElectronStarter.js',
        },
        watch: true,
    },
    {
        mode: 'development',
        entry: './electron/Preload.ts',
        target: 'electron-main',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /electron/,
                    use: [{ loader: 'ts-loader' }],
                },
            ],
        },
        output: {
            path: __dirname + '/dist',
            filename: 'Preload.js',
        },
        watch: true,
    },
    {
        mode: 'development',
        entry: './electron/Renderer.ts',
        target: 'electron-main',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    include: /electron/,
                    use: [{ loader: 'ts-loader' }],
                },
            ],
        },
        output: {
            path: __dirname + '/dist',
            filename: 'Renderer.js',
        },
        watch: true,
    },
];
