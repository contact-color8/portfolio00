		const getUserList = function(){
			let userInfoArray = [];

			$.ajax({
				url: './list',
				type: 'get',
				async: false
			})
			.done(function(data){
				userInfoArray = data;
			})
			.fail(function(){
				alert('error');
			});

			return userInfoArray;
		}		
		
		const getUser = function(userId){
			let userInfo = {
				"userId": userId
			};

			let retJson = {};
			
			$.ajax({
				url: './search',
				type: 'post',
				data: userInfo,
				async: false
			})
			.done(function(data){
				if(data && data.length > 0){
					retJson = data[0];
				}
			})
			.fail(function(){
				alert('error');
			});

			return retJson;
		}
	

		//描画処理
		const redraw = function(){
			let userInfoArray = getUserList();

			$('#view').empty();

			//liとして追加
			$('#view').append(
				$('<ul>')
				.addClass('table')
					.append(
						$('<li>').text('選択')
					)
					.append(
						$('<li>').text('ユーザーID')
					)
					.append(
						$('<li>').text('パスワード')
					)
				);

			//userInfoArrayの末尾を検索する
			for (let i = 0; i < userInfoArray.length; i++) {
				let userId = userInfoArray[i].userId;
				let password = userInfoArray[i].password;

				//liとして追加
				$('#view').append(
					$('<ul>')
					.addClass('table')
						.append(
							$('<li>')
								.append(
									$('<input>').attr('type', 'checkbox').val(userId)
								)
						)
						.append(
							$('<li>').text(userId)
						)
						.append(
							$('<li>').text(password)
						)
				);
			}
		};

		//ダイアログ 入力画面の処理
		const inputFunc = function(){

			let userId = $('#userId').val();
			let password = $('#password').val();
			
			//未入力項目のチェック
			let isError = false;
			$('.err').text('');

			//ユーザーIDが未入力の場合
			if(userId == ''){
				$('#msg-userId').text('ユーザーIDが未入力です');
				isError = true;
			}

			//パスワードが未入力の場合
			if(password == ''){
				$('#msg-password').text('パスワードが未入力です');
				isError = true;
			}

			//未入力項目があれば処理を止める
			if(isError == true){
				return;
			}

			$('#confirm-userId').text(userId);
			$('#confirm-password').text(password);

			//ダイアログ 確認画面を表示
			$('#input').hide();
			$('#confirm').show();
			$('#finish').hide();
		}

		//ダイアログ 確認画面の処理
		const confirmFunc = function(){
			let userId = $('#userId').val();
			let password = $('#password').val();

			//jsonをセット
			let userInfo = {
				"userId": userId,
				"password": password
			};

			$.ajax({
				url: './add',
				type: 'post',
				data: userInfo,
				async: false
			})
			.done(function(data){
				//ダイアログ 完了画面を表示
				$('#input').hide();
				$('#confirm').hide();
				$('#finish').show();
			})
			.fail(function(){
				alert('error');
			});
		}

		//ダイアログ 確定画面の処理
		const confirmUpdateFunc = function(){
			let userId = $('#userId').val();
			let password = $('#password').val();

			let userInfo = {
				"userId": userId,
				"password": password,
			};

			$.ajax({
				url: './update',
				type: 'post',
				data: userInfo,
				async: false
			})
			.done(function(data){
				//ダイアログ 完了画面を表示
				$('#input').hide();
				$('#confirm').hide();
				$('#finish').show();
			})
			.fail(function(){
				alert('error');
			});
		}

		//ダイアログ 完了画面の処理
		const finishFunc = function(){
			//描画処理
			redraw();

			//ダイアログ すべて非表示
			$('#input').hide();
			$('#confirm').hide();
			$('#finish').hide();

			$('#dlg').dialog('close');                
		}


