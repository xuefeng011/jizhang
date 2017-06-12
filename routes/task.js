var express = require('express');
var router = express.Router();


var schedule = require("node-schedule");


var SpiderService = require('../service/spiderservice');


global.JOB = {
	Version: "",
	HasRun: false,
	j: null,
	InTasking: false,
	TaskRemark: ""
};

router.get('/', function(req, res) {
	res.status(200);
	// SpiderService.start(5,"task")
	res.json({
		errorCode: 1,
		errorMessage: "成功",
		datas: "test"
	});
	res.end();
});

router.get('/get', function(req, res) {
	res.status(200);
	res.json({
		errorCode: 1,
		errorMessage: `[TASK] get ${global.JOB.HasRun}_${global.JOB.Version}_${process.pid}`,
		JOB: global.JOB
	});
	res.end();
});

router.get('/cancel', function(req, request) {
	if (global.JOB.HasRun && !!global.JOB.j) {
		request.status(200);
		global.JOB.j.cancel();
		console.log(`[TASK] cancel ${global.JOB.Version}_${process.pid}`)
		request.json({
			errorCode: -1,
			errorMessage: `[TASK] cancel ${global.JOB.Version}_${process.pid}`
		});
		global.JOB = {
			Version: "",
			HasRun: false,
			j: null,
			InTasking: false,
			TaskRemark: "CANCEL"
		}
		request.end()
	} else {
		request.status(200);
		console.log(`[TASK] none ${global.JOB.Version}_${process.pid}`)
		request.json({
			errorCode: -1,
			errorMessage: `[TASK] none ${global.JOB.Version}_${process.pid}`
		});
		request.end()
	}

});

router.get('/set', function(req, request) {

	var RULETIME = req.query.min || 0;

	var processid = process.pid;

	var rule = new schedule.RecurrenceRule();　
	rule.minute = RULETIME;

	if (global.JOB.HasRun) {
		request.status(200);
		console.log(`[TASK] already ${global.JOB.Version}_${process.pid}`)
		request.json({
			errorCode: -1,
			errorMessage: `[TASK] already ${global.JOB.Version}_${process.pid}`,
			JOB: global.JOB
		});
		request.end()

	} else {
		global.JOB = {
			Version: new Date().toLocaleString(),
			HasRun: true,
			InTasking: false,
			TaskRemark: "SETing"
		}
		var jobname = `${global.JOB.Version}_${processid}_${RULETIME}`
		console.log(`[TASK] set  ${jobname}`);
		global.JOB.j = schedule.scheduleJob(rule, function() {
			console.log(`[TASK] start  ${jobname}`);

			///--------------
			///--------------
			///  start job
			///--------------
			///
			///  cnt 数量
			///  jobname
			///  source type : 5 食行
			///--------------
			///--------------
			SpiderService.start(req.query.cnt || 10, jobname, req.query.sourcetype || 5)
		});
		request.status(200);
		request.json({
			errorCode: 1,
			errorMessage: `[TASK] start  ${jobname}`,
			JOB: global.JOB
		});
		request.end()
	}



});



module.exports = router;