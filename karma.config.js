var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        browsers: ['ChromeHeadless', 'FirefoxHeadless'],
         customLaunchers: {
            FirefoxHeadless: {
                base: 'Firefox',
                flags: [ '-headless' ],
            },
        },
        files : [
            {
                pattern: 'test-context.js', 
                watched: false
            }
        ],
        reporters: ['progress'],
        summaryReporter: {
            show: 'all'
        },
        frameworks: ['jasmine'],
        preprocessors: {
            'test-context.js' : ['webpack', 'sourcemap']
        },
        webpack: {
            mode: "development",
            devtool: 'inline-source-map',
            module: {
                rules : [
                    {
                        test: /\.scss$/,
                        use: [
                            {
                                loader: 'style-loader',
                                options: {
                                    injectType: 'lazyStyleTag'
                                }
                            },
                            {
                                loader: 'css-loader'
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sassOptions: {
                                        noIeCompat: true //For IE 8, which we don't support
                                    }
                                }
                            }
                        ]
                    },
                    {
                        test: /\.css$/,
                        use : [
                            {
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader'
                            }
                        ]
                    },
                    {
                        test: /\.js$/,
                        use :[
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env', '@babel/preset-react'],
                                    plugins: [require('@babel/plugin-syntax-dynamic-import').default]
                                }
                            }
                        ],
                        exclude: /node_modules/
                    }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    "React": "react"
                }),
            ]
        },
        webpackServer: {
            noInfo: true
        }
    });
};
