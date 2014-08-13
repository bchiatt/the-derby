'use strict';

var _     = require('lodash'),
    Mongo = require('mongodb');

function Gambler(o){
  this.name    = o.name;
  //this.spouse  = o.spouse;
  //this.photo   = o.photo;
  //this.cash    = o.cash;
  //this.assets  = o.assets;
  //this.results = o.results;
}

Object.defineProperty(Gambler, 'collection', {
  get: function(){return global.mongodb.collection('gamblers');}
});

Gambler.prototype.save = function(cb){
  Gambler.collection.save(this, cb);
};

Gambler.prototype.removeAsset = function(o, cb){
  var asset = _.remove(this.assets, function(asset){return asset.name === o.name;});

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
