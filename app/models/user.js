//user.js
'use strict';

const mongoose = require('mongoose');
const passwordHelper = require('../helpers/password');

const Schema = mongoose.Schema;
const _ = require('lodash');

var UserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	name: {
		type: String
	},
	password: {
		type: String,
		required: true,
		select: false
	},
	passwordSalt: {
		type: String,
		required: true,
		select: false
	},
	active: {
		type: Boolean,
		default: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

UserSchema.statics.authenticate = authenticateUser;
function authenticateUser(email, password, callback){
	this.findOne({email: email})
	.select('+password +passwordSalt')
	.exec((err, user) => {
		if (err) {
			return callback(err);
		}
		//no user found, return empty user
		if (!user) {
			return callback(err, user);
		}

		//verify with password helper
		passwordHelper.verify(password, user.password, user.passwordSalt, (err, result) => {
			if (err) {
				return callback(err, null);
			}
			//password doesnt match
			if (result === false) {
				return callback(err, null);
			}

			//remove password & salt from result
			user.password = undefined;
			user.passwordSalt = undefined;
			return callback(err, user);
		});
	});
}

module.exports = mongoose.model('User', UserSchema);