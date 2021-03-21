module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://101.37.253.98/',
				// changeOrigin: true,
				// secure: true,
				pathRewrite: {
					'^/api': '/api'
				}
			}
		},
		// "disableHostCheck":true
	}
}
