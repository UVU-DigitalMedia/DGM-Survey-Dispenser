'use strict';

var chai   = require('chai');
var expect = chai.expect;
var hash   = require('../../lib/hash');

describe('hash', function () {

  it('should hash a string', function () {
    var str = 'correct horse battery staple';
    return expect(hash.hash(str)).to.eventually.not.eql(str);
  });

  it('should check to see if a string matches hashed str', function () {
    var str = 'correct horse battery staple';
    return hash.hash(str)
      .then(function (hashedStr) {
        return expect(hash.check(str, hashedStr)).to.eventually.eql(true);
      });
  });

  it('should fail if a string doesn\'t match', function () {
    var str = 'correct horse battery staple';
    return hash.hash(str)
      .then(function (hashedStr) {
        return expect(hash.check(str, hashedStr + 'i'))
          .to.eventually.eql(false);
      });
  });

  it('should take a custom salt work factor', function () {
    this.timeout(0);
    var str = 'correct horse battery staple';
    var now = Date.now();
    return hash.hash(str, 1)
      .then(function () {
        expect(Date.now() - now).to.be.below(10);
        now = Date.now();
        return hash.hash(str, 13);
      })
      .then(function () {
        expect(Date.now() - now).to.be.above(400);
      });
  });

});
