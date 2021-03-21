// /common/http.interceptor.js

// 这里的vm，就是我们在vue文件里面的this，所以我们能在这里获取vuex的变量，比如存放在里面的token变量
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: '/api',
		// baseUrl:'http://192.168.2.168:9008',
		loadingText: '努力加载中~',
		loadingTime: 800,
		header: {
			'Authorization': uni.getStorageSync("token")
		}
		// ......
	});

	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {

		config.header.Authorization = uni.getStorageSync("token")

		return config;
	}

	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.status == 200) {
			return res;
		} else if (res.status == '440') {
			setTimeout(() => {
				uni.navigateTo({
					url: '../login/login'
				})
			}, 1000)
			return false;
		} else {
			uni.showToast({
				title: res.message,
				icon: 'none'
			})
			return false;
		}
	}
}

export default {
	install
}
