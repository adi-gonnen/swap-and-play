<template>
    <section class="edit-game-container">
    <h3 class="edit-title" >{{this.$route.params.gameId? 'Edit your game!': 'Add your game!'}}</h3>
        <div class="edit-game no-margin" v-if="gameCopy">
          <el-form class="form-container no-margin flex column" :label-position="labelPosition" @submit.native.prevent="saveGame">
              <el-form-item label="Name">
                <el-input class="input-name" v-model="gameCopy.name"/>
              </el-form-item>
              <el-form-item label="Descreption">
                <el-input class="input-desc" type="textarea" v-model="gameCopy.desc"/>
              </el-form-item>
              <el-form-item label="Type" class="header-select-container flex space-between content">
                <el-select class="select" v-model="gameCopy.type" placeholder="Type">
                    <el-option class="option" value="baby">Baby</el-option>
                    <el-option class="option" value="child">Child</el-option>
                    <el-option class="option" value="teen">Teen</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Category" class="header-select-container flex space-between">
              <el-select class="select" v-model="gameCopy.category" placeholder="Category">
                  <el-option class="option" value="board-game">Board-game</el-option>
                  <el-option class="option" value="console">Console</el-option>
                  <el-option class="option" value="doll">Doll</el-option>
                  <el-option class="option" value="lego">Lego</el-option>
                  <el-option class="option" value="playmobil">Playmobil</el-option>
                  <el-option class="option" value="wheels">Wheels</el-option>
                  <el-option class="option" value="puzzle">Puzzle</el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="Condition" class="header-select-container flex space-between">
                <el-select class="select" v-model="gameCopy.condition" placeholder="Condition">
                    <el-option class="option" value="brand-new">Brand new</el-option>
                    <el-option class="option" value="new">New</el-option>
                    <el-option class="option" value="used">Used</el-option>
                </el-select>
            </el-form-item>  
            <div class="upload-container flex">
              <label for="file">
                <input type="file" class="upload-form" id="file" name="file" ref="imageUpload" @change="handleImage"/>
                <font-awesome-icon icon="upload" class="upload-icon" />&nbsp;Choose a file
              </label>
              <div class="img-preview-container flex">
                <img v-for="(img, idx) in imgPreviews" :src="img" :key="idx" />
              </div>
            </div>
            <div class="btns-container flex justify-center align-center">
              <el-button class="btn-save" type="primary" @click="saveGame">Save</el-button>
              <el-button class="btn-cancel" @click="$router.go(-1)">Cancel</el-button>
            </div>
          </el-form>
        </div>
    </section>
</template>

<script>
import swal from "sweetalert";
import GameService from "@/services/GameService.js";
import UserService from "@/services/UserService.js";
import CloudinaryService from "@/services/CloudinaryService.js";

export default {
  name: "editGame",
  props: ["userId"],
  data() {
    return {
      currGame: null,
      currUser: null,
      gameCopy: null,
      labelPosition: "left",
      imgPreviews: []
    };
  },
  created() {
    this.loadGame();
    // console.log('userrrr:', this.$route.params.userId);
  },
  methods: {
    loadGame() {
      // console.log("this.$route.params in edit cmp", this.$route.params.gameId);
      if (this.$route.params.gameId) {
        // console.log("has params!!");
        this.$store
          .dispatch({ type: "loadGame", gameId: this.$route.params.gameId })
          .then(game => {
            this.currGame = game;
            // console.log("this.currGame in edit cmp", this.currGame);
            this.gameCopy = JSON.parse(JSON.stringify(this.currGame));
            // console.log("this.gameCopy new in edit cmp", this.gameCopy);
          });
      } else {
        console.log("has No params!! user>>", this.$route.params.userId);
        this.gameCopy = GameService.createEmptyGame(this.$route.params.userId);
      }
    },
    saveGame() {
      // console.log('user@@@: ', this.userId);
      this.handleImageUpload(this.imgPreviews[0])
      .then(() => {
        // console.log('game!!', this.gameCopy);        
        this.$store.dispatch({ type: "saveGame", savedGame: this.gameCopy })
          .then(game => {
            // console.log('new gameeeee', game);
            return UserService.getUserById(this.$route.params.userId) 
              .then (user => {
                this.currUser = JSON.parse(JSON.stringify(user));;
                this.currUser.games.push(game._id);
                // console.log('new userrrr', this.currUser);
                this.$store.dispatch({ type: 'savedUserProfile', savedUserProfile: this.currUser })
              })
              .then (() => {
                // console.log('new userrrr@@@@', this.user);
                swal("Game has been saved!", {
                  className: "swal-text",
                  icon: "success",
                  timer: 1500,
                  button: false
                })
              })
            // console.log("savedGame from game APP");
          });
      })
      this.$router.go(-1);
    },
    handleImage(ev) {
      console.log("handleImage, ev is:", ev);
      var image = ev.target.files[0];
      getBase64(image).then(image => {
        this.imgPreviews.push(image);
      });
    },
    handleImageUpload(img) {
      if (!img) return Promise.resolve()
      return CloudinaryService.uploadImg(img).then(res =>
        this.gameCopy.src = res.url
      )
    }
  }
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function(error) {
      reject(error);
    };
  });
}
</script>

<style scoped lang="scss">
// @import '~@/assets/scss/style.scss';
// @import  'node_modules/sweetalert/src/sweetalert.scss';

.edit-game-container {
  margin: rem(20px);
}

.edit-title {
  font-family: "Lato-regular";
  font-size: rem(30px);
  margin: 40px 0 20px 0;
}

.form-container {
  width: 100%;
}

.edit-game {
  border: 1px solid $main-color;
  width: 100%;
  padding: 30px;
}
.select.option {
  font-family: "Lato-regular";
}

.select {
  width: 150px;
  align-self: flex-start;
}

.content::before {
  content: 'ccc';
  visibility: hidden;
}

.form-item {  
  width: 300px;
}
.img-preview-container {
  cursor: pointer;
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
  }
}

  .upload-container {
    align-self: center;
    margin: 20PX;
    color: $main-color;
    font-size: rem(18px);
    transition: all 0.3s;
    &:hover{
      color: $secondary-color;
    }
  }

.upload-form {
  margin: 20px;
  cursor: pointer;
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
}

.upload-form + label {
    font-size: 1.25em;
    font-weight: 700;
    color: white;
    background-color: black;
    display: inline-block;
    cursor: pointer;
}

.upload-form:focus + label,
.upload-form + label:hover {
    background-color: red;
}

.swal-text {
  font-family: sans-serif;
  color: #0d72fa;
  font-size: 30px;
}


.btn-save {
  background-color: $main-color;
}

.btn-cancel, .btn-save {
  margin: 0 10px;
}


@media (min-width: 580px) {
  .edit-game {
    width: 100%;
  }

  .form-container {
    width: 90%;
  }

  .select {
    width: 200px;
  }
}

@media (min-width: 980px) {
  .edit-game {
    width: 55%;
  }

  .form-container {
    width: 55%;
  }
}

</style>


