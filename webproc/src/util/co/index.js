import store from '../../store'
require('es6-promise').polyfill();
require('isomorphic-fetch');

const co = {
	openTtjj: function() {
		if (sessionStorage["common.fundinstalled"] == 'true') {
			if (sessionStorage["common.plant"].indexOf('ios') >= 0) {
				window.location = 'openttjjapp:';
			} else {
				window.eastmoney.JsOpenTTFundApp();
			}
		} else {
			location.href = "http://d.eastmoney.cn/fund_xz.aspx?t=shichang";
		}
		return false;
	},
	InitTtjj: function() {
		var ios = (function() {
			var ua = navigator.userAgent.toLowerCase();
			return (ua.search(/iphone|ipad|ipod/i) !== -1);
		})();
		if (!ios) {
			try {
				var obj = JSON.parse(window.eastmoney.jsGetBaseInfo());
				if (obj.appname) {
					sessionStorage.setItem("common.appname", obj.appname);
					sessionStorage.setItem("common.appversion", obj.appversion);
					sessionStorage.setItem("common.pass", obj.pass);
					sessionStorage.setItem("common.fundinstalled", obj.fundinstalled);
					sessionStorage.setItem("common.os", obj.os);
					sessionStorage.setItem("common.plant", obj.plant);
					sessionStorage.setItem("common.model", obj.model);
					sessionStorage.setItem("common.resolution", obj.resolution);
					sessionStorage.setItem("common.networktype", obj.networktype);
					sessionStorage.setItem("common.baseInfo", true);
				}
			} catch (error) {}
		} else {
			try {
				window.location.jsGetBaseInfo = function(obj) {

					sessionStorage.setItem("common.appname", obj.appname);
					sessionStorage.setItem("common.appversion", obj.appversion);
					sessionStorage.setItem("common.pass", obj.pass);
					sessionStorage.setItem("common.fundinstalled", obj.fundinstalled);
					sessionStorage.setItem("common.os", obj.os);
					sessionStorage.setItem("common.plant", obj.plant);
					sessionStorage.setItem("common.model", obj.model);
					sessionStorage.setItem("common.resolution", obj.resolution);
					sessionStorage.setItem("common.networktype", obj.networktype);
					sessionStorage.setItem("common.baseInfo", true);
				}
				window.location = 'requestJsGetBaseInfo:';
			} catch (error) {}
		}
	},
	getEnv: function() {
		if(navigator.userAgent.toLowerCase().indexOf("ttjj") > -1) return 'ttjj'
		if(navigator.userAgent.toLowerCase().indexOf("micromessenger") > -1) return 'wx'
		if( location.href.toLowerCase().indexOf('isin=dc') > -1) return 'dc'
		return 'wap'
	},
	setServer() {
		const IsDebug = (location.host.toLowerCase().indexOf("fundhdtest") > -1 || location.host.toLowerCase().indexOf("localhost") > -1) || location.host.toLowerCase().indexOf("172") > -1;
		return IsDebug ? "//fundhdtest.eastmoney.com/cfjapi/" : "//fundhd.eastmoney.com/cfjapi/"
	},
	getArgs(search) {
		let qs
		if(search) {
			qs = search.length > 0 ? search.slice(1) : ""
		} else {
			qs = location.search.length > 0 ? location.search.slice(1) : ""
		}
		var args = {}, // 保存要返回的数据对象
			items = (qs.length > 0 ? qs.split("&") : []), // &符split后的数组，数据项
			item = [], // =号split后的数组，每个数据项的json表达
			name = "",
			value = "", // 
			len = items.length,
			i;

		for (i = 0; i < len; i += 1) {

			item = items[i].split("=");
         
			// 查询字符串应该是被编码过的，所以解码
			name = (item[0]);
			value = (item[1]);

			if (name.length) {             
				args[name] = value;
			}
		}
		return args;
	},
	loadJS(url, callback) {
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.src = url;
		var done = false;
		script.onload = script.onreadystatechange = function() {
			if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
				done = true;
				callback();
				script.onload = script.onreadystatechange = null;
				head.removeChild(script);
			}
		};
		head.appendChild(script)
		return;
	},
	getRandom(len) {
		var charcode = {
			code: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			char: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n",
				"o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "x", "z"
			]
		};

		charcode = [].concat(charcode.code, charcode.char);

		len = len || 0;

		var allLen = charcode.length,
			rnd = function() {
				return Math.floor(Math.random() * allLen)
			},
			arr = [],
			i;

		for (i = 0; i < len; i++) {
			arr.push(charcode[rnd()]);
		}
		return arr.join("");
	},
	getArrRandom(arr) {
		const n =Math.floor(Math.random() * arr.length + 1) - 1
		return arr[n]
	},
	getPreNum(num) {
		const n = String(num)
		const r =  n.slice(0, n.indexOf('.'))
		return r
	},
	getSufNum(num) {
		const n = String(num)
		const r = n.slice(n.indexOf('.')+1)
		return r
	},
	getChiNum(num) {
		let n = Number(num)
		return n.toString().split('').reverse().join('').replace('0000', '万').split('').reverse().join('')
	},
	formatMoney(s, type) {  
		if (/[^0-9\.]/.test(s))
			return "0";
		if (s == null || s == "")
			return "0";
		s = s.toString().replace(/^(\d*)$/, "$1.");
		s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
		s = s.replace(".", ",");
		var re = /(\d)(\d{3},)/;
		while (re.test(s))
			s = s.replace(re, "$1,$2");
		s = s.replace(/,(\d\d)$/, ".$1");
		if (type == 0) { // 不带小数位(默认是有小数位)  
			var a = s.split(".");
			if (a[1] == "00") {
				s = a[0];
			}
		}
		return s;
	},
	getDate(date,type) {
		let datet = date || "/Date(1480780800000)/"
		const d = eval("new "+datet.slice(1, -1))
		return type == 1 ? Number(d.getMonth()+1) + '-' + d.getDate() : d.getFullYear() + '-' + Number(d.getMonth()+1) + '-' + d.getDate()
	},
	getDateAddOne(date) {
		let datet = date || "/Date(1480780800000)/"
		const d = eval("new "+datet.slice(1, -1))
		return Number(d.getMonth()+1) + '月' + Number(d.getDate() + 1) + '日'
	},
	getDateAddHour(date, hour) {
		let datet = date || "/Date(1480780800000)/"
		const d = eval("new "+datet.slice(1, -1))
		let e = Date.parse(d)
		e = Number(e) + hour * 3600000
		e = new Date(e)
		return e
	},
	setObjToQue(obj) {
		let que = JSON.stringify(obj)
		que = que.replace(/:/g, '=')
		que = que.replace(/"/g, '')
		que = que.replace(/,/g, '&')
		que = que.slice(1, -1);
		return que
	},
	verifyTel(mobile) {
		const reg = /^[1]+[3,4,5,7,8]+\d{9}$/;
		if (mobile && mobile.length == 11 && reg.test(mobile)) {
			return mobile;
		} else {
			return false;
		}
	},
	fillZero(number, digits) {
		number = String(number);
		var length = number.length;
		if (number.length < digits) {
			for (var i = 0; i < digits - length; i++) {
				number = "0" + number;
			}
		}
		return number;
	},
	createmd5(data, line) {
		const _getNumber = function(data) {
            if (data) {
                if (!isNaN(Number(data))) {
                    return Number(data);
                }
            }
            return 0
        }
		let result = 0
		if (data && data.length > 0) {
			for (var i = 0; i < data.length; i++) {
				result += _getNumber(data[i])
			}
		}
		var templine = ""
		if (line) {
			templine = String(line);
			for (i = 0; i < templine.length; i++) {
				result += Number(templine[i])
			}
		}
		return result
	},
	CNT(id) {
		if (id <= 10000) {
			return
		}
		setTimeout(function() {
			const result = fetch("https://acttg.eastmoney.com/pub/" + id,{mode:'no-cors', method:'POST'})
			result.then(res => {
				if (res.ok) {null}
			})
		}, 10);
	},
	CNT2(location, name){
		const _that = this
		const env = store.getState().UserInfo.Env
		const obj = {
			env:env || _that.getEnv(),
			page:'201704pintu',
			flocation:location,
			fname:name
		}
		const data = _that.setObjToQue(obj)
		setTimeout(function() {
			const result = fetch("https://acttg.eastmoney.com/pub/ttjjapp_activity_1_1?" + data,{mode:'no-cors', method:'POST'})
			result.then(res => {
				if (res.ok) {null}
			})
		}, 10);
	},
	isSupportSticky() {
		var prefixTestList = ['', '-webkit-', '-ms-', '-moz-', '-o-'];
		var stickyText = '';
		for (var i = 0; i < prefixTestList.length; i++) {
			stickyText += 'position:' + prefixTestList[i] + 'sticky;';
		}
		// 创建一个dom来检查
		var div = document.createElement('div');
		var body = document.body;
		div.style.cssText = 'display:none;' + stickyText;
		body.appendChild(div);
		var isSupport = /sticky/i.test(window.getComputedStyle(div).position);
		body.removeChild(div);
		div = null;
		return isSupport;
	},
	supportsCSS() {
		var div = document.createElement('div'),
			vendors = 'Khtml O Moz Webkit'.split(' '),
			len = vendors.length;
		return function(prop) {
			if (prop in div.style) return true;
			if ('-ms-' + prop in div.style) return true;
			prop = prop.replace(/^[a-z]/, function(val) {
				return val.toUpperCase();
			});
			while (len--) {
				if (vendors[len] + prop in div.style) {
					return true;
				}
			}
			return false;
		};
	},
	supportsCss3d() {
		var docElement = document.documentElement;
		var support = this.supportsCSS()('perspective');
		var body = document.body;
		if (support && 'webkitPerspective' in docElement.style) {
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = '@media (transform-3d),(-webkit-transform-3d){#css3_3d_test{left:9px;position:absolute;height:3px;}}';
			body.appendChild(style);
			var div = document.createElement('div');
			div.id = 'css3_3d_test';
			body.appendChild(div);

			support = div.offsetLeft === 9 && div.offsetHeight === 3;

		}
		return support;
	}
}

