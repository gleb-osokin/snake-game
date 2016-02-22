var path = require('path'),
    webpack = require('webpack'),
    _ = require('underscore'),
    
    frontendPath = 'frontend/';

var aliases = {
        Window: frontendPath + 'global/Window.js',
        Phaser: frontendPath + 'global/Phaser.js',
        GlobalConsts: frontendPath + 'consts/GlobalConsts.js',
        MathUtils: frontendPath + 'utils/MathUtils.js'
    };

var webpackConfigSkeleton = {
    context: __dirname,
    entry: {
        main: [path.resolve(frontendPath + 'main.js')]
    },
    resolve: {
        alias: _.mapObject(aliases, function(val) { return path.resolve(val); })
    },
    output: {
        path: path.resolve(path.join(__dirname, 'public', 'js')),
        filename: 'main.js'
    }
};

function watch(done) {

    var compiler = webpack(webpackConfigSkeleton);

    compiler.watch({
        aggregateTimeout: 300,
        poll: true
    }, function(err, stats) {
        if (err) {
            console.log(err);
        }
    });
}

function build(done) {
    var compiler = webpack(webpackConfigSkeleton);

    compiler.run(function(err, stats) {
        if (err) {
            console.log(err);
        }
        done();
    });
}

module.exports = {
    build: build,
    watch: watch
}