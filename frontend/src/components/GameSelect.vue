<template>
    <section class="flex justify-center">
        <div v-if="!isMatch" class="game-box-container flex align-center justify-center column">
            <h3 class="game-name capitalize">{{game.name}}</h3>
            <p class="game-desc capitalize">{{game.desc}}</p>
            <div class="flex justify-center column game-box-details capitalize">
                <div class="image-container">
                    <img class="game-image" :src="game.src"/>
                </div> 
                <div class="flex column details capitalize">
                    <p><span>Type: </span>{{game.type}}</p>
                    <p><span>Category: </span>{{game.category}}</p>
                    <p><span>Condition: </span>{{game.condition}}</p>
                    <p v-if="user"><span>Location: </span>{{user.city}}</p>
                    <p><span>Added At: </span>{{game.addedAt | getDate }}</p>
                </div>
            </div>
            <div class="btns-select flex space-between">
                <button class="btn-back" @click="back" title="back">
                    <font-awesome-icon icon="arrow-left" class="back" />
                </button>
                <el-button @click="itsMatch" type="primary" class="btn btn-choose" title="choose">Choose me! 
                </el-button>
            </div>
        </div>
        <ShowMatch :match="match" :game="game" v-if="isMatch"></ShowMatch>
    </section>
</template>

<script>
import ShowMatch from "@/components/ShowMatch.vue";
import UserService from "@/services/UserService.js";

export default {
    name: 'GameSelect',
    props: ['match','game'],
    components: {
        ShowMatch
    },
    created() {
        // console.log('!!match: ', this.match)
        this.getUser();
    },
    data() {
        return {
            choosenGame: '',
            currRecieved: '',
            isMatch: false,
            user: null,
        }
    },
    methods: {
        itsMatch() {
            this.isMatch = true;
        },
        getUser() {
            let userId = this.game.userId;
            // console.log("userId in game select:", userId);
            UserService.getUserById(userId).
            then(user => {
            // console.log("this.user in game select:", user);
                this.user = user;
            });
        },
        back(){
            this.$router.go();
        },
    },
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

.btn-back{
  // margin-top: 20px;
  width: 25px;
  height: 38px;
  text-align: left;
  background-color: $main-color;
  color: $main-color;
  margin-right: 20px;
  border: none;
  background-color: transparent;
  // position: absolute;
}
    
.game-box-container {
    
    width: 100vw;
    margin-top: 50px;
    line-height: 1.6;
    height: 60%;
    max-width: 680px;
    border: 1px solid $border-color;  
    box-shadow: 0px 2px 4px 0px #d9d8d8;
    border-radius: 2px;
    margin: rem(20px);
    align-items: center;
    justify-content: space-around;
    z-index: 5;
    position: relative;
    & .game-name{
        font-family: 'PaytoneOne';
        color: $main-color;
        font-size: rem(30px);
        margin-top: rem(20px);
    }
    & .game-desc {
        font-family: 'Ubuntu';
        font-size: rem(20px);
        margin: rem(30px);
        // position: absolute;
        // top: 16%;
    }
    & .game-box-details {
        font-family: 'Ubuntu-regular';
        font-size: rem(17px);
        margin: 40px 0;
        width: 100%;
        text-align: left;
        align-items: center;
    }
}

.details p span {
    font-family: 'Ubuntu';
}

.image-container {
    width: 50%;
    margin-right: 30px;
}

.game-box-details .game-image {
    margin: 0 20px;
    width: 100%;
}

.details {
    justify-content: space-around;
    font-size: 18px;
    align-items: center;
}

.btn-choose {
    background-color: $main-color;
    font-size: rem(20px);
    width: 150px;
}
.btn-back {
    font-size: 2em;
    color: $secondary-color;
}
.btns-select {
    align-items: center;
    margin-bottom: rem(30px);
    width: 220px;
}

@media (min-width: 720px) {
  .game-box-container {
    font-size: rem(33px);
    .game-box-details {
        flex-direction: row;
    }
  }
  .game-box-details .game-image {
        width: 80%;
    }
    .details {
        align-items: flex-start;
    }
    .btn-back {
        font-size: 1.2em;
    }
}
@media only screen and  (max-width: 540px) {
    .game-box-container {
        margin: auto;
        width: 95%;
    }
}
</style>
