<template>
    <section v-if="user">
        <div class="user-img" :style="{backgroundImage: `url(${user.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>
        <h6 class="nameUser">{{user.username}}</h6>
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

.nameUser {
    color: #F6AB2B;
    font-family: "Ubuntu-regular";
    padding: 5px;
}
   
</style>
