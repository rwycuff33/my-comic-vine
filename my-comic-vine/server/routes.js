'use strict';

var config = require('./config/config.json');

module.exports = function (app) {

  // API
  app.use('/api/users', require('./api/user'));
  app.use('/api/volumes', require('./api/volume'));
  app.use('/api/issues', require('./api/issue'));
  app.use('/api/search', require('./api/search'));

  // Auth
  app.use('/auth', require('./auth'));

  app.route('/:url(api|app|bower_components|assets)/*')
    .get(function (req, res) {
      res.status(404).end();
    });

  app.route('/*')
    .get(function (req, res) {
      console.log('HERE');
      console.log(app.get('appPath') + '/index.html');
      console.log(__dirname + config.root);
      res.sendFile(
        app.get('appPath') + '/index.html',
        { root: __dirname + config.root }
      );
    });

};