co.app = {
	goShare() {
		location.href='http://ttjj-huodong-weixin-share/'
	},
	goLogin() {
		location.href = 'emfundapp:tradeLogin()'	
	},
	checkLogin() {
		location.href = 'emfundapp:nativeLogin({"callbackMethodName": "window.checkLoginCallback"})'
	},
	fixHeadBar() {
		// location.href = 'emfundapp:headerInfo({"name":"","event":"","backevent":"","title":"' + document.title + '","vifylogin":""})':
		location.href = 'emfundapp:headerInfo({"name":"分享","event":"window.nativeShare()","backevent":"","title":"' + document.title + '","vifylogin":""})';
	},
	fixShare(id, title, desc, pic) {
		let link = "http://fundact.eastmoney.com/ztapi/common/Redirect?activeid="+id;
		if (location.host.toLowerCase().indexOf("fundhdtest") > -1 || location.host.toLowerCase().indexOf("localhost") > -1) {
			link = "http://fundact.eastmoney.com/ztapitest/common/Redirect?activeid="+id;
		}
		const wxinfo = ({
			"resultCode": 0,
			"resultMessage": "",
			"datas": {
				"Id": 0,
				"Name": "",
				"Title": "",
				"Url": "",
				"HasWx": true,
				"NeedLogin": false,
				"WxTitle": title,
				"WxContent": desc,
				"WxUrl": link,
				"WxImage": pic,
				"WxBackUrl": ""
			}
		})
		location.href = 'emfundapp:wx_shareInfo(' + encodeURI(JSON.stringify(wxinfo.datas)) + ')';
	}
}

