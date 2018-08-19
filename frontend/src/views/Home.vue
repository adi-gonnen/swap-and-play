<template>
    <section class="home">
      <div v-if="gamesLoading">
        <div class="loader-circle"></div>
      </div>
        <div class="home-bg-img flex justify-center align-center" 
        :style="{backgroundImage: url, backgroundSize: 'cover', backgroundPosition: 'center', 
         backgroundrepeat: 'no-repeat'}">
            <form @submit.prevent="setSearchHome" class="search">
                <input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games">
                <el-button class="btn search-btn" type="primary"><font-awesome-icon icon="search"></font-awesome-icon></el-button>
                <el-button class="btn search-btn-text" type="primary" @click="setSearchHome">Search</el-button>
            </form>
            <h1 class="header-bg-image">Do you want to swap some games?</h1>
        </div>
        <div class="baby-cards-container space-between"  >
            <div class="baby-cards flex container justify-center" >
                <div class="filter-type home-filter-container home-filter-container-baby flex column align-center justify-center">
                    <router-link :to="'/game'" @click.native="setFilter('baby')">
                        <h2 class="type-title-home">Most popular baby games</h2>
                    </router-link>
                    <font-awesome-icon icon="trashAlt" />
                    <ul v-if="gamesForBabyHomeDisplay" class="cards-container-home  flex  clean-list content-center">
                        <li v-for="game in gamesForBabyHomeDisplay.slice(2, 6)" :key="game._id">
                            <router-link :to="`/game/${game._id}/`">
                                <el-card class="card-home">
                                    <div v-if="game.isNew" class="game-new-icon">
                                        <!-- <img src="img/new-icon.png"> -->
                                    </div>
                                    <div class="image-container flex align-center justify-center">
                                        <img :src="game.src" class="image-card">
                                    </div>
                                    <div class="card-text-container flex justify-center align-center column">
                                        <div type="text" class="user-name-card-home">
                                            <gameUser :userId="game.userId" class="user-game-container flex column"></gameUser>
                                        </div>
                                        <div>
                                            <span class="card-game-name">{{game.name}}</span>
                                        </div>
                                        <div class="username-time-container flex space-between align-center">
                                            <time class="time">{{ game.addedAt | getDate }}</time>
                                        </div>
                                    </div>
                                </el-card>
                            </router-link>
                        </li>
                    </ul>
                    <router-link class="link-to-gallery" :to="'/game'" @click.native="setFilter('baby')">
                        <h2 class="link-to-gallery">See more...</h2>
                    </router-link>
                </div>
            </div>

            <div class="child-cards-container space-between">
                <div  class="child-cards flex container justify-center">
                    <div class="filter-type home-filter-container home-filter-container-child flex column align-center justify-center">
                        <router-link :to="'/game'" @click.native="setFilter('child')">
                            <h2 class="type-title-home">Most popular child games</h2>
                        </router-link>
                        <ul v-if="gamesForChildHomeDisplay" class="cards-container-home  flex  clean-list content-center">
                            <li v-for="game in gamesForChildHomeDisplay.slice(2, 6)" :key="game._id">
                                <router-link :to="`/game/${game._id}/`">
                                    <el-card class="card-home">
                                        <div v-if="game.isNew" class="game-new-icon">
                                            <!-- <img src="img/new-icon.png"> -->
                                        </div>
                                        <div class="image-container flex align-center justify-center">
                                            <img :src="game.src" class="image-card">
                                        </div>
                                        <div class="card-text-container flex justify-center align-center column">
                                                <div type="text" class="user-name-card-home">
                                                  <gameUser :userId="game.userId" class="user-game-container flex column"></gameUser>
                                                </div>
                                            <span class="card-game-name">{{game.name}}</span>
                                            <div class="username-time-container flex space-between align-center space-between">
                                                <time class="time">{{ game.addedAt | getDate }}</time>
                                            </div>
                                        </div>
                                    </el-card>
                                </router-link>
                            </li>
                        </ul>
                        <router-link class="link-to-gallery" :to="'/game'" @click.native="setFilter('child')">
                            <h2 class="link-to-gallery">See more...</h2>
                        </router-link>
                    </div>
                </div>
            </div>
              <div class="teen-cards-container space-between justify-center">
                  <div class="teen-cards flex container justify-center">
                      <div class="filter-type home-filter-container home-filter-container-teen flex column align-center justify-center">
                          <router-link :to="'/game'" @click.native="setFilter('teen')">
                              <h2 class="type-title-home">Most popular teen games</h2>
                          </router-link>
                          <ul v-if="gamesForTeenHomeDisplay" class="cards-container-home flex clean-list content-center">
                              <li v-for="game in gamesForTeenHomeDisplay.slice(2, 6)" :key="game._id">
                                  <router-link :to="`/game/${game._id}/`">
                                      <el-card class="card-home">
                                          <div v-if="game.isNew" class="game-new-icon">
                                              <!-- <img src="img/new-icon.png"> -->
                                          </div>
                                          <div class="image-container flex align-center justify-center">
                                              <img :src="game.src" class="image-card">
                                          </div>
                                          <div class="card-text-container flex justify-center align-center column">
                                                <div type="text" class="user-name-card-home">
                                                  <gameUser :userId="game.userId" class="user-game-container flex column"></gameUser>
                                                </div>
                                              <span class="card-game-name">{{game.name}}</span>
                                              <div class="username-time-container flex space-between align-center space-between">
                                                  <time class="time">{{ game.addedAt | getDate }}</time>
                                              </div>
                                          </div>
                                      </el-card>
                                  </router-link>
                              </li>
                          </ul>
                          <router-link class="link-to-gallery" :to="'/game'" @click.native="setFilter('teen')">
                              <h2 class="link-to-gallery">See more...</h2>
                          </router-link>
                      </div>
                  </div>
              </div>
            </div>
    </section>
