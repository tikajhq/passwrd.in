const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin-next');

module.exports = defineConfig({
  lintOnSave: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: [ 
            '/',
            '/memorable',
            '/passphrase',
            '/domain',
            '/developer',
            '/custom',
            '/why',
            '/blog',
            '/blog/how-to-create-strong-passwords',
            '/blog/password-security-best-practices',
            '/blog/how-our-random-system-works'
          ],
        })
      );
    }
  },
  chainWebpack: config => {
    config.module
      .rule('markdown')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end();
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    },
  },
});
