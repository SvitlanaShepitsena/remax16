var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var bs = browserSync.create();
var config = require('./gulp.config')();
var del = require('del');
var path = require('path');
var nib = require('nib');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({lazy: true});
var port = process.env.PORT || config.defaultPort;
var stat = require('./gulp/svstat');
gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

stat.run(gulp,$,_);





gulp.task('styles', ['clean-styles'], function () {
	log('Compiling Stylus --> CSS');
	return gulp
		.src(config.stylus)
		.pipe($.plumber())
		.pipe($.stylus({use: nib()}))
		.pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
		.pipe(gulp.dest(config.temp))
		.pipe(bs.stream());
});
gulp.task('git.a', ['fonts'], function () {
	log('adding to git repo');
	return gulp
		.src(config.build)
		.pipe($.plumber())
		.pipe($.git.add())
});
gulp.task('git.c', ['git.a'], function () {
	log('commit');
	return gulp
		.src(config.build)
		.pipe($.plumber())
		.pipe($.git.add())
});
gulp.task("jade", function () {
	log('Compiling Jade to HTML');
	return gulp.src(config.jade)
		.pipe($.plumber())
		.pipe($.newer({dest: config.scripts, ext: '.html'}))
		.pipe($.jade())
		.pipe(gulp.dest(config.scripts))
});
gulp.task('jade:watch', ['jade'], bs.reload);
gulp.task('fonts', function () {
	log('Copying fonts');
	return gulp
		.src(config.fonts)
		.pipe(gulp.dest(config.build + 'fonts'));
});




gulp.task('images', ['favicon'], function () {
	log('Copying and compressing the images');
	var pngFilter = $.filter(config.images+'/*.jpg', {restore: true});
	return gulp
		.src(config.images)
		.pipe($.imagemin({optimizationLevel: 6}))
		.pipe(pngFilter)
		.pipe($.smushit())
		.pipe(pngFilter.restore)
		.pipe(gulp.dest(config.build + 'img'));
});

gulp.task('copy-weird-directories',  function () {
	log('copy weird direct');
	var s = 'scripts/common/directives/';

	return gulp
		.src(config.client+s+"*.html")
		.pipe(gulp.dest(config.build+s));
});
gulp.task('favicon',  function () {
	log('copy favicon');

	return gulp
		.src(config.client+"favicon.ico")
		.pipe(gulp.dest(config.build));
});

gulp.task('copy-weird-directories2',  function () {
	log('copy weird direct');
	var s = 'scripts/common/directives/';

	return gulp
		.src(config.client+"assets/**/*")
		.pipe(gulp.dest(config.build+'assets'));
});