co.dc = {
	IsIos: (/(iPhone|iPod|iPad|iTouch|iOS)/i.test(navigator.userAgent)),
	AppVersion: function() {
		var _this = this;
		return _this.GetQueryString("v") || '6.0';
	},
	InitTtjj: function() {
		var ios = (function() {
			var ua = navigator.userAgent.toLowerCase();
			return (ua.search(/iphone|ipad|ipod/i) !== -1);
		})();
		if (!ios) {
			try {
				var obj = JSON.parse(window.eastmoney.jsGetBaseInfo());
				if (obj.appname) {
					sessionStorage.setItem("common.appname", obj.appname);
					sessionStorage.setItem("common.appversion", obj.appversion);
					sessionStorage.setItem("common.pass", obj.pass);
					sessionStorage.setItem("common.fundinstalled", obj.fundinstalled);
					sessionStorage.setItem("common.os", obj.os);
					sessionStorage.setItem("common.plant", obj.plant);
					sessionStorage.setItem("common.model", obj.model);
					sessionStorage.setItem("common.resolution", obj.resolution);
					sessionStorage.setItem("common.networktype", obj.networktype);
					sessionStorage.setItem("common.baseInfo", true);
				}
			} catch (error) {}
		} else {
			try {
				window.location.jsGetBaseInfo = function(obj) {
					sessionStorage.setItem("common.appname", obj.appname);
					sessionStorage.setItem("common.appversion", obj.appversion);
					sessionStorage.setItem("common.pass", obj.pass);
					sessionStorage.setItem("common.fundinstalled", obj.fundinstalled);
					sessionStorage.setItem("common.os", obj.os);
					sessionStorage.setItem("common.plant", obj.plant);
					sessionStorage.setItem("common.model", obj.model);
					sessionStorage.setItem("common.resolution", obj.resolution);
					sessionStorage.setItem("common.networktype", obj.networktype);
					sessionStorage.setItem("common.baseInfo", true);
				}
				window.location = 'requestJsGetBaseInfo:';
			} catch (error) {}
		}
	},
	TitleInfo: {
		"title1": document.title || '天天基金网',
		/*主标题*/
		"title2": "" /*副标题*/
	},
	ShareInfo: {
		"callbackname": "window.callbackShare",
		/*分享成功后回调事件*/
		/* type： 分享目标（可选：’all’或’weibo’,’weixin’,’pengyouquan’,’qq’,’qqweibo’,’qzone’,’email’,’message’），all为全部*/
		"type": "weixin,qq,pengyouquan",
		/* all weibo,weixin,qq 逗号分开*/
		"title": "填入分享标题",
		/*分享标题*/
		"img": "填入分享头图地址",
		/*分享图片*/
		"url": "填入分享链接地址",
		/*分享链接*/
		"desc": "填入分享说明" /*分享描述*/
	},
	Version: "1.0.0",
	Help: {
		"SetShare": "设置右上角分享按钮显示",
		"SetTitle": "设置页面主标题副标题",
		"ClickShare": "触发分享"
	},
	SetShare: function() { /*设置右上角分享按钮显示*/
		var _this = this;
		var strdhlfx = "1";

		if(_this.AppVersion()<"6.0")
		{
			console.log("您的APP版本过低不能分享!!!");
			// return false;
		}

		_this.appBindEvent();
		try {
			if (_this.IsIos) {
				window.location = "emH5ShareNeed:" + strdhlfx; //ios
				//return false;
			}
			window.eastmoney.emH5ShareNeed(strdhlfx); //android
			//return false;
		} catch (e) {
			return false;
		}
	},
	SetTitle: function() {
		var _this = this;
		var jsondhlbt = JSON.stringify(_this.TitleInfo);
		try {
			if (_this.IsIos) {
				window.location = "emH5Title:" + jsondhlbt; //ios
				//return false;
			}
			window.eastmoney.emH5Title(jsondhlbt); //android
			//return false;
		} catch (e) {
			return false;
		}
	},
	ClickShare: function() {
		var _this = this;
		var jsonStr = JSON.stringify(Object.assign({},{"callbackname": "window.callbackShare","type": "weixin,qq,pengyouquan"}, _this.ShareInfo));
		if (_this.IsIos) { //IOS
			try {
				var ss = document.getElementsByTagName('input')
				if (ss.length > 0) {
					ss[0].blur();
					document.removeEventListener('touchend', ss[0], false);
				}
			} catch (e) {console.log(e)}
			window.location = "onwebshareclicked:" + jsonStr;
		} else { //Android
			window.eastmoney.onShareClicked(jsonStr);
		}
	},
	appBindEvent: function() {
		var _this = this;
		window.callbackShare = function(returnValue) {
			var str = JSON.parse(returnValue);

			if (str.code == "0") {
				//分享成功
			} else if (str.code == "2") {
				//未安装微信
			} else {
				//分享失败
			}
		}

		window.emH5ShareInfo = function() {
			_this.ClickShare();
		}
	},
	GetQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return r[2];
		}
		return "";
	}
}

co.wx = {	
}

co.defineCookie = {
	get(key) {
		var result = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)"));
		return result != null ? unescape(decodeURI(result[2])) : null;
	},

	set(c_name, value, expiredays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
	},

	del(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = this.get(name);
		if (cval != null)
			document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
}

export default co
