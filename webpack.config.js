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
                { from: '**/*.html', to: '[path][name][ext]', context: 'src/app' },
                { from: 'manifest.json', to: 'manifest.json' },
                { from: 'data.json', to: 'data.json' },
                { from: 'src/assets', to: 'assets' }
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
