//authentication.test.js

'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const config = require('../../config');

let baseUrl;
let userFixtures = {
	email : 'milan.smith@gmail.com'
};

before((done) => {
	baseUrl = config.baseUrl;
	done();
});

describe('Sign in user', () => {
	it('should sign in a user with valid credentials', (done) => {
		request({
			method: 'POST',
			url: baseUrl + '/auth/signin',
			form: {
				email: userFixtures.email,
				password: 'P@ssw0rd!'
			},
			json: true
		}, (err, res, body) => {
			if(err) throw err;

			res.statusCode.should.equal(200);
			body.email.should.equal(userFixtures.email);
			should.not.exist(body.password);
			should.not.exist(body.passwordSalt);
			done();
		});
	});

	it('should not sign in a user with invalid credentials', (done) => {
		request({
			method: 'POST',
			url: baseUrl + '/auth/signin',
			form: {
				email: userFixtures.email,
				password: 'invalidpassword'
			},
			json: true
		}, (err, res, body) => {
			if(err) throw err;
			res.statusCode.should.equal(400);
			body.message.should.equal('Invalid email or password.');
			done();
		});
	});
});