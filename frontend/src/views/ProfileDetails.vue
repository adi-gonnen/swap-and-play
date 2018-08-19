<template>
    <section class="profile-details-page flex justify-center align-center column" v-if="loggedinUser">
        <router-link :to="'/game/edit/'">
        </router-link>
        <div class="my-profile" v-if="loggedinUser">
            <div class="profile-edit-container flex">
                <div class="user-img" :style="{backgroundImage: `url(${loggedinUser.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
                </div>  
                <div class="user-details-container flex column">
                    <div class="user-data-container">
                        <div class="edit-name-container flex space-between">
                            <p class="user-name">{{loggedinUser.username}}</p>
                            <button v-if="loggedinUser && !editMode" class="btn icon-btn edit-profile-btn" type="primary" @click="editProfile"><font-awesome-icon icon="pen" /></button>
                        </div>                        
                        <p class="capitalize"><font-awesome-icon icon="home" class="home" />&nbsp;{{loggedinUser.city}}</p>
                        <p><font-awesome-icon icon="envelope" class="envelop" />&nbsp;{{loggedinUser.email}}</p>
                    </div>
                    <router-link :to="`/user/activity/${loggedinUser._id}/recieve`" v-if="loggedinUser" class="btn activities-btn" type="primary">
                        My activities
                    </router-link>
                </div>
            </div>
            <div v-if="copiedUser">
            <el-form v-if="editMode" class="edit-user-profile no-margin" :label-position="labelPosition" @submit.native.prevent="saveUserProfile">
              <el-form-item class="form-item" label="username">
                <el-input v-model="copiedUser.username"/>
              </el-form-item>
              <el-form-item class="form-item" label="password" type="password">
                <el-input v-model="copiedUser.password"/>
              </el-form-item>
              <el-form-item class="form-item" label="email">
                <el-input v-model="copiedUser.email"/>
              </el-form-item>
              <el-form-item class="form-item" label="city">
                <el-input class="form-input" v-model="copiedUser.city"/>
              </el-form-item>
              <el-button class="btn save-profile-btn" type="primary" @click="saveUserProfile">Save</el-button>
              <el-button @click="unSaveUserProfile">Cancel</el-button>
          </el-form>
        </div>
        <div class="profile-games container">
            <h2 class="headres-in-profile-details">My games:</h2>
            <button v-if="loggedinUser" class="btn add-game-btn" type="primary" @click="checkIfDisplay"><font-awesome-icon icon="plus" /></button>
            <ul class="cards-in-profile-container flex align-center justify-center" v-if="games">
                <li class="game" v-for="game in games" :key="game._id">
                    <div class="card-in-profile-details flex align-center pointer column clean-list space-between">
                        <div class="card-image-container flex content-center align-center justify-center">
                            <img :src="game.src" class="image-card">
                        </div>
                        <div class="text-btns-container flex column">
                            <div class="text-container flex column">
                                <p class="card-game-name">{{game.name}}</p>
                                <div class="game-category capitalize bottom clearfix"><span>Category </span> {{game.category}}</div>
                                <time class="time bottom clearfix"><font-awesome-icon icon="clock" class="clock" />&nbsp;{{ game.addedAt | getDate }}</time>
                            </div>
                            <div class="edit-remove-btns-container">
                                <button class="btn icon-btn btn-remove" @click="$emit('remove', game._id)"> <font-awesome-icon icon="trash" /></button> 
                                <router-link class="icon-btn btn-edit" :to="'/game/edit/'+game._id"><font-awesome-icon icon="pen" /></router-link> 
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            </div>
        </div>
    </section>
</template>

<script>
import Header from "@/components/Header.vue";
import GamePreview from "@/components/GamePreview.vue";
import CloudinaryService from "@/services/CloudinaryService.js";

export default {
  name: "ProfileDetails",
  components: {
    Header,
    GamePreview
  },
  data() {
    return {
      labelPosition: "left",
      isEdit: false
    };
  },
  created() {
    this.$store.dispatch({ type: "gamesById", games: this.loggedinUser.games });
    // console.log('$$$user loggedin$$$', this.loggedinUser._id);
    // console.log('user$$$', this.$route.params.userId);
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser || {};
    },
    url() {
      return `url("${this.loggedinUser.src}")`;
    },
    copiedUser() {
      return JSON.parse(JSON.stringify(this.loggedinUser));
    },
    games() {
      // console.log('gamezzzzzz', this.$store.getters.getUserGames);
      return this.$store.getters.getUserGames || [];
    },
    editMode() {
      return this.isEdit;
    }
  },
  methods: {
    checkIfDisplay() {
      // console.log('this.loggedinUser',this.loggedinUser)
      if (!this.loggedinUser) {
        swal({
          title: "Please login to add your game",
          buttons: ["Not now", "Login"]
        }).then(willLogin => {
          if (willLogin) this.$router.push("/login");
          else swal.close();
        });
      } else this.$router.push(`/game/edit/user/${this.loggedinUser._id}`);
    },
    saveUserProfile() {
      // this.$router.go(-1);
      this.$store
        .dispatch({
          type: "savedUserProfile",
          savedUserProfile: this.copiedUser
        })
        .then(game => {
          swal("Your details have been saved!", {
            className: "swal-text",
            icon: "success",
            timer: 1500,
            button: false
          });
          // console.log('savedUserProfile from game APP');
        });
      this.isEdit = !this.isEdit;
    },
    unSaveUserProfile() {
      this.isEdit = !this.isEdit;
    },
    editProfile() {
      // console.log('this.loggedinUser in profileDetailes',this.loggedinUser)
      // console.log("copiedUser", this.copiedUser);
      this.isEdit = !this.isEdit;
    },
    uploadImgs(img, event) {
      CloudinaryService.uploadImg(img, ev);
    }
  }
};
</script>

