'use strict';

var chai    = require('chai');
var request = require('../test-helpers/request');
var app     = require('../test-helpers/app');
var Board   = require('../../models/board');

var expect  = chai.expect;

var url     = '/api/v1/boards';

describe(url, function () {

  before(function () {
    return app.init();
  });

  describe(url + '/colors', function () {
    it('GET', function () {
      return request
        .get(url + '/colors')
        .expect(200)
        .expect([
          'GREEN',
          'YELLOW',
          'ORANGE',
          'RED',
          'PURPLE',
          'BLUE',
          'SKY_BLUE',
          'LIME',
          'PINK',
          'BLACK',
          'NO_COLOR'
        ]);
    });
  });

  it('GET / should be an empty array', function () {
    return request
      .get(url)
      .expect(200)
      .expect([]);
  });

  it('POST / should create a new board', function () {
    return request
      .post(url)
      .send({
        name: 'New Board',
        color: 'NO_COLOR',
        order: 0
      })
      .expect(201)
      .expect('location', url + '/1');
  });

  it('GET /:id should get the board that was just created', function () {
    return request
      .get(url + '/1')
      .expect(200)
      .then(function (res) {
        expect(res.body).to.include.keys(
          'name',
          'color',
          'id',
          'order',
          'createdAt',
          'updatedAt'
        );
        expect(res.body.name).to.equal('New Board');
        expect(res.body.color).to.equal('NO_COLOR');
        expect(res.body.order).to.equal(0);
        expect(res.body.id).to.equal(1);
      });
  });

  it('PUT /:id should update the board that was just created', function () {
    return request
      .put(url + '/1')
      .send({
        name: 'New Board, New Name',
        color: 'NO_COLOR',
        order: 0
      })
      .expect(204)
      .then(function (res) {
        return request.get(url + '/1').expect(200);
      })
      .then(function (res) {
        expect(res.body.name).to.equal('New Board, New Name');
      });
  });

  it('DELETE /:id should remove the board that was just created', function () {
    return request
      .delete(url + '/1')
      .expect(204)
      .then(function (res) {
        return request.get(url + '/1').expect(404);
      })
      .then(function (res) {
        return request.delete(url + '/1').expect(404);
      });
  });

  it('GET /:id should get 404 for non-existant board', function () {
    return request
      .get(url + '/123')
      .expect(404);
  });

  it('GET /:id should get 404 for non-number id', function () {
    return request
      .get(url + '/the-board-i-really-want')
      .expect(404);
  });

  it('POST / should fail for no name', function () {
    return request
      .post(url)
      .send({
        color: 'NO_COLOR',
        order: 0
      })
      .expect(400);
  });

  it('POST / should fail for invalid color', function () {
    return request
      .post(url)
      .send({
        name: 'Some name',
        color: 'FUSCHIA',
        order: 0
      })
      .expect(400);
  });

  it('PUT / should insert board if one does not already exist', function () {
    return request
      .put(url + '/abc')
      .send({
        name: 'Some name',
        color: 'NO_COLOR',
        order: 0
      })
      .expect(201)
      .expect('location', url + '/abc');
  });

});
