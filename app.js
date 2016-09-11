// node-modules
var app = require('koa')();
var route = require('koa-route');
var serve = require('koa-static');
var views = require('koa-views');
var request = require('request');
const exec = require('child_process').exec;
var bodyParser = require('koa-bodyparser');

app.use(bodyParser());

// ectをテンプレートエンジンとして指定
app.use(views(__dirname + '/views', {
  map: {
    html: 'ect'
  }
}));

// GET /remocon
app.use(route.get('/remocon', function *(){	
	yield this.render('remocon.ect', {	
    title: 'リモコンアプリ', 
  });
}));

// POST /ir
app.use(route.post('/ir', function *(){
	console.log('body: ' + JSON.stringify(this.request.body));
	var target = 'sudo ./sendir ./signal/' + JSON.stringify(this.request.body.file).replace(/"/g,"") + '.dat 1 1'
	exec(target, (err, stdout, stderr) => {
	//callback処理
	if (err) { console.log(err); }
		console.log(stdout);
	});
	this.body=true;
}));

// static files
app.use(serve(__dirname + '/public'));

app.listen(3000, function () { console.log('app listening on port 3000!'); });
