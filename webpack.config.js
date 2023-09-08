const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/setup.ts',
    experiments: {
        outputModule: true
    },
    output: {
        filename: 'setup.mjs',
        path: path.resolve(__dirname, 'packed'),
        library: {
            type: 'module'
        },
        clean: true
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: '**/*.html', to: '[path][name][ext]', context: 'src/app', noErrorOnMissing: true },
                { from: 'manifest.json', to: 'manifest.json', noErrorOnMissing: true },
                { from: 'data.json', to: 'data.json', noErrorOnMissing: true },
                { from: 'data-toth.json', to: 'data-toth.json', noErrorOnMissing: true },
                { from: 'data-aod.json', to: 'data-aod.json', noErrorOnMissing: true },
                { from: 'data-aod-toth.json', to: 'data-aod-toth.json', noErrorOnMissing: true },
                { from: 'src/assets', to: 'assets', noErrorOnMissing: true }
            ]
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};
