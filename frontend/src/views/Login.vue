
<template>
  <div class="login-container">
      <div class="form-container flex">
        <el-form  v-if="loginForm" class="flex column">
            <el-form-item class="login-form flex column">
                <h1>Log-In</h1>
                <el-form-item class="flex insert-form">
                  <p>Enter user Name:</p>
                  <el-input v-model="user.username" type="text" class="el-input-user"/>
                </el-form-item>
                <el-form-item class="flex insert-form">
                  <p>Enter password:</p>
                  <el-input v-model="user.password" type="password" class="el-input-user"/>
                </el-form-item>
                <el-form-item>
                <div class="btns-container flex space-between">
                  <el-button type="primary" @click="login" class="btn login-btn">Login</el-button>
                  <router-link :to="`/game`">
                    <el-button class="btn-cancel" type="submit">cancel</el-button>
                  </router-link>
                </div>
                </el-form-item>
            </el-form-item>
            <el-button type="submit" @click="openSignupModal" class="btn-signup">
                  Sign up
            </el-button>
        </el-form>
        <el-form  v-if="signupForm">
          <el-form-item class="login-form flex column">
            <h4>Sign up</h4>
            <p>Your Name:</p>
            <el-input v-model="newUser.username" type="text" class="el-input-user"/>
            <p>Choose Password:</p>
            <el-input v-model="newUser.password" type="password" class="el-input-user"/>
            <p>E-mail:</p>
            <el-input v-model="newUser.email" type="email" class="el-input-user"/>
            <p>City:</p>
            <el-input v-model="newUser.city" type="text" class="el-input-user"/>
            <div class="flex space-between">
              <el-button type="submit" @click="signup" class="btn-signup">
              Signup
              </el-button>
              <router-link :to="`/game`">
                <el-button class="btn-cancel" @click="back" type="submit">cancel</el-button>
              </router-link>
            </div>
          </el-form-item>
        </el-form>
    </div>

  </div>
</template>

<script>
import { eventBus, EVENT_LOGIN_USER } from "../services/EventBusService.js";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      newUser: {
        username: "",
        password: "",
        email: "",
        isAdmin: false,
        city: "",
        games: []
      },
      signupForm: false,
      loginForm: true,
      url: "/game"
    };
  },
  created() {
    // console.log("this.url in login", this.url);
    if (this.$store.getters.setUrl) this.url = this.$store.getters.setUrl;
  },
  methods: {
    login() {
      this.$store
        .dispatch({
          type: "getUser",
          user: this.user
        })
        .then(user => {
          this.$router.push(`${this.url}`);
          console.log("user$$----:", user);
          this.$store.dispatch({
            type: "getMatch",
            user: user._id
          });
        })
        .catch(err => {
          console.log(err)
          this.$store.commit({ type: "setUrl", url: "/game" });
          console.log("Wrong user/ password", err);
          this.$router.push(`/login`);
          swal("Wrong user/ password", {
            className: "swal-text",
            icon: "error",
            timer: 2000,
            button: false
          });
        })
    },
    signup() {
      this.$router.push(`${this.url}`);
      // console.log("signup user**", this.newUser);
      this.$store
        .dispatch({
          type: "createUser",
          newUser: this.newUser
        })
        .then(_ => {
          eventBus.$emit(EVENT_LOGIN_USER, user);
        })
        .catch(err => console.log(err));
      this.$store.commit({ type: "setUrl", url: "/game" });
    },
    openSignupModal() {
      this.signupForm = true;
      this.loginForm = false;
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.login-form {
  border: 1px solid $border-color;
  box-shadow: 0px 2px 4px 0px #d9d8d8;
  margin: auto;
  padding: 5px;
  width: 305px;
  align-items: center;
}

.form-container {
  margin: 20px auto;
  justify-content: center;
}
.login-container {
  margin-top: 60px;
}

.btn {
  width: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.btn-signup {
  background-color: $secondary-color;
  color: white;
  margin: 20px;
  width: 100px;
  margin: 20px auto;
  margin-top: 50px;
}
.el-form-item__content {
  margin: 10px 50px;
}
.btn-cancel {
  margin: 20px auto;
  margin-top: 50px;
}

.login-btn {
  margin-top: 50px;
  background-color: $main-color;
}
</style>
