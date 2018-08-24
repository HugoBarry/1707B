(function(){
	// 判断是否登录
	setInterval(function(){
		var flag = localStorage.getItem('flag');
		if (flag == 0 || flag == undefined || flag == null) {
			localStorage.clear();
			$('body').css('background','#ccc');
			$('.header').css('background','#fff')
			$('.content').html('查看隐藏内容请<a href="html/login.html">登录</a>').css({
				border:"3px dotted gray",
				width: '99%',
				height:'570',
				"text-align":'center',
				"font-size":25,
				"overflow-y":"hidden",
				margin:'10px auto',
				"line-height":'500px',
				color:'#c0c'
			})
		}
	},1);
	$('body').css('background','#fff');
	var uid = localStorage.getItem('id');
	$.post('php/select.php',{id:uid,status:"-2"},function(data){
		var obj = typeof data == 'object' ? data : eval("("+data+")");
		if (obj.res == 1) {
			$('.center').show();
			$('.begin').hide();
			$('.user').html(obj.user);
		}
	})
	// 注销返回登录页
	$('.logout').click(function(){
		localStorage.clear();
		$('.center').hide();
		$('.begin').show();
	})
	
	// 导航时间
	var dt = new Date();
	var time = dt.toLocaleDateString();
	var t = time.split('/')
	$('.time').html(t[0]+'年'+t[1]+'月'+t[2]+'日');
	console.log(t)
	// 导航星期
	var w = dt.getUTCDay();
	if (w == 0) {
		$('.work').html('星期日')
	}else if (w == 1) {
		$('.work').html('星期一')
	}else if (w == 2) {
		$('.work').html('星期二')
	}else if (w == 3) {
		$('.work').html('星期三')
	}else if (w == 4) {
		$('.work').html('星期四')
	}else if (w == 5) {
		$('.work').html('星期五')
	}else if (w == 6) {
		$('.work').html('星期六')
	}
	// 定位
	(function(){
		var map = new AMap.Map('span');
		//获取用户所在城市信息
		function showCityInfo() {
		    //实例化城市查询类
		    var citysearch = new AMap.CitySearch();
		    //自动获取用户IP，返回当前城市
		    citysearch.getLocalCity(function(status, result) {
		        if (status === 'complete' && result.info === 'OK') {
		            if (result && result.city && result.bounds) {
		                var cityinfo = result.city;
		                var citybounds = result.bounds;
		                var str = cityinfo.split('市');
		                document.getElementById('dz').innerHTML = str[0];
		                // 天气查询
		                $.ajax({
		                	url:'https://restapi.amap.com/v3/weather/weatherInfo',
		                	type:'post',
		                	data:{
		                		key:'3025437aaadfb8aa89b9591311128da6',
		                		city:str[0],
		                		extensions:'all',
		                		output:'JSON',
		                	},
		                	success:function(data){
		                		console.log(data.forecasts[0]);
		                		$('.wd').html(data.forecasts[0].casts[0].daytemp+'℃ / '+data.forecasts[0].casts[0].nighttemp+'℃');
		                		$('.icon').css({
		                			width:30,
		                			height:30,
		                			'background-size':'30px 30px'
		                		})
		                		console.log(data.forecasts[0].casts[0].dayweather)
		                		if (data.forecasts[0].casts[0].dayweather == '晴') {
		                			$('#day').css({'background-image':'url(images/0.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '阴') {
		                			$('#day').css({'background-image':'url(images/9.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '多云') {
		                			$('#day').css({'background-image':'url(images/4.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '晴见多云') {
		                			$('#day').css({'background-image':'url(images/5.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '大部分多云') {
		                			$('#day').css({'background-image':'url(images/8.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '阵雨') {
		                			$('#day').css({'background-image':'url(images/10.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '雷阵雨') {
		                			$('#day').css({'background-image':'url(images/11.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '雷雨伴有冰雹') {
		                			$('#day').css({'background-image':'url(images/12.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '小雨') {
		                			$('#day').css({'background-image':'url(images/13.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '中雨') {
		                			$('#day').css({'background-image':'url(images/14.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '大雨') {
		                			$('#day').css({'background-image':'url(images/15.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '暴雨') {
		                			$('#day').css({'background-image':'url(images/16.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '大暴雨') {
		                			$('#day').css({'background-image':'url(images/17.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '特大暴雨') {
		                			$('#day').css({'background-image':'url(images/18.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '冻雨') {
		                			$('#day').css({'background-image':'url(images/19.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '雨夹雪') {
		                			$('#day').css({'background-image':'url(images/20.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '阵雪') {
		                			$('#day').css({'background-image':'url(images/21.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '小雪') {
		                			$('#day').css({'background-image':'url(images/22.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '中雪') {
		                			$('#day').css({'background-image':'url(images/23.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '大雪') {
		                			$('#day').css({'background-image':'url(images/24.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '暴雪') {
		                			$('#day').css({'background-image':'url(images/25.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '浮尘') {
		                			$('#day').css({'background-image':'url(images/26.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '扬沙') {
		                			$('#day').css({'background-image':'url(images/27.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '沙尘暴') {
		                			$('#day').css({'background-image':'url(images/28.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '强沙尘暴') {
		                			$('#day').css({'background-image':'url(images/29.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '雾') {
		                			$('#day').css({'background-image':'url(images/30.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '霾') {
		                			$('#day').css({'background-image':'url(images/31.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '风') {
		                			$('#day').css({'background-image':'url(images/32.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '大风') {
		                			$('#day').css({'background-image':'url(images/33.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '飓风') {
		                			$('#day').css({'background-image':'url(images/34.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '热带风暴') {
		                			$('#day').css({'background-image':'url(images/35.png)'})
		                		}else if (data.forecasts[0].casts[0].dayweather == '龙卷风') {
		                			$('#day').css({'background-image':'url(images/36.png)'})
		                		}
		                		
		                	}
		                })
		                //地图显示当前城市
		                map.setBounds(citybounds);
		            }
		        } else {
		            document.getElementById('dz').innerHTML = result.info;
		        }
		    });
		}
		showCityInfo()
	})()
})()