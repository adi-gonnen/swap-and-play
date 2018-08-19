<template>
    <section class="user-matches flex align-center justify-center">
        <div class="flex column match-container align-center justify-center">
            <ul v-if="matches.length>0" class="games-box-container flex">
                <li v-for="match in matches" :key="match._id" class="flex games-box align-center justify-center">
                    <div class="whole-box">
                        <div class="user-approved-container">
                            <h2 class="user-approved">
                                <GameUserName :userId="match.userPassive.userId"></GameUserName> 
                                Approved swapping!
                            </h2>
                        </div>
                        <div class="flex games-img">
                            <div class="flex column game-box">
                                <h3>{{match.userPassiveGame.name}}</h3> 
                                <div class="img-activity-container">
                                    <img :src="match.userPassiveGame.src" />
                                </div>
                            </div>
                            <img class="swap-arrows" src="img/swaparrows.png"/>
                            <div class="flex column game-box">
                                <h3>{{match.userActiveGames[0].name}}</h3>
                                <div class="img-activity-container">
                                    <img :src="match.userActiveGames[0].src"/> 
                                </div>
                            </div>
                        </div>
                        <div class="flex msg-box">
                            <GameUserImg :userId="match.userPassive.userId"></GameUserImg>
                            <h4>{{match.userPassive.textareaRes}}</h4>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else class="noMatchesMsg">
              <h3>No swaps approved yet...</h3>
            </div>
        </div>
    </section>
</template>

<script>
import GameService from "../services/GameService.js";
import GameUserImg from "@/components/GameUserImg.vue";
import GameUserName from "@/components/GameUserName.vue";

export default {
  name: "userMatch",
  data() {
    return {
      passiveUser: null,
      userId: null
    };
  },
  components: { GameUserName, GameUserImg },
  created() {
    this.userId = this.$route.params.userId;
    // console.log("^userID^^^", this.userId);
    this.$store.dispatch({type: "getMatch", user: this.$route.params.userId });
    // console.log("matchhhhhh", this.matches);
    this.getGameUser(this.userId);
  },
  computed: {
    matches() {
      // console.log("@@@match%%%", this.$store.getters.getMatches);
      return this.$store.getters.getMatches;
    },
    loggedinUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    getGameUser(userId) {
      // console.log("user $$$$$", userId);
      return GameService.getUserById(userId).then(user => {
        // console.log("user from server&&&", user);
        this.passiveUser = user;
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.user-matches {
  width: 100%;
}

.match-container {
  // width: 980px;
}

.games-box-container {
  width: 100%;
  align-self: center;
}

.whole-box {
  width: 122%;
  height: 111%;
  position: relative;
}

.user-approved-container {
  height: 10%;
}

.game-box {
  width: 5%;
}

.img-activity-container img {
  width: 75%;
}
.msg-box {
  width: 55%;
  position: absolute;
  // top: 195px;
  top: 220px;
  left: 30px;
}
.games-img {
  margin-top: 20px;
  justify-content: center;
  width: 100%;
  .exchange {
    align-self: center;
    font-size: 2em;
  }
}

.swap-arrows {
  width: 40px;
  height: 40px;
  align-self: center;
}

.games-box {
  border: 1px solid $border-color;
  box-shadow: 0px 2px 4px 0px #d9d8d8;
  border-radius: 2px;
  max-width: 400px;
  max-height: 300px;
}
.game-box {
  justify-content: space-between;
  border: none;
  box-shadow: none;
  height: 150px;
  margin-bottom: 0;
  padding-left: 5px;
  padding-right: 5px;
}

.user-approved {
  font-size: 18px;
  font-family: "Ubuntu";
  margin-top: 5px;
}
</style>
