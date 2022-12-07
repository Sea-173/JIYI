<template>
    <div class="release commodity">

    </div>
</template>

<script>
import UserCenterTemp from '@/components/UserCenter/UserCenterTemp'

export default {
  name: 'AfterSale',
  components: {
    'user-center-temp': UserCenterTemp
  },
  data () {
    return {
      activeIndex: 0,
      methods: {
        changeActiveIndex: function (index) {
          this.activeIndex = index
          // this.countOrderShowedNum();
        }
      }
    }
  }
}
</script>

<style scoped>
.after-sale .message-list {
    min-height: 200px;
    /*background: */
}

.after-sale .no-message {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    margin: 20px;
    background: #eee;
    font-size: 13px;
    position: relative;
}
</style>