<style scoped lang="scss">
// @import "~@/assets/scss/style.scss";

.profile-games {
    max-width: 980px;
    position: relative;

}
.profile-edit-container {
  max-width: 980px;
  // margin: 30px 100px;
  background-color: aliceblue;
  background-color: $card-text-color;
  justify-content: center;
  // padding: rem(40px);
}

.image-container {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

.user-img {
  margin: 0 20px;
}

.user-data-container {
    color: gray;
}

.profile-img-page {
  width: 100%;
  height: 100%;
}
.user-details-container {
    justify-content: space-around;  
    // margin: 20px 0;
    width: 250px;
    height: 200px;
}
.user-details-container p {
  margin: 5px;
  text-align: left;
  font-size: 14px;
}
.user-details-container p:first-child {
  font-weight: bold;
}

.user-name {
  font-size: rem(22px);
}

.user-detail,
.activities-btn {
  font-size: rem(16px);
}

.my-games-header-container button {
  margin: 0 5px;
}
.btn {
  color: $main-color;
}

.profile-btns {
  align-self: flex-end;
  font-size: rem(18px);
}

.activities-btn {
    align-self: flex-start;
    margin: 20px 0 0 5px;
    transition: all 0.3s;
    font-size: 18px;
    &:hover {
        color: $border-color;
    }
}

.header-your-games {
  margin-bottom: rem(20px);
}

.my-profile-header {
  padding: rem(20px);
}

.edit-user-profile {
  border: 1px solid $main-color;
  width: rem(500px);
  padding: rem(40px);
}

.form-item,
.form-input {
  text-transform: capitalize;
}

.save-profile-btn {
    color: white;
    background-color: $main-color;
}

.add-game-btn {
  align-self: flex-start;
  color: white;
  float: left;
  left: rem(70px);
  top: rem(-1px);
  font-size: 35px;
}

.cards-in-profile-container {
  flex-wrap: wrap;
  // width: 1200px;
  width: 100%;
}

.headres-in-profile-details {
    font-size: rem(30px);
    font-family: 'Ubuntu';
    // margin-bottom: rem(20px);
}

.card-in-profile-details {
    width: rem(250px);
    height: rem(315px);
    margin: rem(20px);
    padding: rem(10px);
    border: 1px solid $border-color;
    .image-card {
        max-height: 170px;
        max-width: 190px;
        margin: 0;
    }
    .card-game-name {
        text-transform: capitalize;
        font-family: 'PaytoneOne';
        font-size: rem(20px);
        color: $main-color;
    }
}

.text-btns-container {
    background-color: $card-text-color;
    width: 109%;   
    height: 115px;
    padding: 10px 0;
    margin: 0 20px;
    position: relative;
    top: 10px;
}

.card-game-name, .game-category, .time {
    align-self: flex-start;
    padding: 0 20px;
}

.game-category {
    color: $secondary-color;
}

.game-category span {
    color: grey;
}

.edit-remove-btns-container {
    align-self: flex-end;
    padding: 0 20px;
}

.card-image-container {
    height: 200px;
}

.bottom {
    margin-top: 10px;
    line-height: 12px;
    // color: grey;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.icon-btn {
    font-size: rem(30px);
    
    transition: all 0.3s;
}
.btn-remove, .edit-profile-btn, .profile-games .add-game-btn {
    border: 0;
    background-color: transparent;
}

.btn-remove {
    margin-right: 10px;
}

.btn-remove, .btn-edit {
color: $secondary-color;
    &:hover {
        color: $main-color;
    }
}
.edit-profile-btn, .add-game-btn {
    color: $main-color;
  }

.edit-profile-btn {
  margin-top: 10px;
  color: $main-color;
  align-self: flex-start;
  &:hover {
    color: $secondary-color;
  }
}

.game-category {
    font-family: 'Ubuntu-regular';
    white-space: nowrap;
    // margin-bottom: rem(20px);
        & span {
            font-family: 'Lato-Bold';
        }
}

.time {
    font-family: 'Ubuntu-regular';
    color: $secondary-color;
}

.swal-text {
  font-size: 50px;
  font-family: sans-serif;
}
.user-img {
  width: 200px;
  height: 200px;
}

.user-name {
  text-transform: capitalize;
}
.btn-submit {
  color: white;
}
.publish-form {
  // background-color: $secondary-color;
  padding: 5px;
}
.publish-form {
  margin: 40px;
}
.user-img {
  width: 80px;
  height: 80px;
  margin: 10px;
}

.btns-container {
  flex-direction: column;
}

.el-button {
  padding: 10px 10px;
  margin: 10px;
}

@media (min-width: 700px) {
  .btns-container {
    flex-direction: row;
  }
  .user-details-container p {
    margin: 5px;
    text-align: left;
    font-size: 20px;
  }
  .profile-edit-container {
    margin: 30px 0;
    padding: rem(40px);
    // justify-content: space-evenly;
  }
    .user-img {
    width: 200px;
    height: 200px;
  }

}

@media (min-width: 980px) {
  .user-img {
    width: 200px;
    height: 200px;
  }
  .el-button {
    padding: 14px 20px;
  }
  .profile-edit-container {
    margin: 30px 0;
  }
}

@media only screen and  (max-width: 540px) {
  .edit-user-profile {
    width: 95%;
    margin: 20px auto;
  }
}
</style>


   