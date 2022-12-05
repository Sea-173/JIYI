<template>
  <div class="register">
    <fixed-bar class="welcome">欢迎注册!</fixed-bar>
    <div class="container">
      <div class="register-form">
        <div class="page-top">
          <span>用户注册</span>
        </div>
        <div class="page-content">
          <form>
            <label class="box account">
              <input id="mailbox" type="text" name="" placeholder="手机号" @change="regMailbox" v-model="form.phone">
            </label>
            <span id="regMailbox"></span>
            <label class="box user-name">
              <input id='userName' type="text" name="" placeholder="用户名" @change="regName" v-model="form.name">
            </label>
            <span id="regName"></span>
            <label class="box password">
              <input id="pwd" type="password" name="" placeholder="6-20位数字、符号或数字" @change="regPwd" v-model="form.pass">
            </label>
            <span id="regPwd"></span>
            <label class="box password-repeat">
              <input id="surePwd" type="password" name="" placeholder="再次输入密码" @change="regSurePwd">
            </label>
            <span id="regSurePwd"></span>
            <label class="box submit">
                <input type="submit" name="" value="注册" @click="register">
            </label>
            <label class="have-account">已有账户？
              <router-link :to="{name: 'Login'}" tag="label"
                           class="login">直接登录
              </router-link>
            </label>
          </form>
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
import request from '../utils/requests'

export default {
  name: 'register',
  components: {
    'fixed-bar': FixedBar,
    'app-footer': AppFooter
  },
  data () {
    return {
      form: {}
    }
  },
  methods: {
    register () {
      request.post('/register', this.form).then(res => {
        if (res.code === 400) {
          this.$message.error('注册失败')
        } else {
          console.log('success')
          this.$message.success('注册成功')
          this.$router.push('/')
        }
      })
    },
    regName: function () {
      var userName = document.getElementById('userName').value

      var var1 = /^[A-Za-z_]{2,19}$///用户名
      if (var1.test(userName)) {
        //用户名
        document.getElementById('regName').innerText = '正确'
        document.getElementById('regName').style.color = 'green'
      } else {
        document.getElementById('regName').innerText = '用户名不能带有数字和特殊字符'
        document.getElementById('regName').style.color = 'red'
      }
    },
    regPwd: function () {
      var pwd = document.getElementById('pwd').value
      var var2 = /^[A-Z]{1}[A-Za-z0-9]{7,14}///密码
      if (var2.test(pwd)) {
        //密码
        document.getElementById('regPwd').innerText = '正确'
        document.getElementById('regPwd').style.color = 'green'
      } else {
        document.getElementById('regPwd').innerText = '请输入大写开头 数字字母符号混合 8-15位'
        document.getElementById('regPwd').style.color = 'red'
      }
    },

    regSurePwd: function () {
      var surePwd = document.getElementById('surePwd').value
      var pwd = document.getElementById('pwd').value
      if(surePwd!=pwd)
      {
        document.getElementById('regSurePwd').innerText = '两次密码不一致'
        document.getElementById('regSurePwd').style.color = 'red'
      }
    },

    regMailbox: function () {
      var mailbox = document.getElementById('mailbox').value
      var var4 = /^[0-9]{8,15}/
      if (var4.test(mailbox)) {
        //邮箱
        document.getElementById('regMailbox').innerText = '正确'
        document.getElementById('regMailbox').style.color = 'green'
      } else {
        document.getElementById('regMailbox').innerText = '请输入手机号格式'
        document.getElementById('regMailbox').style.color = 'red'
      }
    }

  }

};
</script>

<style scoped>
#regName{
  position: absolute;
  font-size: 10px;
  top:160px;
  left: 130px;
}
#regPwd{
  position: absolute;
  font-size: 10px;
  top:220px;
  left: 130px;
}
#regMailbox{
  position: absolute;
  font-size: 10px;
  top:100px;
  left: 130px;
}

#regSurePwd {
  position: relative;
  font-size: 10px;
  top:235px;
  left: 130px;
}
.register {
  color: #666;
  height: 440px;
}

.register .container {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  padding-top: 100px;
  /*background-color: red;*/
}

.register .container .side-image {
  height: 400px;
  width: 400px;
  position: absolute;
  top: 100px;
  right: 40px;
  /*border: 1px solid #eee;*/
}

.register .container .side-image img {
  height: 400px;
  width: 400px;
}

/* 登录表单页面 */
.register .container .register-form {
  /*background-color: #eee;*/
  /*margin: 0px auto;*/
  margin-left: 100px;
  margin-top: 0px;
  width: 560px;
  height: 400px;
  box-shadow: 0 2px 10px #aaa;
  position: relative;
}

/* 注册页头部 */
.register .page-top {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}

/* 注册页内容区域 */
.register .page-content .box {
  position: absolute;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background-color: #ccc;
  background-position: 8px;
  background-size: 20px;
  background-repeat: no-repeat;
  left: 130px;
}

.register .page-content .box input {
  height: 36px;
  width: 260px;
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

.register .page-content .account {
  top: 60px;
  background-image: url('../assets/img/login/icons/phone.png');
}

.register .page-content .user-name {
  top: 120px;
  background-image: url('../assets/img/login/icons/account.png');
}

.register .page-content .password {
  top: 180px;
  background-image: url('../assets/img/login/icons/password.png');
}

.register .page-content .password-repeat {
  top: 240px;
  background-image: url('../assets/img/login/icons/password.png');
}

.register .page-content .submit {
  top: 320px;
  background-color: #fff;
}

.register .page-content .submit input {
  width: 300px;
  left: 0px;
  border: none;
  background-color: #12ab34;
  color: #fff;
}

.register .page-content .submit input:hover {
  cursor: pointer;
  opacity: 0.9;
}

.register .page-content .have-account {
  position: absolute;
  top: 290px;
  right: 140px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
}

.register .page-content .have-account .login {
  color: #12ab34;
}

.register .page-content .have-account .login:hover {
  text-decoration: underline;
  cursor: pointer;
}

</style>
