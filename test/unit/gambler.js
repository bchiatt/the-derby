/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Mongo     = require('mongodb'),
    Gambler   = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'the-derby-test';

describe('Person', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });

  describe('constructor', function(){
    it('should create a new Gambler object', function(){
      var o = {name:'Erica', photo:'example.com', cash:'5005', spouseName:'Billy', spousePhoto:'google.com'},
          g = new Gambler(o);

      expect(g).to.be.instanceof(Gambler);
      expect(g.name).to.equal('Erica');
      expect(g.photo).to.equal('example.com');
      expect(g.cash).to.equal(5005);
      expect(g.spouse.name).to.equal('Billy');
      expect(g.spouse.photo).to.equal('google.com');
      expect(g.assets).to.have.length(0);
      expect(g.results.wins).to.equal(0);
      expect(g.results.losses).to.equal(0);
    });
  });

  describe('#save', function(){
    it('should save a gambler to the db', function(done){
      var wendy = new Gambler({name:'Wendy'});
      wendy.save(function(err, gambler){
        expect(gambler._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(4);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find one gamblers', function(done){
      var id = '000000000000000000000003';
      Gambler.findById(id, function(gambler){
        expect(gambler.name).to.equal('James Bond');
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.assets[1].value).to.equal(5000);
        done();
      });
    });
  });

  describe('#removeAsset', function(){
    it('should remove asset from gambler and add value to cash', function(){
      Gambler.findById('000000000000000000000003', function(gambler){
        gambler.removeAsset('tuxedo');

        expect(gambler.assets).to.have.length(1);
        expect(gambler.cash).to.equal(5400);
      });
    });
  });

  describe('#addAsset', function(){
    it('should add asset to gambler', function(){
      var o = {name:'Astin Martin', photo:'geocities.com', value:'90000'};
      Gambler.findById('000000000000000000000003', function(gambler){
        gambler.addAsset(o);

        expect(gambler.assets).to.have.length(3);
        expect(gambler.assets[2].name).to.equal('Astin Martin');
        expect(gambler.assets[2].photo).to.equal('geocities.com');
        expect(gambler.assets[2].value).to.equal(90000);
      });
    });
  });
});

