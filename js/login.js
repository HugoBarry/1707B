$(function(){
	var flag = localStorage.getItem('flag');
	if (flag == 1) {
		window.location = '../index.html';
	}
	$('.rBtn button').click(function(){
		if ($('#phoneNum').val() == '') {
			$('.phoneError').html('用户名不能为空');
		}else if ($('#pwd').val() == '') {
			$('.pwdError').html('密码不能为空');
		}else{
			$.post('../php/login.php',{username:$('#phoneNum').val(),password:$('#pwd').val(),sessionid:document.cookie.slice(10)},function(data){
				console.log(data)
				var obj = typeof data == 'object' ? data : eval("("+data+")");
				if (obj.res == 1) {
					localStorage.setItem('flag',1);
					localStorage.setItem('id',obj.id);
					window.location = '../index.html'
				}else if (obj.res == -1) {
					$('.pwdError').html('账号信息异常');
				}else{
					$('.pwdError').html('账号或密码错误');
				}
			})
		}
	})
	$('#phoneNum').focus(function(){
		$('.phoneError').html('');
	})
	$('#pwd').focus(function(){
		$('.pwdError').html('');
	})
})