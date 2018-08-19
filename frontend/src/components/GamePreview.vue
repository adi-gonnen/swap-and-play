<template>
    <div class="game-preview" :class="{checkedBorder: checked, gameRequest: isGameRequest}">
        <ul :class="{gallery: isGallery}" class="game-preview-container pointer flex column align-center clean-list space-between"
            v-if="game && currUser">
            <li class="offer-game-2" :class="{gameRequest: isGameRequest}">
                <label class="check" :class="{gameRequest: isGameRequest}">
                    <input type="checkbox" checked @change=" $emit('check', {gameId :game._id, checked:checked})
                  " v-model="checked" v-if="gameCheckbox" />
                    <div class="box" :class="{gameRequest: isGameRequest}"></div>
                </label>
            </li>
            <li class="game-name-preview">{{game.name}}</li>
            <li v-if="game.isNew" class="game-new-icon">
                <img v-if="!newIcon" src="img/new-icon.png">
            </li>
            <div class="image-container" :style="{backgroundImage: url, backgroundSize: 'cover', 
               backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
            </div>
            <div class="image-container flex align-center justify-center">
                <img :src="game.src" class="image-card">
            </div>
            <div class="card-text-container" :class="{gallery: isGallery}">
                <li class="game-category-preview capitalize" :class="{gameRequest: isGameRequest}">
                    <span :class="{gallery: isGallery}">Category </span>{{game.category}}</li>
                <li class="game-condition-preview capitalize" v-if="!condition">
                    <span :class="{gallery: isGallery}">Condition </span>{{game.condition}}</li>
                <li class="game-addedAt-preview capitalize" :class="{gameRequest: isGameRequest}">
                    <font-awesome-icon icon="clock" class="clock" /> {{game.addedAt | getDate }}</li>
                <li class="game-location-preview capitalize" v-if="!location">
                   <font-awesome-icon icon="home" class="home" /> {{currUser.city}}</li>
            </div>
        </ul>
    </div>
</template>
<script>
import GameUser from "@/components/GameUser.vue";
import GameService from "../services/GameService.js";

export default {
  name: "GamePreview",
  components: {GameUser},
  props: ["game", "gameCheckbox", "condition", "username", "newIcon", "isGallery", "isGameRequest","location"],
  data() {
    return {
      checked: true,
      currUser: null,
    };
  },
  created() {
      this.getUser();
        
  },

  methods: {
     getUser(){
      GameService.getUserById(this.game.userId)
      .then(user =>{
        this.currUser = user
      })
    },
  },
  computed: {
    url() {
      return `url("${this.game.src}")`;
    },
    loggedinUser() {
      // console.log(this.$store.getters.loggedUser);
      return this.$store.getters.loggedUser || {};
    }
  }
};
</script>


<style scoped lang="scss">
@import "../assets/scss/style.scss";

.gameRequest.checkedBorder.game-preview {
    border: 2px solid $secondary-color;
}

.gameRequest.game-category-preview, 
.gameRequest.game-addedAt-preview , {
    color: grey;
    & span {   
        color: #adaaaa;
    }
}

.game-category-preview .gallery, .game-condition-preview .gallery {
    color: #adaaaa;
}

.gameRequest.check {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transition: all 0.3s;
  
  input {
    display: none;
    &:checked + .box {
    //   background-color: $secondary-color;
      
      &:after {
        top: 0;
      }
    }
  }
  
  .gameRequest.box {
    width: 50%;
    height: 50%;
    transition: all 1.1s cubic-bezier(.19,1,.22,1);
    border: 2px solid #d5d3d3;
    border-radius: 4px;
    background-color: $card-text-color;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    //   box-shadow: 0 5px rgba(0,0,0,.2);
    &:after {
      width: 50%;
      height: 20%;
      content: '';
      position: absolute;
      border-left: 3.5px solid;
      border-bottom: 3.5px solid;
      border-color: $secondary-color;
      transform: rotate(-45deg) translate3d(0,0,0);
      transform-origin: center center;
      transition: all 1.1s cubic-bezier(.19,1,.22,1);
      left: 0;
      right: 0;
      top: 200%;
      bottom: 5%;
      margin: auto;
    }
  }
}




.gallery.game-preview-container {
    width: 200px;
    height: 280px;
    // pointer flex column align-center clean-list space-between
}

.gallery.card-text-container {
    text-align: left;
    font-size: 13px;
    background-color: $card-text-color;
    width: 100%;
    height: 38%;   
    /* margin: 20px; */
    padding: 5px;
}

.game-preview {
    height: 100%;

}
.game-preview-container {
    position: relative;
    transition: all 0.5s;
    height: 100%;
        &:hover {
        //    transform: scale(0.95, 0.95);
        }
}

.gameRequest.offer-game-2 {
    position: absolute;
    top: 40px;
    left: 10px;
}

.el-checkbox.offer-game {
    padding: 15px;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1.5);
}

.game-name-preview {
    font-size: rem(16px);
    font-family: "Ubuntu";
    color: $main-color;
    text-transform: capitalize;
    padding: 10px;
    z-index: 5;
    width: 60%;
}

img {
    width: 85%; //todo in if class!!! - i think we dont need
    height: auto;
    transition: all 0.5s;
    margin: 15px -10px; 
}


.game-category-preview,
.game-condition-preview,
.game-addedAt-preview,
.game-location-preview,
.game-user-name-preview {
    padding: rem(5px);
    color: $secondary-color;
    font-family: "Lato-Bold";
    span {
    color: gray;
    }
}

.game-user-name-preview span {
    text-transform: capitalize;
    color: $secondary-color;
}

.game-new-icon {
    img{
        width: 40%;
    }
    width: 55%;
    position: absolute;
    top: -40px;
    left: -60px;
}

ul {
    position: relative;
}

.card-text-container {      //for gamerequest
    background-color: $card-text-color;
    width: 100%;
    height: 27%;
    /* margin: 20px; */
    padding: 5px;
}

@media (min-width: 980px ){
    .gallery.game-preview-container {
        margin: 0;
    }
}

</style>