gulp.task('clean', function (done) {
	var delconfig = [].concat(config.build, config.temp);
	log('Cleaning: ' + $.util.colors.blue(delconfig));
	del(delconfig, done);
});
gulp.task('clean-fonts', function (done) {
	clean(config.build + 'fonts/**/*.*', done);
});
gulp.task('clean-images', function (done) {
	clean(config.build + 'images/**/*.*', done);
});
gulp.task('clean-styles', function (done) {
	clean(config.temp + '**/*.css', done);
});
gulp.task('clean-code', function (done) {
	var files = [].concat(
		config.temp + '**/*.js',
		config.build + '**/*.html',
		config.build + 'js/**/*.js'
	);
	clean(files, done);
});
gulp.task('stylus-watcher', function () {
	gulp.watch([config.stylus], ['styles']);
});
gulp.task('templatecache', ['clean-code'], function () {
	if (process.env.NODE_ENV === 'dev') {
		return;
	}
	log('Creating AngularJS $templateCache');
	return gulp
		.src(config.htmltemplates)
		.pipe($.minifyHtml({empty: true}))
		.pipe($.angularTemplatecache(
			config.templateCache.file,
			config.templateCache.options
		))
		.pipe(gulp.dest(config.temp));
});
gulp.task('wiredep', function () {
	log('Wire up the bower css js and our app js into the html');
	var options = config.getWiredepDefaultOptions();
	var wiredep = require('wiredep').stream;
	return gulp
		.src(config.index)
		.pipe(wiredep(options))
		.pipe($.inject(gulp.src(config.js)))
		.pipe(gulp.dest(config.client));
});
gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
	log('Wire up the app css into the html, and call wiredep ');
	return gulp
		.src(config.index)
		.pipe($.inject(gulp.src(config.css), {relative: true}))
		.pipe(gulp.dest(config.client));
});
gulp.task('build', ['buildFlow', 'fonts'], function () {
	log('Building everything');
	var msg = {
		title: 'gulp build',
		subtitle: 'Deployed to the build folder',
		message: 'Running `gulp serve-build`'
	};
	//del(config.temp);
	log(msg);
	notify(msg);
	gulp.run('images');
	gulp.run('copy-weird-directories');
});
gulp.task('injectCache', ['inject'], function () {
	var templateCache = config.temp + config.templateCache.file;
	return gulp
		.src(config.index)
		.pipe($.plumber())
		.pipe($.inject(
			gulp.src(templateCache, {read: false}), {
				starttag: '<!-- inject:templates:js -->'
				, relative: true
			}))
		.pipe(gulp.dest(config.client));
});
gulp.task('optimize', ['inject'], function () {
	log('Optimizing the javascript, css, html');
	del(config.build);
	var assets = $.useref.assets({searchPath: './app'});
	var cssFilter = $.filter('**/*.css', {restore: true});
	var jsLibFilter = $.filter('**/' + config.optimized.lib, {restore: true});
	var jsAppFilter = $.filter('**/' + config.optimized.app, {restore: true});
	return gulp
		.src(config.index)
		.pipe($.plumber())
		.pipe(assets)
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore)
		.pipe(jsLibFilter)
		.pipe($.uglify({mangle: false}))
		.pipe(jsLibFilter.restore)
		.pipe(jsAppFilter)
		.pipe($.ngAnnotate())
		.pipe($.babel({
			presets: ['es2015']
		}))
		.pipe($.uglify())
		.pipe($.rev())
		.pipe(jsAppFilter.restore)
		.pipe(assets.restore())
		.pipe($.useref())
		.pipe($.revReplace())
		.pipe(gulp.dest(config.build))
		.pipe($.rev.manifest())
		.pipe(gulp.dest(config.build));
});
var templateCache = config.temp + config.templateCache.file;
gulp.task('copy', ['optimize'], function () {
	return gulp.src(templateCache)
		.pipe(gulp.dest(config.build));
});
gulp.task('copyStyles', ['final'], function () {
	return gulp.src(config.temp + "/**/*.css")
		.pipe($.minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest(config.build));
});
gulp.task('final', ['copy', 'fonts'], function () {
	return gulp
		.src(config.build + 'index.html')
		.pipe($.inject(gulp.src(config.build + config.templateCache.file, {read: false}), {
			starttag: '<!-- inject:templates:js -->',
			relative: true
		}))
		.pipe(gulp.dest(config.build));
});
gulp.task('buildFlow', ['copyStyles'], function () {
	return gulp
		.src(config.build + 'index.html')
		.pipe($.inject(gulp.src(config.build + "main.css"), {
			starttag: '<!-- inject:css -->',
			relative: true
		}))
		.pipe($.minifyHtml())
		.pipe(gulp.dest(config.build));
})
/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump', function () {
	var msg = 'Bumping versions';
	var type = args.type;
	var version = args.version;
	var options = {};
	if (version) {
		options.version = version;
		msg += ' to ' + version;
	} else {
		options.type = type;
		msg += ' for a ' + type;
	}
	log(msg);
	return gulp
		.src(config.packages)
		.pipe($.print())
		.pipe($.bump(options))
		.pipe(gulp.dest(config.root));
});
gulp.task('serve-build', ['build'], function () {
	serve(false /* isDev */);
	gulp.run('git.c');
});
gulp.task('serve-dev', ['inject'], function () {
	serve(true /* isDev */);
});
gulp.task('test', ['vet', 'templatecache'], function (done) {
	startTests(true /* singleRun */, done);
});
gulp.task('autotest', ['vet', 'templatecache'], function (done) {
	startTests(false /* singleRun */, done);
});
////////////
function serve(isDev) {
	var nodeOptions = {
		script: config.nodeServer,
		delayTime: 0.5,
		env: {
			'PORT': port,
			'NODE_ENV': isDev ? 'dev' : 'build'
		},
		ext: 'js',
		//ignore:['./app/scripts/**/*.js']
		watch: ['./routes']
	};
	return $.nodemon(nodeOptions)
		.on('restart', function (ev) {
			log('*** nodemon restarted');
			log('files changed on restart:\n' + ev);
			setTimeout(function () {
				browserSync.notify('reloading now ...');
				browserSync.reload({stream: false});
			}, config.browserReloadDelay);
		})
		.on('start', function () {
			log('*** nodemon started');
			startBrowserSync(isDev);
		})
		.on('crash', function () {
			log('*** nodemon crashed: script crashed for some reason');
		})
		.on('exit', function () {
			log('*** nodemon exited cleanly');
		});
}
function changeEvent(event) {
	var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
	log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
function notify(options) {
	var notifier = require('node-notifier');
	var notifyOptions = {
		sound: 'Bottle',
		contentImage: path.join(__dirname, 'gulp.png'),
		icon: path.join(__dirname, 'gulp.png')
	};
	_.assign(notifyOptions, options);
	notifier.notify(notifyOptions);
}
function startBrowserSync(isDev) {
	if (args.nosync || browserSync.active) {
		return;
	}
	log('Starting browser-sync on port ' + port);
	if (isDev) {
		gulp.watch([config.stylusAll], ['styles'])
			.on('change', function (event) {
				changeEvent(event);
				browserSync.reload();
			});
		gulp.watch([config.jade], ['jade:watch'])
			.on('change', function (event) {
				console.log('reload hererer');
				browserSync.reload();
			});
		gulp.watch([config.js], bs.reload);
	} else {
		gulp.watch([config.stylus, config.js, config.html], ['optimize', browserSync.reload])
			.on('change', function (event) {
				changeEvent(event);
			});
	}
	var options = {
		proxy: 'localhost:' + port,
		port: 3000,
		files: isDev ? [
			config.client + 'scripts/**/*.js',
			config.client + 'scripts/**/*.jade',
			config.root + 'views/*.jade',
			config.client + '*.html',
			'!' + config.stylus,
			config.temp + '**/*.css'
		] : [],
		ghostMode: false,
		injectChanges: true,
		logFileChanges: true,
		logLevel: 'debug',
		notify: false,
		reloadDelay: 0 //1000
	};
	browserSync(options);
}
function clean(path, done) {
	log('Cleaning: ' + $.util.colors.blue(path));
	del(path, done);
}
function log(msg) {
	if (typeof(msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}
