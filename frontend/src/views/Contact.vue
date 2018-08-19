<template>
    <div class="contact">
        <h1>upload soon...</h1>
        
    </div>
</template>

<script>
export default {
  name: "contact",
    data() {
      return {
        liron: `url("img/user/liron.jpg")`,
        tally: `url("img/user/tally.jpg")`,
        adi: `url("img/user/adi.jpg")`,
      }
    }
}
</script>

<style scoped lang="scss">
    @import "~@/assets/scss/style.scss";
.user-img {
  width: 200px;
  height: 200px;
  align-self: center;
}
.member-container {
    padding: 50px;
    // border: 1px solid;
    border-radius: 50%;
}
</style>
