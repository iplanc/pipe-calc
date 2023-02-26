<!--
 * @Author: PlanC
 * @Date: 2023-02-25 13:58:58
 * @LastEditTime: 2023-02-26 15:41:11
 * @FilePath: \pipe-calc\src\App.vue
-->

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
  },
  mounted() {
    if (this._isMobile()) {
      this.$router.replace("/m");
    } else {
      this.$router.replace("/");
    }
  },
};
</script>
