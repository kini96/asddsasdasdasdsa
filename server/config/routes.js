<<<<<<< HEAD
=======


>>>>>>> 64db8ed4d6a1ecff8f6a08a2e758ddbac2c58c03
module.exports = function(app) {
	app.get('/partial/:partialArea/:partialName', function(req, res){
    	res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
	});

	app.post('/login', function(req, res, next) {
		var auth = passport.authenticate('local', function(err, user) {
			if (err) return next(err);
			if (!user) {
				res.send({success: false})
			}

			req.logIn(user, function(err) {
				if (err) return next(err);
				res.send({success: true, user: user});
			})
		});

		auth(req, res, next);
	});

	app.get('*', function(req, res) {
		res.render('index');
	});
}