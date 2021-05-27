//読み込み
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//実行
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//webフォルダを公開する
app.use(express.static('public'));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myapp_omi'
});

con.connect(function(err){
    if(err){
        throw err;
    }
    console.log('DB Connected!!!');
});

//get通信の場合
app.get('/', function(req, res){
    res.send('Get Hello World!!!');
});

//post通信の場合
app.post('/', function(req, res){
    res.send('Post Hello World!!!');
});


//リスト
app.get('/list', function(req, res){
	const sql = 'select user_id as userId , password from tbl_users';
	
	con.query(sql, function(err, result){
		if (err){
			throw err;
		} else{
			res.json(result);
		}
	});
});

//検索
app.post('/search', function(req, res){
	const userId = req.body.userId;

	const sql = 'select user_id as userId , password from tbl_users where user_id = ?';
	
	con.query(sql, [userId], function(err, result){
		if (err){
			throw err;
		} else{
			res.json(result);
		}
	});
});

//追加
app.post('/add', function(req, res){

	console.log(req.body.userId);
	console.log(req.body.password);

	const userId = req.body.userId;
	const password = req.body.password;

	const sql = 'insert into tbl_users(user_id,password)values(?, ?)';
	
	con.query(sql, [userId, password], function(err, result){
		if (err){
			throw err;
		} else{
			res.json(result);
		}
	});
});

//修正
app.post('/update', function(req, res){
	const userId = req.body.userId;
	const password = req.body.password;

	const sql = 'update tbl_users set password = ? where user_id = ?';
	
	con.query(sql, [password, userId], function(err, result){
		if (err){
			throw err;
		} else{
			res.json(result);
		}
	});
});

//削除
app.post('/delete', function(req, res){
	const userIds = req.body.userIds;
	console.log(userIds);
	
	const sql = 'delete from tbl_users where user_id in (?);';
	
	con.query(sql, [userIds], function(err, result){
		if (err){
			throw err;
		} else{
			res.json(result);
		}
	});
});

//ポート指定で外部からのアクセス許可
app.listen(8000, function(){
    console.log('Express server listening...');
});
