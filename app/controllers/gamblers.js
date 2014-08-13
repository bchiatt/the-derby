'use strict';

var Gambler = require('../models/gambler');

exports.index = function(req, res){
  Gambler.all(function(err, gamblers){
    res.render('gamblers/index', {gamblers:gamblers});
  });
};

exports.sellAsset = function(req, res){
  Gambler.findById(req.params.id, function(err, gambler){
    gambler.removeAsset(req.params.name);
    var isDivorced = !this.assets ? true : false;
    console.log(gambler);
    gambler.save(function(){
      res.send({id: req.params.id, name: req.params.name, isDivorced: isDivorced, cash: gambler.cash});
    });
  });
};

exports.init = function(req, res){
  res.render('gamblers/init');
};

exports.create = function(req, res){
  var g = new Gambler(req.body);
  g.save(function(err, gambler){
    res.redirect('/gamblers/' + gambler._id);
  });
};

exports.show = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    console.log('Gambler', gambler);
    res.render('gamblers/show', {gambler:gambler});
  });
};

exports.initAsset = function(req, res){
  res.render('gamblers/initAsset', {id:req.params.id});
};

exports.addAsset = function(req, res){
  Gambler.findById(req.params.id, function(gambler){
    gambler.addAsset(req.body);
    gambler.save(function(err, gambler){
      res.redirect('/gamblers/' + req.params.id);
    });
  });
};
