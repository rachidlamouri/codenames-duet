const express = require('express');

const app = express();

{
  /* eslint-disable global-require */
  const webpackConfig = require('../webpack.config.dev');
  const compiler = require('webpack')(webpackConfig);
  app.use(
    require('webpack-dev-middleware')(compiler, { publicPath: webpackConfig.output.publicPath }),
    require('webpack-hot-middleware')(compiler),
  );
  /* eslint-enable global-require */
}

const port = 8080;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`); // eslint-disable-line no-console
});
