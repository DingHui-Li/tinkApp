module.exports = {
	/** 区分打包环境与开发环境
	 * process.env.NODE_ENV==='production'  (打包环境)
	 * process.env.NODE_ENV==='development' (开发环境)
	 * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
	 */
	devServer: {
	  open: process.platform === "darwin",
	  disableHostCheck: false,
	  host: "0.0.0.0",
	  port: 8088,
	  https: false,
	  hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
	//   proxy: null, // string | Object
	  proxy:{
		'/apis':{
			target:'http://api.tlink.io',
			pathRewrite:{
				'^/apis':''
			}
		}
	  }
	  // before: app => {}
	}, 
  };