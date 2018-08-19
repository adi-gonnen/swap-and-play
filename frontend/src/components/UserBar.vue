<template>
    <div class="user-bar flex">
        <div v-if="loggedinUser" class="user-bar-container flex space-evenly">
            <div class="user-icon-container flex">
                <router-link v-if="loggedinUser" :to="`/user/activity/${loggedinUser._id}/match`" class="flex not-container">
                    <el-badge :value="matchCount.length" v-if="matchCount.length > 0">
                        <font-awesome-icon icon="envelope" class="envelop" />
                    </el-badge>
                    <div v-else>
                        <font-awesome-icon icon="envelope" class="envelop" />
                    </div>
                </router-link>
                <router-link v-if="loggedinUser" :to="`/user/activity/${loggedinUser._id}/recieve`" class="flex not-container badge">    
                    <el-badge :value="recieveCount.length" v-if="recieveCount.length > 0" class="badge">
                        <font-awesome-icon icon="bell" class="bell" />
                    </el-badge>
                    <div v-else>
                        <font-awesome-icon icon="bell" class="bell" />
                    </div>
                </router-link>
                  <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`">
                  <div class="user-img" :style="{backgroundImage: `url(${loggedinUser.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
                  </div>                
                </router-link>
                <button class="btn-logout" @click="onLogout">Logout</button>
            </div>
        </div>
    </div>
</template>
               
<script>
import UserService from "../services/UserService.js";
import UtilService from "../services/UtilService.js";

export default {
  created() {
    // console.log('loggedinUser', this.loggedinUser);

    if (this.loggedinUser) {
      this.$store.dispatch({
        type: "getMatch",
        user: this.loggedinUser._id
      });
    }
  },
  methods: {
    onLogout() {
      this.$emit("update:loggedinUser", null);
      this.$emit("logout");
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    },
    recieveCount() {
      return this.$store.getters.getRecieves;
    },
    matchCount() {
      return this.$store.getters.getMatches;
    }
  },
  sockets: {
    newMatch() {
      if (!this.loggedinUser) return;
      this.$store.dispatch({ type: "getMatch", user: this.loggedinUser._id });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.btn {
  cursor: pointer;
}

.notification {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: absolute;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
}

.badge.notification {
  background-color: green;
}

.badge.el-badge__content {
  background-color: green;
}

.no-notification {
  display: none;
}
p {
  width: fit-content;
}
.user-bar {
  align-items: center;
}
.helloMsg {
  color: #f56c6c;
  font-size: 16px;
  margin-top: 5px;
  margin-right: 10px;
}
.btn-logout {
  color: $secondary-color;
  cursor: pointer;
  font-size: 16px;
  border: none;
  padding-right: 0;
  background-color: transparent;
  &:hover {
    color: $main-color;
  }
}
.login-link {
  color: $secondary-color;
}
.userMsg {
  color: #f56c6c;
  font-size: 16px;
  position: absolute;
  margin-top: -30px;
}
a {
  &:hover {
    color: $main-color;
  }
}
.user-icon-container {
  color: $secondary-color;
  display: flex;
  width: 190px;
  justify-content: space-around;

  a {
    transition: all 0.3s ease;
  }
}
.not-container {
  display: relative;
  align-items: center;
}
.user-img {
  transition: all 0.3s ease;
  &:hover {
    border-color: $main-color;
  }
}

</style>