</template>
<script>
import GameService from "@/services/GameService.js";
import UserService from "@/services/UserService.js";
import Gallery from "@/views/Gallery.vue";
import GameFilter from "@/components/GameFilter.vue";
import GameUser from "@/components/GameUser.vue";
import { eventBus, EVENT_SET_FILTER } from "@/services/EventBusService.js";

export default {
  name: "home",
  components: {
    GameFilter,
    GameUser
  },
  data() {
    return {
      filterBy: {
        allByName: false,
        name: "",
        allTypes: false,
        type: [],
        allCategories: false,
        category: [],
        userId: ""
      },
      url: 'url("img/homepage-img.jpg")'
    };
  },
  created() {
    this.$store.commit({type: 'setUrl', url: '/'})
    this.loadGamesForHomepage();
  },
  computed: {
    gamesForBabyHomeDisplay() {
      // console.log('gamesForBabyHomeDisplay in home', this.$store.getters.gamesForBabyHomeDisplay);
      return this.$store.getters.gamesForBabyHomeDisplay;
    },
    gamesForChildHomeDisplay() {
      // console.log('gamesForChildHomeDisplay in home', this.$store.getters.gamesForChildHomeDisplay);
      return this.$store.getters.gamesForChildHomeDisplay;
    },
    gamesForTeenHomeDisplay() {
      // console.log('gamesForTeenHomeDisplay in home', this.$store.getters.gamesForTeenHomeDisplay);
      return this.$store.getters.gamesForTeenHomeDisplay;
    },
    gamesLoading() {
      return this.$store.getters.gamesLoading;
    }
  },
  methods: {
    loadGamesForHomepage() {
      this.$store
        .dispatch({ type: "loadGamesForHomepage" })
        .then(games => {})
        .catch(err => {
          console.log("err", err);
        });
    },
    setSearchHome() {
      this.allByName = true;
      // console.log('setSearchHome in cmp');
      this.$store
        .dispatch({ type: "setSearchHome", filterBy: this.filterBy })
        .then(games => {
          this.$router.push("/game");
        });
    },
    setFilter(type) {
      console.log("this.filterBy in home", type);
      // eventBus.$emit(EVENT_SET_FILTER, this.filterBy);
      this.filterBy.type = [type];
      this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.loader-circle{
 top: 40%;
}

.home-bg-img {
  height: 260px;
  // height: 400px;
  position: relative;
}

.header-bg-image {
  position: absolute;
  top: 195px;
  width: 100%;
  color: white;
  font-size: rem(25px);
  font-family: "Ubuntu-regular";
  text-shadow: 3px 3px 3px black, 0 0 0 black, 0 0 0.2em black;
}

.search {
  margin-bottom: rem(20px);
  position: relative;
  bottom: rem(-50px);
}

.search-input {
  width: 200px;
  height: 36px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid $border-color;
  padding: rem(10px);
  font-size: rem(18px);
}

.search-btn-text {
  display: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #dcdfe6;
  color: white;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: .1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  &:hover {
    background-color: #9ec6fc;
  }
}
button.search-btn-text {
  display: none;
}

.search-btn {
  height: 38px;
  font-size: rem(14px);
  background-color: $main-color;
}

.type-title-home {
  align-self: flex-start;
  font-size: rem(20px);
  font-family: "Ubuntu";
  margin-top: rem(30px);
  margin-bottom: rem(10px);
}

.home-filter-container-baby,
.home-filter-container-teen {
  background-color: aliceblue;
}

.home-filter-container {
  padding-bottom: rem(20px);
}

.cards-container-home {
  width: 100%;
  flex-wrap: wrap;
  li {
    padding: 10px;
  }
}

.card-home {
  position: relative;
  margin: rem(10px);
  width: rem(200px);
  height: rem(280px);
  transition: all 0.5s;
  cursor: pointer;
  .image-container {
    height: rem(150px);
  }
  .image-card {
    width: 80%;
  }
  &:hover {
    transform: scale(1.1, 1.1);
  }
  .card-text-container {
    background-color: #dadada54;
    width: 100%;
    height: rem(120px);
    padding: rem(10px);
    position: absolute;
    top: rem(180px);
    left: rem(0px);
  }
  .username-time-container {
    padding: rem(10px);
  }
  .card-game-name {
    text-transform: capitalize;
    font-family: "PaytoneOne";
    font-size: rem(20px);
    color: $main-color;
    padding: 0;
    width: 170px;
    white-space: nowrap; 
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .game-new-icon .game-new-icon {
    position: absolute;
    top: -2px;
    left: -2px;
  }
  .user-name-card-home {
    padding: 0 rem(15px);
    font-size: rem(14px);
    float: right;
    color: $secondary-color;
    font-family: "Ubuntu-regular";
    position: relative;
    margin-bottom: 10px;
  }
  .time {
    font-size: rem(14px);
    color: #999;
    font-family: "Ubuntu-regular";
  }
}

.type-title-home {
  align-self: left;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.arrow-btn {
  background-color: inherit;
  border: none;
  font-size: 2em;
}

.link-to-gallery {
  font-size: rem(20px);
  font-family: "Ubuntu";
  transition: all 0.5s;
  align-self: flex-end;
  &:hover {
    color: $secondary-color;
    transform: scale(1.1, 1.1);
  }
}

.card-home {
  margin: 0;
}
.baby-cards-container {
  background-color: aliceblue;
}
.child-cards-container {
  background-color: white;
}
.user-game-container {
  position: absolute;
  top: -62px;
  left: -15px;
}

@media (min-width: 540px) {
  .header-bg-image {
    top: 212px;
    font-size: rem(33px);
  }
  .search {
    margin-bottom: rem(18px);
    bottom: rem(-70px);
  }
  .search-btn-text {
    display: none;
  }
}

@media (min-width: 800px) {
  .header-bg-image {
    top: 309px;
    font-size: rem(50px);
  }
  .home-bg-img {
    height: 400px;
  }
  .search-btn {
    display: none;
  }

  button.search-btn-text {
  display: block;
}

  .search-btn-text {
    display: block;
    font-family: "Ubuntu-regular";
    height: 50px;
    float: right;
    font-size: rem(18px);
    background-color: $main-color;
    margin-left: 0px;
  }
  .el-button+.el-button{
    margin-left: 0;
  }
  .search-input {
    width: 500px;
    height: 50px;
  }
  .type-title-home {
    font-size: rem(35px);
  }
  .cards-container-home{
    justify-content: flex-start;
  }
  .search {
    margin-bottom: rem(18px);
    bottom: rem(-80px);
  }
}

@media (min-width: 1080px) {
  .header-bg-image {
    font-size: rem(60px);
  }
  .type-title-home {
    font-size: rem(40px);
  }
  .search {
    margin-bottom: rem(20px);
  }

}
</style>