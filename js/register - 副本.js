$(function(){
	var flag = localStorage.getItem('flag');
	if (flag == 1) {
		window.location = '../index.html';
	}
	yzcode();
	// 四位数字验证码
	function yzcode(){
		$.get('../php/code.php',function(data){
			$('div.code').html(data)
		})
	}
	// 短信验证函数
	function get(num){
		$.get('../php/yzcode.php',function(data){
			// console.log(data)a
			localStorage.setItem('code',data);
			$.ajax({
			    type: 'post',
			    url: 'https://route.showapi.com/28-1',
			    dataType: 'json',
			    data: {
			        "showapi_appid": '60038',
			        "showapi_sign": 'a026a0c1838641bab15eaf93e93af5a4',
			        "mobile":num,
			        "content":"{'a':'尊敬的用户','b':'"+data+"','c':'5'}",
			        "tNum":"T170317002475",
			        "big_msg":""

			    }
			});
			setTimeout(function(){
				localStorage.removeItem('code')
			},5*60*1000)
		})
	}
	localStorage.removeItem('code');
	var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
	var reg1 = /^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/;
	$('.login_nav li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		// console.log($(this).parent().next().children().children('.u.p'))
		$('input').css({
			'border-color':'#ccd1d7',
		}).siblings('span').html('').end().siblings('img').addClass('hidden').end().val('')
	})
	$('#phone').click(function(){
		$(this).parent().next().children().children('.u.p').show().siblings().hide();
	})
	$('#mail').click(function(){
		$(this).parent().next().children().children('.u.m').show().siblings().hide();
	})
	$('input').focus(function(){
		$(this).siblings('img').addClass('hidden');
		$(this).css('border-color','#ccd1d7');
		$(this).siblings('span').html('');
	})
	$('#phoneNum ').blur(function(){
		if ($(this).val() == '') {
			$('.p li').eq(0).children('input').css('border-color','red')
			$('.p li').eq(0).children('.icon').hide()
			$('.p li').eq(0).children('img').removeClass('hidden')
			$('.p li').eq(0).children('span').html('请输入手机号');
			$('#btn').attr('disabled','disabled');
			return;	
		}else if (!reg.test($(this).val())) {
			$('.p li').eq(0).children('.icon').hide()
			$('.p li').eq(0).children('img').removeClass('hidden')
			$('.p li').eq(0).children('span').html('请输入正确的大陆手机号');
			$('.p li').eq(0).children('input').css('border-color','red');
			$('#btn').attr('disabled','disabled');
			return;
		}else{
			$.post('../php/select.php?'+Math.random(),{phone:$(this).val(),status:0},function(data){
				if (data == 1) {
					$('.p li').eq(0).children('.icon').hide()
					$('.p li').eq(0).children('img').removeClass('hidden')
					$('.p li').eq(0).children('span').html('该手机号已经注册，您可以<a href="login.html">直接登录</a>');
					$('.p li').eq(0).children('input').css('border-color','red');
					$('#btn').attr('disabled','disabled');
					return;
				}else{
					$('.p li').eq(0).children('input').css('border-color','#ccd1d7')
					$('.p li').eq(0).children('.icon').show()
					$('.p li').eq(0).children('img').addClass('hidden');
					$('#btn').removeAttr('disabled','disabled');
				}
			})
		}
	})
	$('#yzcode').blur(function(){
		if ($(this).val() == '') {
			$('.p li').eq(1).children('input').css('border-color','red')
			$('.p li').eq(1).children('.icon').hide()
			$('.p li').eq(1).children('img').removeClass('hidden')
			$('.p li').eq(1).children('span').html('请输入验证码');
			$('#btn').attr('disabled','disabled');
			return;	
		}else if ($(this).val()!=$('.code').html()) {
			$('.p li').eq(1).children('.icon').hide()
			$('.p li').eq(1).children('img').removeClass('hidden')
			$('.p li').eq(1).children('span').html('验证码不正确');
			$('.p li').eq(1).children('input').css('border-color','red')
			$('#btn').attr('disabled','disabled');
			return;
		}else{
			$('.p li').eq(1).children('input').css('border-color','#ccd1d7')
			$('.p li').eq(1).children('.icon').css('display','inline-block')
			$('.p li').eq(1).children('img').addClass('hidden');
			$('#btn').removeAttr('disabled');
		}
	})
	$('#msg').blur(function(){
		if ($(this).val() == '') {
			$('.p li').eq(2).children('input').css('border-color','red')
			$('.p li').eq(2).children('.icon').hide()
			$('.p li').eq(2).children('img').removeClass('hidden')
			$('.p li').eq(2).children('span').html('请输入短信验证码');
			return;	
		}else if (localStorage.getItem('code') == '' || localStorage.getItem('code') == undefined || $(this).val() != localStorage.getItem('code')){
			$('.p li').eq(2).children('input').css('border-color','red')
			$('.p li').eq(2).children('.icon').hide()
			$('.p li').eq(2).children('img').removeClass('hidden')
			$('.p li').eq(2).children('span').html('验证码不正确');
			return;
		}else{
			$('.p li').eq(2).children('input').css('border-color','#ccd1d7')
			$('.p li').eq(2).children('.icon').show()
			$('.p li').eq(2).children('img').addClass('hidden');
		}
	})
	$('#pwd').blur(function(){
		if ($(this).val() == '') {
			$('.p li').eq(3).children('input').css('border-color','red')
			$('.p li').eq(3).children('.icon').hide()
			$('.p li').eq(3).children('img').removeClass('hidden')
			$('.p li').eq(3).children('span').html('请设置密码');
			return;	
		}else if($(this).val().length < 6 || $(this).val().length>16){
			$('.p li').eq(3).children('input').css('border-color','red')
			$('.p li').eq(3).children('.icon').hide()
			$('.p li').eq(3).children('img').removeClass('hidden')
			$('.p li').eq(3).children('span').html('密码长度为6-16位');
			return;	
		}else if (reg1.test($(this).val()) == false) {
			$('.p li').eq(3).children('input').css('border-color','red')
			$('.p li').eq(3).children('.icon').hide()
			$('.p li').eq(3).children('img').removeClass('hidden')
			$('.p li').eq(3).children('span').html('密码由字母数字下划线至少两种组成');
		}else{
			$('.p li').eq(3).children('input').css('border-color','#ccd1d7')
			$('.p li').eq(3).children('.icon').show()
			$('.p li').eq(3).children('img').addClass('hidden');
		}
	})
	$('.p .rBtn button').click(function(){
		if ($('.p input').val() == '') {
			$('.p li').eq(0).children('.icon').hide();
			$('.p li').eq(0).children('img').removeClass('hidden');
			$('.p li').eq(0).children('span').html('手机号不能为空');
			$('.p li').eq(0).children('input').css('border-color','red');
			$('.p li').eq(1).children('.icon').hide();
			$('.p li').eq(1).children('img').removeClass('hidden');
			$('.p li').eq(1).children('span').html('验证码不能为空');
			$('.p li').eq(1).children('input').css('border-color','red');
			$('.p li').eq(2).children('.icon').hide();
			$('.p li').eq(2).children('img').removeClass('hidden');
			$('.p li').eq(2).children('span').html('短信验证码不能为空');
			$('.p li').eq(2).children('input').css('border-color','red');
			$('.p li').eq(3).children('.icon').hide()
			$('.p li').eq(3).children('img').removeClass('hidden')
			$('.p li').eq(3).children('span').html('密码不能为空');
			$('.p li').eq(3).children('input').css('border-color','red')
			return;
		}else if ($('#yzcode').val()!=$('.code').html()) {
			$('.p li').eq(1).children('.icon').hide()
			$('.p li').eq(1).children('img').removeClass('hidden')
			$('.p li').eq(1).children('span').html('验证码不正确');
			$('.p li').eq(1).children('input').css('border-color','red')
			return;
		}else if (localStorage.getItem('code') == '' || localStorage.getItem('code') == undefined || $('#msg').val() != localStorage.getItem('code')) {
			$('.p li').eq(2).children('input').css('border-color','red')
			$('.p li').eq(2).children('.icon').hide()
			$('.p li').eq(2).children('img').removeClass('hidden')
			$('.p li').eq(2).children('span').html('验证码不正确');
			return;
		}else if ($('#pwd').val().length < 6 || $('#pwd').val().length>16) {
			$('.p li').eq(2).children('input').css('border-color','red')
			$('.p li').eq(2).children('.icon').hide()
			$('.p li').eq(2).children('img').removeClass('hidden')
			$('.p li').eq(2).children('span').html('密码长度不符');
			return;
		}else{
			$.post('../php/select.php?'+Math.random(),{phone:$('#phoneNum').val(),status:0},function(data){
				if (data == 1) {
					$('.p li').eq(0).children('.icon').hide()
					$('.p li').eq(0).children('img').removeClass('hidden')
					$('.p li').eq(0).children('span').html('该手机号已经注册，您可以<a href="login.html">直接登录</a>');
					$('.p li').eq(0).children('input').css('border-color','red');
					yzcode();
					localStorage.removeItem('code');
					return;
				}else{
					$.post('../php/register.php',{phoneNum:$('#phoneNum').val(),psw:$('#pwd').val(),status:0},function(data){
						if (data==1) {
							window.location = 'success.html';
						}else{
							$('.tip').html('注册失败，请检查网络').css('color','red')
						}
					})
				}
			})
		}
	})
	// 点击发送短信
	var num = 30;
	var	timer = null;
	$('#btn').click(function(){
		clearInterval(timer);
		timer = setInterval(timeout,1000)
		function timeout(){
			num--;
			if (num>0) {
				$('#btn').html(num+'秒').attr('disabled','disabled');
				$('#btn').css({'color':'gray','cursor':'default'});
			}
			if(num<10){
					$('#btn').html('0'+num+'秒').attr('disabled');
			}
			if(num == 0){
				num = 30;
				clearInterval(timer)
				$('.success.hide').css('display','none')
				$('#btn').html('重新获取').removeAttr('disabled');
				$('#btn').css({'cursor':'pointer','color':'#333'})
			}
		}
		get($('#phoneNum').val());
	})

	var mail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
	// 邮箱注册
	$('#mailNum ').blur(function(){
		if ($(this).val() == '') {
			$('.m li').eq(0).children('input').css('border-color','red')
			$('.m li').eq(0).children('.icon').hide()
			$('.m li').eq(0).children('img').removeClass('hidden')
			$('.m li').eq(0).children('span').html('请输入邮箱');
			$('#mbtn').attr('disabled','disabled');
			return;	
		}else if (!mail.test($(this).val())) {
			$('.m li').eq(0).children('.icon').hide()
			$('.m li').eq(0).children('img').removeClass('hidden')
			$('.m li').eq(0).children('span').html('请输入正确邮箱地址');
			$('.m li').eq(0).children('input').css('border-color','red');
			$('#mbtn').attr('disabled','disabled');
			return;
		}else{
			$.post('../php/select.php?'+Math.random(),{mail:$(this).val(),status:1},function(data){
				if (data == 1) {
					$('.m li').eq(0).children('.icon').hide()
					$('.m li').eq(0).children('img').removeClass('hidden')
					$('.m li').eq(0).children('span').html('该邮箱已经注册，您可以<a href="login.html">直接登录</a>');
					$('.m li').eq(0).children('input').css('border-color','red');
					$('#mbtn').attr('disabled','disabled');
					return;
				}else{
					$('.m li').eq(0).children('input').css('border-color','#ccd1d7')
					$('.m li').eq(0).children('.icon').show()
					$('.m li').eq(0).children('img').addClass('hidden');
					$('#mbtn').removeAttr('disabled','disabled');
				}
			})
		}
	})
	$('#myzcode').blur(function(){
		if ($(this).val() == '') {
			$('.m li').eq(1).children('input').css('border-color','red')
			$('.m li').eq(1).children('.icon').hide()
			$('.m li').eq(1).children('img').removeClass('hidden')
			$('.m li').eq(1).children('span').html('请输入验证码');
			$('#mbtn').attr('disabled','disabled');
			return;	
		}else if ($(this).val()!=$('.code').html()) {
			$('.m li').eq(1).children('.icon').hide()
			$('.m li').eq(1).children('img').removeClass('hidden')
			$('.m li').eq(1).children('span').html('验证码不正确');
			$('.m li').eq(1).children('input').css('border-color','red')
			$('#mbtn').attr('disabled','disabled');
			return;
		}else{
			$('.m li').eq(1).children('input').css('border-color','#ccd1d7')
			$('.m li').eq(1).children('.icon').css('display','inline-block')
			$('.m li').eq(1).children('img').addClass('hidden');
			$('#mbtn').removeAttr('disabled');
		}
	})
	$('#yzNum').blur(function(){
		if ($(this).val() == '') {
			$('.m li').eq(2).children('input').css('border-color','red')
			$('.m li').eq(2).children('.icon').hide()
			$('.m li').eq(2).children('img').removeClass('hidden')
			$('.m li').eq(2).children('span').html('请输入手机号');
			$('#mbtn').attr('disabled','disabled');
			return;	
		}else if (!reg.test($(this).val())) {
			$('.m li').eq(2).children('.icon').hide()
			$('.m li').eq(2).children('img').removeClass('hidden')
			$('.m li').eq(2).children('span').html('请输入正确的大陆手机号');
			$('.m li').eq(2).children('input').css('border-color','red');
			$('#mbtn').attr('disabled','disabled');
			return;
		}else{
			$.post('../php/select.php?'+Math.random(),{phone:$(this).val(),status:0},function(data){
				if (data == 1) {
					$('.m li').eq(2).children('.icon').hide()
					$('.m li').eq(2).children('img').removeClass('hidden')
					$('.m li').eq(2).children('span').html('该手机号已经绑定账号，您可以<a href="login.html">直接登录</a>');
					$('.m li').eq(2).children('input').css('border-color','red');
					$('#mbtn').attr('disabled','disabled');
					return;
				}else{
					$('.m li').eq(2).children('input').css('border-color','#ccd1d7')
					$('.m li').eq(2).children('.icon').show()
					$('.m li').eq(2).children('img').addClass('hidden');
					$('#mbtn').removeAttr('disabled','disabled');
				}
			})
		}
	})
	$('#Msg').blur(function(){
		if ($(this).val() == '') {
			$('.m li').eq(3).children('input').css('border-color','red')
			$('.m li').eq(3).children('.icon').hide()
			$('.m li').eq(3).children('img').removeClass('hidden')
			$('.m li').eq(3).children('span').html('请输入短信验证码');
			return;	
		}else if (localStorage.getItem('code') == '' || localStorage.getItem('code') == undefined || $(this).val() != localStorage.getItem('code')){
			$('.m li').eq(3).children('input').css('border-color','red')
			$('.m li').eq(3).children('.icon').hide()
			$('.m li').eq(3).children('img').removeClass('hidden')
			$('.m li').eq(3).children('span').html('验证码不正确');
			return;
		}else{
			$('.m li').eq(3).children('input').css('border-color','#ccd1d7')
			$('.m li').eq(3).children('.icon').show()
			$('.m li').eq(3).children('img').addClass('hidden');
		}
	})
	$('#mbtn').click(function(){
		clearInterval(timer);
		timer = setInterval(timeout,1000)
		function timeout(){
			num--;
			if (num>0) {
				$('#mbtn').html(num+'秒').attr('disabled','disabled');
				$('#mbtn').css({'color':'gray','cursor':'default'});
			}
			if(num<10){
				$('#mbtn').html('0'+num+'秒').attr('disabled');
			}
			if(num == 0){
				num = 30;
				clearInterval(timer)
				$('.success.hide').css('display','none')
				$('#mbtn').html('重新获取').removeAttr('disabled');
				$('#mbtn').css({'cursor':'pointer','color':'#333'})
			}
		}
		get($('#yzNum').val());
		console.log($('#yzNum').val())
	})
	$('#psw').blur(function(){
		if ($(this).val() == '') {
			$('.m li').eq(4).children('input').css('border-color','red')
			$('.m li').eq(4).children('.icon').hide()
			$('.m li').eq(4).children('img').removeClass('hidden')
			$('.m li').eq(4).children('span').html('请设置密码');
			return;	
		}else if($(this).val().length < 6 || $(this).val().length>16){
			$('.m li').eq(4).children('input').css('border-color','red')
			$('.m li').eq(4).children('.icon').hide()
			$('.m li').eq(4).children('img').removeClass('hidden')
			$('.m li').eq(4).children('span').html('密码长度为6-16位');
			return;	
		}else if (reg1.test($(this).val()) == false) {
			$('.m li').eq(4).children('input').css('border-color','red')
			$('.m li').eq(4).children('.icon').hide()
			$('.m li').eq(4).children('img').removeClass('hidden')
			$('.m li').eq(4).children('span').html('密码由字母数字下划线至少两种组成');
		}else{
			$('.m li').eq(4).children('input').css('border-color','#ccd1d7')
			$('.m li').eq(4).children('.icon').show()
			$('.m li').eq(4).children('img').addClass('hidden');
		}
	})

	$('#m button').click(function(){
		if ($('#m input').val() == '') {
			$('.m li').eq(0).children('input').css('border-color','red')
			$('.m li').eq(0).children('.icon').hide()
			$('.m li').eq(0).children('img').removeClass('hidden')
			$('.m li').eq(0).children('span').html('邮箱不能为空');
			$('.m li').eq(1).children('input').css('border-color','red')
			$('.m li').eq(1).children('.icon').hide()
			$('.m li').eq(1).children('img').removeClass('hidden')
			$('.m li').eq(1).children('span').html('验证码不能为空');
			$('.m li').eq(2).children('input').css('border-color','red')
			$('.m li').eq(2).children('.icon').hide()
			$('.m li').eq(2).children('img').removeClass('hidden')
			$('.m li').eq(2).children('span').html('手机号不能为空');
			$('.m li').eq(3).children('input').css('border-color','red')
			$('.m li').eq(3).children('.icon').hide()
			$('.m li').eq(3).children('img').removeClass('hidden')
			$('.m li').eq(3).children('span').html('短信验证码不能为空');
			$('.m li').eq(4).children('input').css('border-color','red')
			$('.m li').eq(4).children('.icon').hide()
			$('.m li').eq(4).children('img').removeClass('hidden')
			$('.m li').eq(4).children('span').html('密码不能为空');
			return;
		}else if ($('#myzcode').val()!=$('.code').html()) {
			$('.m li').eq(1).children('.icon').hide()
			$('.m li').eq(1).children('img').removeClass('hidden')
			$('.m li').eq(1).children('span').html('验证码不正确');
			$('.m li').eq(1).children('input').css('border-color','red')
			return;
		}else if (localStorage.getItem('code') == '' || localStorage.getItem('code') == undefined || $('#Mmsg').val() != localStorage.getItem('code')) {
			$('.m li').eq(3).children('input').css('border-color','red')
			$('.m li').eq(3).children('.icon').hide()
			$('.m li').eq(3).children('img').removeClass('hidden')
			$('.m li').eq(3).children('span').html('验证码不正确');
			return;
		}else if ($('#psw').val().length < 6 || $('#psw').val().length>16) {
			$('.m li').eq(4).children('input').css('border-color','red')
			$('.m li').eq(4).children('.icon').hide()
			$('.m li').eq(4).children('img').removeClass('hidden')
			$('.m li').eq(4).children('span').html('密码长度不符');
			return;
		}else{
			$.post('../php/select.php?'+Math.random(),{mail:$('#mailNum').val(),status:0},function(data){
				if (data == 1) {
					$('.m li').eq(0).children('.icon').hide()
					$('.m li').eq(0).children('img').removeClass('hidden')
					$('.m li').eq(0).children('span').html('该手机号已经注册，您可以<a href="login.html">直接登录</a>');
					$('.m li').eq(0).children('input').css('border-color','red');
					yzcode();
					localStorage.removeItem('code');
					return;
				}else{
					$.post('../php/register.php',{mail:$('#mailNum').val(),psw:$('#psw').val(),yzNum:$('#yzNum').val(),status:'-1'},function(data){
						if (data==1) {
							window.location = 'success.html';
						}else{
							$('.tip').html('注册失败，请检查网络').css('color','red')
						}
					})
				}
			})
		}
	})
})