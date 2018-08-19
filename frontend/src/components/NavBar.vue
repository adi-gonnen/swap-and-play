<template>
    <div class="nav-bar">
        <div class="mobile-menue" :class="{close: isOpen}" @click="isOpen=!isOpen">
            <span class="line line01"></span>
            <span class="line line02"></span>
            <span class="line line03"></span>
        </div>
      <transition 
      name="slowDisplay"
      >
        <ul class="nav-mobile flex column" v-if="isOpen" :class="{open: isOpen}">
            <router-link to="/">
                <li @click="isOpen=!isOpen">Home</li>
            </router-link>
            <router-link to="/game">
                <li @click="isOpen=!isOpen; clearFilter()">Gallery</li>
            </router-link>
            <router-link to="/about">
                <li @click="isOpen=!isOpen">About</li>
            </router-link>
            <router-link to="/contact">
            </router-link>
            <router-link to="/login" v-if="!loggedinUser">
            <li @click="isOpen=!isOpen">Login</li>
            </router-link>
        </ul>
      </transition>
        <div class="nav">
            <router-link to="/">Home</router-link>
            <router-link to="/game">
              <div @click="clearFilter">Gallery</div>
            </router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/login" v-if="!loggedinUser">
              <li>Login</li>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  name: "NavBar",
  created() {
    if (this.loggedinUser) {
      this.$store.dispatch({
        type: "getMatch",
        user: this.loggedinUser._id
      });
    }
  },
  data() {
    return {
      isOpen: false,
      filterBy: {
        allByName: true,
        name: "",
        allTypes: true,
        type: [],
        allCategories: true,
        category: [],
        userId: ""
      }
    };
  },
  methods: {
    clearFilter() {
      this.$store
        .dispatch({ type: "setFilter", filterBy: this.filterBy })
        .then(games => {
          console.log("clear games", games);
        });
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    }
  }
};
</script>

<style scoped lang="scss">
.nav-mobile {
  position: fixed;
  min-width: 100%;
  z-index: 7;
  background-color: $secondary-color;
  width: 100%;
  color: white;
  top: 0;
  right: 0;
  margin-top: 90px;
  font-size: rem(20px);
  line-height: 50px;
}

.nav-mobile.open {
  transform: translate(0, 0);
}

.mobile-menue {
  float: right;
  order: 1;
}

.nav-mobile a {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.nav-mobile li {
  width: 100%;
  height: 50px;
  color: white;
}

.nav-mobile li:hover {
  background-color: $main-hover-color;
  transition: all 0.3s ease;
}

.nav {
  display: none;
  align-items: center;
  justify-content: space-around;
  // padding: 30px;
  padding: 5px;

  a {
    padding: 10px;
    color: $secondary-color;
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
    &.router-link-exact-active {
      color: $main-color;
    }
    &:hover {
      color: $main-color;
    }
  }
}

.nav > h4 {
  cursor: pointer;
}

.mobile-menue {
  width: 35px;
  height: 35px;
  position: relative;
  cursor: pointer;
}

.line {
  position: absolute;
  height: 15px;
  width: 80%;
  left: 2%;
  background: $main-color;
  border-radius: 10px;
  cursor: pointer;
  transition: all cubic-bezier(0.25, 0.1, 0.28, 1.54) 0.32s;
}

.line01 {
  top: 19%;
  height: 3px;
}

.line02 {
  top: 49%;
  height: 3px;
}

.line03 {
  top: 79%;
  height: 3px;
}

.mobile-menue.close .line01 {
  transform: rotate(45deg);
  top: 49%;
}

.mobile-menue.close .line02,
.mobile-menue.close .line03 {
  transform: rotate(-45deg);
  top: 49%;
}

@media (min-width: 890px) {
  .nav {
    display: flex;
    order: 1;
  }
  .mobile-menue {
    display: none;
  }
  .user-icon-container {
    display: flex;
  }
}
</style>
