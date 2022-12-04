<template>
  <div class="login">
  	<fixed-bar class="welcome">欢迎登录!</fixed-bar>
  	<div class="container">
  		<div class="login-form">
  			<div class="top-bar">
	  			<div class="login-by-account"
	  				:class="{selected: showAccountPage}">
	  				<span>账户登录</span>
	  			</div>
	  		</div>
	  		<div class="login-content">
	  			<div class="content-by-account">
	  				<form>
	  					<label class="box account">
	  						<input type="text" name="" placeholder="邮箱/用户名">
	  					</label>
	  					<label class="box password">
	  						<input type="password" name="" placeholder="密码">
	  					</label>
	  					<label class="box submit">
                <router-link :to="{name: 'Home'}">
                <input type="submit" name="" value="登录">
                </router-link>
	  					</label>
	  					<label class="remenber-me">
	  						<input type="checkbox" name="">
	  						下次自动登录
	  					</label>
	  					<router-link :to="{name: 'Register'}" tag="label"
	  					class="register">注册账号</router-link>
	  					<label class="forget-password">忘记密码</label>
	  				</form>
	  			</div>
	  		</div>
  		</div>
  		<div class="side-image">
        <img src="../assets/img/login/login-register-side-image.png">
  		</div>
  	</div>
  	<app-footer/>
  </div>
</template>

<script>
	import FixedBar from '@/components/Bars/FixedBar'
	import AppFooter from '@/components/MainPage/AppFooter'

	export default {
	  name: 'Login',
	  components: {
	  	'fixed-bar': FixedBar,
	  	'app-footer': AppFooter
	  },
	  data () {
	    return {
	    	showAccountPage: true,
	    	mouseIsIn: true,
	    	mouseIsOut: false,
	    }
	  },
	  methods: {
	  	changeLoginPage: function (index) {
	  		if (index == 0) {
	  			this.mouseIsIn = true;
	  			this.showScanPage = true;
		    	this.showAccountPage = false;
	  		} else if (index == 1) {
	  			this.showScanPage = false;
		    	this.showAccountPage = true;
	  		}
	  	},
	  	mouseIn: function () {
	  		this.mouseIsIn = true;
	  		this.mouseIsOut = false;
	  	},
	  	mouseOut: function () {
	  		this.mouseIsIn = false;
	  		this.mouseIsOut = true;
	  	},
	  },
	};
</script>

<style scoped>
	.login {
		color: #666;
		height: 360px;
	}
	.login .welcome {
		font-size: 20px;
	}
	.login .container {
		width: 1200px;
		height: 100%;
		margin: 0 auto;
		position: relative;
		padding-top: 100px;
		/*background-color: red;*/
	}
	/* 右边照片 */
	.login .container .side-image {
		height: 400px;
		width: 400px;
		position: absolute;
		top:80px;
		right: 90px;
		/*border: 1px solid #eee;*/
	}
	.login .container .side-image img {
		height: 360px;
		width: 360px;
	}
	/* 登录表单页面 */
	.login .container .login-form {
		width: 500px;
		height: 300px;
		/*background-color: #f9f9f9;*/
		margin-top: 10px;
		margin-left: 100px;
		box-shadow: 0 2px 10px #aaa;
		/*border: 1px solid #ddd;*/
	}
	/* 登录方式导航栏 */
	.login .top-bar {
		height: 40px;
		/*background-color: #ddd;*/
		box-sizing: border-box;
		border-bottom: 1px solid #ddd;
	}
	.login .top-bar div {
		/*border: 1px solid #999;*/
		box-sizing: border-box;
		margin-top: 10px;
		width: 100%;
		height: 20px;
		line-height: 20px;
		text-align: center;
    float: left;
	}
	/* 内容区域 */
	.login .login-content {
		height: 260px;
		width: 100%;
		position: relative;
	}
	.login .login-content div {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/* 账户登录部分  */
	.login .login-content .content-by-account form {
		position: relative;
	}
	.login .login-content .content-by-account .box {
		position: absolute;
		width: 36px;
		height: 36px;
		line-height: 36px;
		text-align: center;
		background-color: #ccc;
		background-position: 8px;
		background-size: 20px;
		background-repeat: no-repeat;
		left: 110px;
	}
	.login .login-content .content-by-account .box input {
		height: 36px;
		width: 244px;
		border: 1px solid #ccc;
		border-left: none;
		box-sizing: border-box;
		outline: none;
		padding: 5px 10px;
		position: absolute;
		left: 36px;
		top: 0;
		font-size: 14px;
	}
	.login .login-content .content-by-account .account {
		top: 40px;
		background-image: url('../assets/img/login/icons/account.png');
	}
	.login .login-content .content-by-account .account input {

	}
	.login .login-content .content-by-account .password {
		top: 100px;
		background-image: url('../assets/img/login/icons/password.png');
	}
	.login .login-content .content-by-account .password input {

	}

	/*  确定按钮*/
	.login .login-content .content-by-account label.submit {
		top: 180px;
		background-color: #fff;
	}
	.login .login-content .content-by-account label.submit input {
		left: 0;
		width: 280px;
		background-color: #12ab34;
		border: none;
		cursor: pointer;
		color: #fff;
	}
	.login .login-content .content-by-account label.submit input:hover {
		opacity: 0.9;
	}
	/* 自动登录复选框 & 忘记密码 & 注册账号*/
	.login .login-content .content-by-account .remenber-me,
	.login .login-content .content-by-account .forget-password,
	.login .login-content .content-by-account .register {
		position: absolute;
		top: 150px;
		left: 110px;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
	}
	.login .login-content .content-by-account .remenber-me input {
		vertical-align: -3px;
	}
	.login .login-content .content-by-account .forget-password:hover,
	.login .login-content .content-by-account .register:hover {
		color: #12ab34;
		text-decoration: underline;
		cursor: pointer;
	}
	/* 忘记密码 */
	.login .login-content .content-by-account .forget-password {
		left: 334px;
	}
	/* 注册账号 */
	.login .login-content .content-by-account .register {
		left: 280px;
	}
</style>
