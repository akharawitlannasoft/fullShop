var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api', (req, res) => {
	User.findOne({ 'local.username': req.body.username }, (err, user) => {

		if (err) res.json(err)
			
		if (user) {
			res.json({ message: 'No' })
		} else {
			var newUser = new User();

			newUser.local.username = req.body.username
			newUser.local.password = newUser.generateHash(req.body.password)
			newUser.local.firstname = req.body.firstname
			newUser.local.lastname = req.body.lastname
			newUser.local.email = req.body.email
			newUser.local.rule = req.body.rule

			newUser.save((err) => {
				if(err) res.json(err)
				res.json({ message: 'OK', username: req.body.username, rule: req.body.rule })
			})
		}
	})
})


router.get('/api', (req, res, next) => {
  User.find((err, users) => {
    if(err) res.json(err)
    res.json(users)
  })
})

router.get('/api/:user_id', (req, res) => {
	User.findById(req.params.user_id, (err, user) => {
		if(err) res.json(err)
		res.json(user)
	})
})

router.put('/api/:user_id', (req, res) => {
	User.findById(req.params.user_id, (err, user) => {
		if(err) res.json(err)

		// user.local.firstname = req.body.firstname
		// user.local.lastname = req.body.lastname
		// user.local.email = req.body.email
		// user.local.rule = req.body.rule

		user.local.firstname = "1"
		user.local.lastname = "1"
		user.local.email = "1"
		user.local.rule = "2"

		user.save((err) => {
			if(err) res.json(err)
			res.json({ message: 'OK! Updated!' })
		})
	})
})




module.exports = router;
