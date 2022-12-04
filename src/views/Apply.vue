<template>
<div class="apply">
    <fixed-bar class="welcome">欢迎入驻!</fixed-bar>
    <div class="container">
      <div class="apply-form">
        <div class="page-top">
          <span>社团入驻</span>
        </div>
        <div class="page-content">
          <form>
            <label class="box account">
              <input type="text" name="" placeholder="社团名称">
            </label>
            <label class="box user-name">
              <input type="text" name="" placeholder="社长姓名">
            </label>
            <label class="box password">
              <input type="text" name="" placeholder="社团宣言">
            </label>
            <label class="box password-repeat">
              <textarea type="password" name="" rows=3 cols=41 placeholder="申请理由"></textarea>
            </label>
            <label class="box submit">
              <router-link :to="{name: 'Home'}">
                <input type="submit" name="" value="提交">
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

export default {
  name: 'Apply',
  components: {
    'fixed-bar': FixedBar,
    'app-footer': AppFooter
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.apply {
  color: #666;
  height: 440px;
}
.apply .container {
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  position: relative;
  padding-top: 100px;
  /*background-color: red;*/
}
.apply .container .side-image {
  height: 400px;
  width: 400px;
  position: absolute;
  top: 100px;
  right: 40px;
  /*border: 1px solid #eee;*/
}
.apply .container .side-image img {
  height: 400px;
  width: 400px;
}

/* 登录表单页面 */
.apply .container .apply-form {
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
.apply .page-top {
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
}

/* 注册页内容区域 */
.apply .page-content .box {
  position: absolute;
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  /*background-color: #ccc;*/
  background-position: 8px;
  background-size: 20px;
  background-repeat: no-repeat;
  left: 130px;
}
.apply .page-content .box input {
  height: 36px;
  width: 298px;
  border: 1px solid #ccc;
  /*border-left: none;*/
  box-sizing: border-box;
  outline: none;
  padding: 5px 10px;
  position: absolute;
  left: 0;
  top: 0;
  font-size: 14px;
}
.apply .page-content .box textarea{
  font-size: 14px;
  resize: none;
}
.apply .page-content .account {
  top: 60px;
}
.apply .page-content .user-name {
  top: 120px;
}
.apply .page-content .password {
  top: 180px;
}
.apply .page-content .password-repeat {
  top: 240px;
}
.apply .page-content .submit {
  top: 320px;
  background-color: #fff;
}
.apply .page-content .submit input {
  width: 299px;
  left: 0px;
  border: none;
  background-color: #12ab34;
  color: #fff;
}
.apply .page-content .submit input:hover {
  cursor: pointer;
  opacity: 0.9;
}

</style>
