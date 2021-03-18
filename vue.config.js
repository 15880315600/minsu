module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://192.168.2.11:8004',
				// target: 'https://gym.beetry.com',
				// target: 'https://jsf.ziqisun.com',
				// changeOrigin: true,
				// secure: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		},
		// "disableHostCheck":true
	}
}
