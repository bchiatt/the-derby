'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    home           = require('../controllers/home'),
    gamblers       = require('../controllers/gamblers');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());

  app.get('/', home.index);

  app.delete('/gamblers/:id/assets/:name', gamblers.destroy);
  app.get('/gamblers', gamblers.index);
  app.get('/gamblers/new', gamblers.init);
  app.post('/gamblers/new', gamblers.create);
  app.get('/gamblers/:id', gamblers.show);
  app.get('/gamblers/:id/assets/new', gamblers.initAsset);
  app.post('/gamblers/:id/assets/new', gamblers.addAsset);

  console.log('Routes Loaded');
};

