'use strict';

var _     = require('lodash'),
    Mongo = require('mongodb');

function Gambler(o){
  this.name    = o.name;
  this.spouse  = {name:o.spouseName, photo:o.spousePhoto};
  this.photo   = o.photo;
  this.cash    = parseFloat(o.cash);
  this.assets  = [];
  this.results = {wins:0, losses:0};
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

Gambler.prototype.addAsset = function(o){
  this.assets.push({name:o.name, photo:o.photo, value:parseFloat(o.value)});
};

Gambler.prototype.removeAsset = function(name){
  var asset = _.remove(this.assets, function(asset){return asset.name === name;});
  this.cash += asset[0].value * 1;
};

Gambler.all = function(cb){
  Gambler.collection.find().toArray(cb);
};

Gambler.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Gambler.collection.findOne({_id:_id}, function(err, object){
    var gambler = changeProto(object);
    cb(gambler);
  });
};

//helper functions
function changeProto(obj){
  var gambler = _.create(Gambler.prototype, obj);

  return gambler;
}


module.exports = Gambler;
