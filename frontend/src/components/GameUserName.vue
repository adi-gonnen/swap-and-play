<template>
    <section v-if="user">
        <h1 class="nameUser">{{user.username}}</h1>
    </section>
</template>

<script>
import GameService from '@/services/GameService.js';

export default {
    name: "GameUser",
    props: ["userId"],
    data() {
        return {
            user: null
        }
    },
    created() {
        this.getGameUser()
    },
    methods: {
        getGameUser() {
            return GameService.getUserById(this.userId)
                .then(user => {
                    // console.log('user from server&&&', user);
                    this.user = user
                })
        }
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

   
</style>
