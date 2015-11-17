module.exports = function () {
    var client = './';
    var clientApp = client + 'app/';
    var scripts = client + 'app/scripts/';
    var report = './report/';
    var root = './';
    var server = './server.js';
    var temp = clientApp + '.tmp/';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var config = {
        /**
         * Files paths
         */
        alljs: [
            './app/scripts/**/*.js',
            './*.js'
        ],
        build: './build/',
        scripts:scripts,
        client: clientApp,
        css: temp + 'main.css',
        fonts: ['./app/bower_components/font-awesome/fonts/**/*.*','./app/bower_components/mdi/fonts/**/*.*','./app/bower_components/flexslider/fonts/**/*.*',],
        html: clientApp + '**/*.html',
        htmltemplates: clientApp + 'scripts/**/*.html',
        images: clientApp + 'img/**/*.*',
        index: clientApp + 'index.html',
        js: [
            scripts + '**/*.js',
        ],
        stylus: [clientApp + 'styles/main.styl'],
        stylusAll: [clientApp + 'styles/main.styl',clientApp + 'scripts/**/*styl'],
        jade: clientApp + 'scripts/**/*.jade',
        report: report,
        root: root,
        server: server,
        temp: temp,

        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                standAlone: false,
                root: 'scripts/'
            }
        },

        /**
         * browser sync
         */
        browserReloadDelay: 0,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './app/bower_components/',
        },
        packages: [
            './package.json',
            './bower.json'
        ],

        /**
         * Node settings
         */
        defaultPort: 5000,
        nodeServer: './server.js'

    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;

    ////////////////

};
