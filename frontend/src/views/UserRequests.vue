<template>
    <section>
        <div class="flex column match-container">
            <ul v-if="requestes && requestes.length" class="flex games-box recieve">
                <li v-for="request in requestes" :key="request._id">
                    <div class="flex column game-box">
                        <h3>{{request.userPassiveGame.name}}</h3>
                        <div class="img-activity-container">
                            <img :src="request.userPassiveGame.src"/>
                        </div>
                        <div type="text" class="user-details-container">
                            <GameUser :userId="request.userPassive.userId" class="user-details flex"></GameUser>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else class="noMatchesMsg">
                <h3>No sent requests yet...</h3>
            </div>
        </div>
    </section>
</template>

<script>
import GameUser from '@/components/GameUser.vue';

export default {
    name: 'userRequest',
    components: {GameUser},
    created() {
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            });
        // console.log('requestsssss', this.matches);
    },
    computed: {
        requestes() {
            return this.$store.getters.getRequestes;
        },
        loggedinUser() {
             return this.$store.getters.loggedUser;
        },
    },
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

.my-request {
    margin: 20px;
}

.game-box {
    justify-content: space-around;
    height: 300px;
    width: 250px;
}

</style>
