//contact_test.js

'use strict';

/**
* important : set environment to test
*/
process.env.NODE_ENV = 'test';

const http = require('http');
const request = require('request');
const chai = require('chai');
const should = chai.should();
chai.use(require('chai-things'));
//const userFixtures = require('../fixtures/user');


let app;
let appServer;
let mongoose;
let User;
let Contact;
let config;
let baseUrl;
let apiUrl;

before((done) => {
	//boot app
	//start listening to request
	app = require('../../server');
	config = app.get('config');
	baseUrl = config.baseUrl;
	apiUrl = `${baseUrl}/api`;
	appServer = http.createServer(app);
	appServer.on('listening', () => {
		mongoose = app.get('mongoose');
		//User = mongoose.models('users');
		//Contact = require(app.get('root') + '/app/models/contact');
		Contact = mongoose.model('Contact');
	});
	appServer.listen(config.port);
	done();
});

after((done) => {
	//close app
	//cleanup database
	//close connection to mongo
	appServer.on('close', () => {
		setTimeout(() => done(), 1000);
	});
	mongoose.connection.db.dropDatabase((err) => function(){
		if(err) throw err;
		mongoose.conenction.close(() => {
			appServer.close();
		});
	});
	done();
});

afterEach((done) => {
	//remove contact
	Contact.remove({}, (err) => {
		if(err) throw err;
		done();
	});
});

describe('Create contact', () => {

	it('Should create a new contact', (done) => {
		request({
			method: 'POST',
			url: `${apiUrl}/contacts`,
			form: {
				'email': 'milan.smith@test.com',
				'name' : 'Milan Smith'
			},
			json: true
		}, (err, res, body) => {
			if (err) throw err;
			res.statusCode.should.equal(201);
			done();
		});
	});
});
describe('Get contacts', () => {
	before((done) => {
		Contact.collection.insert([
			{email: 'milan.smith@test.com', name: 'Milan Smith'},
			{email: 'jane.doe@test.com', name: 'Jane Doe'},
			{email: 'john.doe@test.com', name: 'John Doe'}
		], (err, res, body) => {
			if(err) throw err;
			done();
		});
	});
	it('should get all contacts', (done) => {
		request({
			method: 'GET',
			url: `${apiUrl}/contacts`,
			json: true
		}, (err, res, body) => {
			if(err) throw err;
			should.equal(res.statusCode, 200);
			body.should.be.instanceOf(Array);
			body.length.should.equal(3);
			body.should.contain.a.thing.with.property('email', 'milan.smith@test.com');
			body.should.contain.a.thing.with.property('email', 'jane.doe@test.com');
			body.should.contain.a.thing.with.property('email', 'john.doe@test.com');
			done();
		});
	});
});
describe('Get contact', function(){
	let _contact;

	before((done) => {
		Contact.create({email: 'milan.smith@test.com'}, (err, contact) => {
			if(err) throw err;
			_contact = contact;
			done();
		});
	});
	it('should get a single contact by id', (done) => {
		request({
			method: 'GET',
			url: `${apiUrl}/contacts/${_contact.id}`,
			json: true
		}, (err, res, body) => {
			if(err) throw err;
			res.statusCode.should.equal(200);
			body.email.should.equal(_contact.email);
			done();
		});
	});
	it('should not get a single contact if the id is not 24 characters', (done) => {
		request({
			method: 'GET',
			url: `${apiUrl}/contacts/U5AZrj3hjzj3zusT8JnZbWFu`,
			json: true
		}, (err, res, body) => {
			if(err) throw err;
			res.statusCode.should.equal(404);
			done();
		});
	});
});
describe('Update contact', () => {
	let _contact;

	before((done) => {
		Contact.create({email: 'milan.smith@test.com', name: 'Milan Smith'}, (err, contact) => {
			if(err) throw err;
			_contact = contact;
			done();
		});
	});

	it('should update an existing contact', (done) => {
		request({
			method: 'PUT',
			url: `${apiUrl}/contacts/${_contact.id}`,
			json: true,
			form: {
				'name' : 'Milan Smith updated'
			}
		}, (err, res, body) => {
			if(err) throw err;
			//console.log(_contact);
			//console.log(res.body);
			res.statusCode.should.equal(200);
			res.body.name.should.equal('Milan Smith');
			res.body.email.should.equal(_contact.email);
			done();
		});
	});
});
describe('Delete contact', () => {
	var _contact;

	before((done) => {
		Contact.create({email: 'milan.smith@test.com'}, (err, contact) => {
			if(err) throw err;
			_contact = contact;
			done();
		});
	});

	it('should delete existing contact', (done) => {
		request({
			method: 'DELETE',
			json: true,
			url: `${apiUrl}/contacts/${_contact.id}`
		}, (err, res, body) => {
			if (err) throw err;
			res.statusCode.should.equal(204);
			should.not.exist(body);
			done();
		});
	});
});