<template>
    <div id="app" class="app">
      <!-- <div class="loader"></div> -->
        <Header></Header>
        <router-view class="body"/>
        <!-- <footer class="footer"> @ Created by Liron, Tally &amp; Adi</footer> -->
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import UtilService from "@/services/UtilService.js";

export default {
  components: {
    Header
  },
  data() {
    return {
      currUser: UtilService.load("loggedinUser") || null
    };
  },
  created() {
    this.$store.commit({
      type: "setUser",
      currUser: this.currUser
    });
  }
};
</script>


<style lang="scss">
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-weight: 200;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
  min-height: 100%;
  height: 100%;
}

.footer {
  color: #0d72fa;
  background-color: #dadada;
  font-family: "PaytoneOne";
  font-size: 1.25rem;
  display: block;
  position: absolute;
  width: 100%;
  height: 50px;
  margin-top: -50px;
  bottom: 0;
  text-align: center;
}

.body {
  padding-bottom: 50px;
}

.loader {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: url("http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif?e44397")
    50% 50% no-repeat rgb(249, 249, 249);
}
</style>