var express = require('express');
var fs = require('fs');
var router = express.Router();
var user_details = require.main.require('./models/user_details');
var block_req = require.main.require('./models/account_block_request');

router.get('/', function(req, res){
	console.log('Report Analysis requested!');
	
	block_req.getAll(function(blockResults){
		user_details.getAll(function(userResults){
			res.render('accountManager/report',{userRes:userResults,blockRes:blockResults});
		});
	});
});

router.get('/ready', function(req, res){
	
	// fs.open('mynewfile2.txt', 'w', function (err, file) {
	  // if (err) throw err;
	  // console.log('Saved!');
	// });
	block_req.getAll(function(blockResults){
		user_details.getAll(function(result){
			// var resultData={
				// username: result.username,
				// phone: result.phone_number,
				// bio: result.bio,
				// dob: result.birthdate,
				// gender: result.gender,
				// account_status_id: result.account_status_id,
				// user_type_id: result.user_type_id,
				// account_type_id: result.account_type_id
			// }
			var resultData="";
			for(var i=0; i<result.length; i++){
				resultData=resultData+result[i].username+ " : " +result[i].phone_number+ " : " +result[i].bio+ " : " +result[i].birthdate+ " : " +result[i].gender+ " : " +result[i].account_status_id+ " : " +result[i].user_type_id+ " : " +result[i].account_type_id + "\n";
			}
				
			fs.writeFile('static/txt/lastReportFile.txt', resultData , function (err) {
			  if (err) throw err;
			  console.log('Saved!');
			});
			res.redirect('/accountManager/report');
		});
	});
});

module.exports = router;