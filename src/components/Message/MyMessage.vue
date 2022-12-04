<template>
  <div class="message">
    <user-center-temp
      :active-index='activeIndex'
      :item-category="messageCategory"
      :title="'我的消息'"
      @change-active-index="changeActiveIndex">
      <div class="message-list"  style="overflow: auto">

        <p class="show-message">
          <message-list
            :type="messageCategory[activeIndex].index">
          </message-list>
        </p>

      </div>
    </user-center-temp>
  </div>

</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'
import MessageList from './MessageList'

export default {
  name: 'MyMessage',
  components: {
    MessageList,
    'user-center-temp': UserCenterTemp,
  },
  data () {
    return {
      activeIndex: 0,
      messageCategory: [
        {
          index: 0,
          item: '系统通知',
          showNum: 0,
        },
        {
          index: 1,
          item: '社团消息',
          showNum: 0,
        },
        {
          index: 2,
          item: '私信',
          showNum: 0,
        },
      ],
    }
  },
  methods: {
    changeActiveIndex: function (index) {
      this.activeIndex = index
      // this.countOrderShowedNum();
    },
  }
}
</script>

<style scoped>
.message .message-list {
  min-height: 200px;
  /*background: */
}

.message .show-message {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  margin: 20px;
  font-size: 13px;
  position: relative;
}
</style>
