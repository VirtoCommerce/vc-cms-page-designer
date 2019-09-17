const path = require('path');
const webpack = require('webpack');

const ROOT = path.resolve(__dirname, 'src');
const DESTINATION = path.resolve(__dirname, 'dist');

let platformUrl;
const setupApi = function(env) {
    switch (env.mode) {
        case 'production':
            platformUrl = "'https://admin.virtocommerce.com/'";
            break;
        case 'staging':
            platformUrl = "'http://vc-admin-test.azurewebsites.net/'";
            break;
        case 'development':
            platformUrl = "'http://localhost/'";
            break;
    }
};

module.exports = (env, argv) => {
    setupApi(env);
    return {
        context: ROOT,

        entry: {
            'main': './main.ts'
        },

        output: {
            filename: 'designer.bundle.js',
            path: DESTINATION
        },

        resolve: {
            extensions: ['.ts', '.js'],
            modules: [
                ROOT,
                'node_modules'
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                __PLATFORM_URL__: platformUrl
            })
        ],

        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                // /****************
                // * PRE-LOADERS
                // *****************/
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    use: 'source-map-loader'
                }
                // {
                //     enforce: 'pre',
                //     test: /\.ts$/,
                //     exclude: /node_modules/,
                //     use: 'tslint-loader'
                // },

                // /****************
                // * LOADERS
                // *****************/
                // {
                //     test: /\.ts$/,
                //     exclude: [ /node_modules/ ],
                //     use: 'awesome-typescript-loader'
                // }
            ]
        },

        devtool: 'source-map',
        devServer: {}
    };
}
