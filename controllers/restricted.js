const restrictedUser = function(req, res) {
	if (!req.session.pageCount) {
		req.session.pageCount = 1;
	  } else {
		req.session.pageCount++;
	  }
	res.render('pages/restricted', { 
		pageCount: req.session.pageCount 
	});
}

module.exports = { restrictedUser }