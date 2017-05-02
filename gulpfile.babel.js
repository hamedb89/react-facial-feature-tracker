import gulp from 'gulp';
import webpack from 'webpack-stream';
import BrowserSync from 'browser-sync';
import eslint from 'gulp-eslint';
import path from 'path';
import glob from 'glob';

const bs = BrowserSync.create();

gulp.task('js', () => {
	gulp.src('./src/*.jsx')
		.pipe(webpack({
			entry: {
				demo: './src/demo',
				'react-facial-feature-tracker': './src/react-facial-feature-tracker'
			},
			output: {
				path: path.resolve('build'),
				filename: '[name].js'
			},
			resolve: {
				extensions: ['', '.js', '.jsx']
			},
			module: {
				loaders: [
					{
						test: /\.jsx?$/,
						exclude: /node_modules/,
						loader: 'babel-loader',
						query: { presets: ['es2015', 'stage-0', 'react'] }
					}
				]
			}
		}))
		.pipe(gulp.dest('build'))
		.pipe(gulp.dest('demo/build'));
});

gulp.task('lint', () => {
	return gulp.src('src/*.jsx')
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('build', ['lint', 'js']);

gulp.task('watch', () => {
	bs.init({
		server: {
			baseDir: './demo'
		}
	});

	gulp.watch('src/*.jsx', ['js']);
	gulp.watch('build/*.js').on('change', bs.reload);
	gulp.watch('demo/*.html').on('change', bs.reload);
});

gulp.task('default', ['build', 'watch']);
