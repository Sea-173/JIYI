<template>
  <div class="message-box">
    <div class="message-container">
<!--      <div class="message-head">-->
<!--        <span class="message-name">羽毛球社</span>-->
<!--      </div>-->
      <div class="message-content">
        <div class="message-item item-center"><span>今天 08:25</span></div>
        <div class="message-item item-left"><div class="avatar">
          <img src="../../assets/img/user-head/5.jpg" /></div>
          <div class="bubble bubble-left">今晚7点人工草坪有羽毛球比赛</div>
        </div>
        <div class="message-item item-right"><div class="bubble bubble-right">收到</div><div class="avatar"><img src="../../assets/img/user-head/4.jpg" /></div></div>
        <div class="message-item item-center"><span>今天 13:15</span></div>
        <div class="message-item item-right"><div class="bubble bubble-right">抱歉晚上临时有事，去不了了</div><div class="avatar"><img src="../../assets/img/user-head/4.jpg" /></div></div>
      </div>
      <div class="input-area">
        <textarea name="text" id="textarea"></textarea>
        <div class="button-area">
          <button class="send-button" id="send-btn" @click ="send">发 送</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

import MessageList from './MessageList'
import FixedBar from "../Bars/FixedBar";
import AppFooter from '../MainPage/AppFooter'

export default {
  name: 'MessageBox',
  components: {AppFooter, FixedBar},
  props:[ 'mtype','mindex'],

  comments:{
    'messsage-list': MessageList
  },
  methods:{

    send : function (){
      let text = document.querySelector('#textarea').value
      if (!text) {
        alert('请输入内容')
        return
      }

      let item = document.createElement('div')
      item.className = 'message-item item-right'
      item.innerHTML += `<div class="bubble bubble-left">${text}</div><div class="avatar"><img src="https://s1.328888.xyz/2022/06/08/zZwOJ.jpg" alt="zZwOJ.jpg" border="0" /></div>`

      document.querySelector('.message-content').appendChild(item)
      document.querySelector('#textarea').value = ''
      document.querySelector('#textarea').focus()

      let height = document.querySelector('.message-content').scrollHeight
      document.querySelector('.message-content').scrollTop = height
    }
  }
}
</script>

<style scoped>
>>>.message-container{
  margin: auto;
  position: relative;
  top:100px;
  height: 600px;
  width: 900px;
  border-radius: 4px;
  /*border: 0.5px solid #e0e0e0;*/
  background-color: #f5f5f5;
  display: flex;
  flex-flow: column;
  overflow: hidden;
}
.message-head{
  height: 40px;
  width: 900px;
  background-color: #4DD0E1;
  color: white;
  text-align: center;

}
.message-name{
  font-size: 24px;
}
>>>.message-content{
  width: calc(100% - 40px);
  padding: 20px;
  overflow-y: scroll;
  flex: 1;
}
>>>.message-content:hover::-webkit-scrollbar-thumb{
  background:rgba(0,0,0,0.1);
}
>>>.bubble{
  max-width: 400px;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  color: #000;
  word-wrap:break-word;
  word-break:normal;
}
>>>.item-left .bubble{
  margin-left: 15px;
  background-color: #fff;
}
>>>.item-left .bubble:before{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-top: 10px solid transparent;
  border-right: 10px solid #fff;
  border-bottom: 10px solid transparent;
  left: -20px;
}
>>>.item-right .bubble{
  margin-right: 15px;
  background-color: #9eea6a;
}
>>>.item-right .bubble:before{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid #9eea6a;
  border-top: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid transparent;
  right: -20px;
}
>>>.message-item{
  margin-top: 15px;
  display: flex;
  width: 100%;
}
>>>.message-item.item-right{
  justify-content: flex-end;
}
>>>.message-item.item-center{
  justify-content: center;
}
>>>.message-item.item-center span{
  font-size: 12px;
  padding: 2px 4px;
  color: #fff;
  background-color: #dadada;
  border-radius: 3px;
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  -khtml-user-select:none; /*早期浏览器*/
  user-select:none;
}

>>>.avatar img{
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.input-area{
  border-top:0.5px solid #e0e0e0;
  height: 150px;
  display: flex;
  flex-flow: column;
  background-color: #fff;
}
textarea{
  flex: 1;
  padding: 5px;
  font-size: 24px;
  border: none;
  cursor: pointer;
  overflow-y: auto;
  overflow-x: hidden;
  outline:none;
  resize:none;
}
.button-area{
  display: flex;
  height: 40px;
  margin-right: 10px;
  line-height: 40px;
  padding: 5px;
  justify-content: flex-end;
}
.send-button{
  width: 80px;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 4px;
  float: right;
  cursor: pointer;
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:10px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
  border-radius:8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0);
  -webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}

</style>
