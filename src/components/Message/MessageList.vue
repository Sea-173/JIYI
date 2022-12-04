<template>
  <div class="message-list">
    <el-dialog :visible.sync="detailVisible" width="900px" class="dialog1">
      <div slot="title" class="dialog-title">
<!--        <i class="el-icon-edit-outline"></i>-->
        <span id="title-text"></span>
      </div>

      <div class="dialogDiv">
        <message-box class="move-box"></message-box>
      </div >
    </el-dialog>
    <ul v-if="type==0">
      <ol v-for="(message,index) in messageList1" :key="index" >
        <!--showMessageBox(type,index)-->
        <div class="item" :id=getId(index)  @click="clickToShow(type,index)">
          <img class="face" :src=getUserHead(message.index)>
          <div class="des">
            <div class="nickName"><span>{{message.user}}</span></div>
          </div>
        </div>
      </ol>
    </ul>
    <ul v-if="type==1">
      <ol v-for="(message,index) in messageList2" :key="index">
        <div class="item" :id=getId(index)  @click="clickToShow(type,index)">
          <img class="face" :src=getUserHead(message.index)>
          <div class="des"><div class="nickName"><span>{{message.user}}</span></div>
          </div>
        </div>
      </ol>
    </ul>
    <ul v-if="type==2">
      <ol v-for="(message,index) in messageList3" :key="index">
        <div class="item" :id=getId(index)  @click="clickToShow(type,index)">
          <img class="face" :src=getUserHead(message.index)>
          <div class="des">
            <div class="nickName"><span>{{message.user}}</span></div>

          </div>
        </div>
      </ol>
    </ul>
  </div>

</template>

<script>
import MyMessage from './MyMessage'

import MessageBox from './MessageBox'

export default {
  name: 'MessageList',
  components: {
    'message-box': MessageBox,
    'my-message': MyMessage
  },
  props: ['type'],
  data () {
    return {
      detailVisible: false,
      messageList1: [
        {
          index: 100,
          user: '小管家',
          date: '2022.06.03',
          content: '通告',
          isRating: false
        }

      ],
      messageList2: [
        {
          index: 12,
          user: '羽球社',
          date: '2022.06.01',
          content: '什么时候发货？',
          isRating: false
        },

        {
          index: 11,
          user: '电影社',
          date: '2022.06.03',
          content: '在吗',
          isRating: false
        }

      ],
      messageList3: [
        {
          index: 0,
          user: '小明',
          date: '2022.06.03',
          content: '在吗',
          isRating: false
        },
        {
          index: 1,
          user: '小红',
          date: '2022.06.01',
          content: '什么时候发货？',
          isRating: false
        },
        {
          index: 2,
          user: '张三',
          date: '2022.06.01',
          content: '好',
          isRating: false
        }
      ]
    }
  },
  methods: {
    getId: function (itemId) {
      return 'message' + itemId
    },
    getUserHead: function (index) {
      return require('../../assets/img/user-head/' + index + '.jpg')
    },
    clickToShow: function (type, index) {
      this.detailVisible = true
      var it = document.getElementById('title-text')
      if (type === 0) {
        it.innerText = this.messageList1[index].user
      } else if (type === 1) {
        it.innerText = this.messageList2[index].user
      } else if (type === 2) {
        it.innerText = this.messageList3[index].user
      }
    },

    showMessageBox: function (type, index) {
      this.$router.push({name: 'MessageBox', params: {mtype: type, mindex: index}})
    }
  }
}
</script>

<style  scoped>
>>>.el-dialog__header {
  background:#4DD0E1;
  height: 10px;

}

/* 弹出层设置背景色 底部*/
>>>.el-dialog__body{
  background-color: #4DD0E1;
  height: 60px;
}
>>>.el-dialog__footer {
  background-color: #4DD0E1;

}
.move-box{
  position: relative;
  top:-120px;
  left: -20px;
}

#title-text{
  color: white;
  text-align: center;
  font-size: 24px;
  position: relative;
  top:-10px;
  left: 400px;
}
.item{
  width: 100%;
  height: 60px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  display: flex;
}
.face{
  width: 44px;
  height: 44px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  margin-top: 8px;
  object-fit: cover;
}
.des{
  height: 60px;
  display: inline-block;
  margin-left: 50px;
  white-space :  nowrap;
  text-overflow : ellipsis;
  overflow:hidden;
  flex: 1;
}
.nickName{
  /*height: 30px;*/
  margin-top: 10px;
}
.nickName span{
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  white-space :  nowrap;
  text-overflow : ellipsis;
  overflow:hidden;
}
.signature{
  /*height: 30px;*/
  margin-top: -5px;
}
.signature span{
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color:gray;
  white-space :  nowrap;
  text-overflow : ellipsis;
  overflow:hidden;
}
.sel{
  width: 30px;
  height: 60px;
  display: inline-block;
  float: right;
  margin-right: 5px;
}
.sel img{
  width: 30px;
  height: 30px;
  margin-top: 15px;
}

</style>
