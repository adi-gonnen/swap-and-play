<template>
    <section class="show-match flex column align-center space-between">
        <div class="show-match-container flex column align-center justify-center">
            <transition name="custom-classes-transition" >
                <h1 v-if="show" class="animated jello congrats">Congrats <br>we have a match!!!</h1>
            </transition>
            <div class="images-container margin-bottom flex align-center space-between">
                <div v-if="gameActive" class="your-choose-container margin-bottom flex column align-center space-between">
                    <h2 class="card-title margin-bottom">You choose this amazing</h2>
                    <div class="name-image-container flex column align-center space-between">
                        <h2 class="game-name margin-bottom capitalize">{{game.name}}</h2>
                        <img class="game-image" :src="game.src" />
                    </div>
                </div>
                <img class="swap-arrows" src="img/swaparrows.png" />
                <div v-if="gamePassive" class="game-match-container margin-bottom flex column align-center space-between">
                    <h2 class="card-title margin-bottom">You swapped it with your awesome</h2>
                    <div class="name-image-container flex column align-center space-between">
                        <h2 class="game-name capitalize margin-bottom">{{match.userPassiveGame.name}}</h2>
                        <img class="game-image" :src="gamePassive.src" />
                    </div>
                </div>
            </div>
            <div v-if="userActive" class="meet-form align-center justify-center">
                <h3 class="text margin-bottom">
                    <span class="username capitalize">{{userActive.username}}</span> lives in {{userActive.city}}, <br>send him/her a message</h3>
                <div class="form-meeting flex column align-center justify-center">
                    <div class="form-input-title">
                        <el-input class="form-input form-textarea" type="textarea" v-model="textareaRes" placeholder="Please type your message"></el-input>
                    </div>
                    <div class="btns-container flex">
                        <el-button class="btn send-btn" type="primary" @click="itsMatch(game._id, match._id)">Send</el-button>
                        <el-button class="btn-back" @click="back" type="submit" title="back">cancel</el-button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import GameService from "@/services/GameService.js";
import UserService from "@/services/UserService.js";


export default {
  name: "showMatch",
  props: ["game", "match"],
  data() {
    return {
        show: true,
        choosenGameId: '',
        currMatchId: '',
        gameActive: null,
        userActive: null,
        gamePassive: null,
        textareaRes: ``,
        };
  },
  created() {
    //   console.log('####', this.match);
    //   console.log('####@@9', this.game);
        this.gameActive = this.game;
        this.getUserActive();
        this.getGamePassive();
  },
  computed: {
    userPassive() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    getUserActive() {
      let userActiveId = this.match.userActive.userId;
      UserService.getUserById(userActiveId)
      .then(user => {
        // console.log("this.userActive in show match:", user);
        this.userActive = user;
      });
    },
    getGamePassive() {
      let gamePassiveId = this.match.userPassive.gameId;
    //   console.log("gameId in show match", gamePassiveId);
      GameService.getGameById(gamePassiveId).then(game => {
        // console.log("this.gamePassive in show match:", game);
        this.gamePassive = game;
      });
    },
    itsMatch(gameId, matchId) {
        // console.log('this.gameeeeee', this.game._id);
        // console.log('this.currRecieved in itsMatch', this.match._id);
        const match = {gameId: this.game._id, matchId: this.match._id, textareaRes: this.textareaRes}
        this.$store.dispatch({ type: "updateMatch", matchDetails: match })
        .then( () => {
                this.$router.push('/');
                this.$socket.emit('newMatch')
            })
    },
    back(){
        this.$router.go();
    },
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

    .show-match {
        max-width: rem(760px);
    }

    .show-match-container {
        width: 100%;
    }

    
    .text, .small-text, .card-title {
        font-family: 'Ubuntu-regular';
    }

    .small-text {
        font-size: rem(15px);
    }

    .margin-bottom {
        margin-bottom: rem(10px);
    }

    .btn-schedule {
        margin-bottom: rem(40px);
        font-size: 20px;
    }

    .congrats {
        font-family: 'Ubuntu-regular';
        font-size: rem(60px);
        color: $secondary-color;
        text-shadow: 2px 2px $main-color;
        margin: 20px 0 40px 0;
    }

    .your-choose-container, .game-match-container {
        border: 1px solid $border-color;
        width: 500px;
        height: 400px;
        padding: rem(20px);
        width: 50%;
    }

    .name-image-container {
        height: 80%;
    }

    .images-container .game-image {
        width: 70%;
    }

    .swap-arrows {
        width: 85px;
        height: 80px;
        align-self: center;
        margin: 20px;
    }

    .your-choose-container h2, .game-match-container h2 {
      font-size: rem(20px);
    }

    .image-container {
        width: rem(200px);
    }

    .your-choose-container .game-name, .game-match-container .game-name {
        font-family: 'PaytoneOne';
        color: $main-color;
    }

    .meet-form * {
        margin-bottom: 10px;
    }

    .form-input-title {
        width: rem(500px);
    }

    .form-meeting .form-input {
        width: 80%;
    }

    .form-textarea {
        line-height: rem(300px);
        margin: auto;
    }

    .cancel-btn {
        background-color: $border-color;
        border: 0;
    }
    
    .username {
        font-size: 1.5em;
    }
    @media only screen and  (max-width: 767px) {
        .congrats {
            font-size: rem(30px);
            width: 95%;
            overflow-wrap: break-word;
        }
        .images-container {
            flex-direction: column;
        }
        .game-match-container , .your-choose-container{
            height: 333px;
        }
        .form-textarea {
            width: 90%;
        }
    }
</style>

<style src="animate.css/animate.min.css"></style> 
