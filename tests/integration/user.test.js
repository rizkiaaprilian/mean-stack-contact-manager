//user.test.js

'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const config = require('../../config');

let mongoose;
let User;
let _user;
let newUserData = {
	email: 'milan.smith@test.com',
	password: 'password',
	name: 'Milan Smith'
};

before((done) => {
	User = require('../../app/models/user');
	done();
});

describe('User model test', () => {

	it('should authenticate a user with valid credentials', (done) => {
		User.authenticate(newUserData.email, newUserData.password, (err, user) => {
			if(err) throw err;
			should.exist(user);
			should.not.exist(user.password);
			should.not.exist(user.passwordSalt);
			user.email.should.equal(newUserData.email);
			done();
		});
	});

	it('should not authenticate user with invalid credentials', (done) => {
		User.authenticate(newUserData.email, 'wrongpass', (err, user) => {
			if(err) throw err;
			should.not.exist(user);
			done();
		});
	});
});