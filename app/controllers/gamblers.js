'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.destroy = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.removeAsset(req.params.name);
    var isDivorced = !this.assets ? true : false;
    gambler.save(function(err, gambler){
      res.send('gamblers/index', {id: req.params.id, name: req.params.name, isDivorced: isDivorced, cash: this.cash});
    });
  });
};

