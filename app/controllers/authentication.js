//authentication.js

'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.signin = signin;

function signin (req, res, next) {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(404).send(info);
		}
		req.logIn(user, (err) => {
			if(err) {
				return next(err);
			}
			res.status(200).json(user);
		});
	})(req, res, next);
}