// Global App Configuration
module.exports = {
	FRONTEND_URI: process.env.FRONTEND_URI || "http://localhost:3000/",
	SECRET: "32876qihsdh76@&#!742(*#HG&#28702y&##@^!()(&^#))jhscbd",
	MONGO_URI: process.env.DB_URL || 'mongodb://localhost:27017/youlook-great',
		EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};
