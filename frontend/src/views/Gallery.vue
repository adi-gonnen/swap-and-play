<template>
<section>
  <div class="gallery-container flex  column justify-center align-center ">
    <div class="filter-gallery">
        <Game-filter></Game-filter> 
    </div>
      <div v-if="gamesLoading">
        <div class="loader-circle"></div>
  </div>
    <div v-else class="images-container-gallery flex ">
        <game-list class="game-list container flex" :games="gamesForDisplay" @remove="removeGame"></game-list>
    </div>
  </div>
</section>
</template>

<script>
import GameList from "@/components/GameList.vue";
import GameFilter from "@/components/GameFilter.vue";
import Header from "@/components/Header.vue";
import swal from "sweetalert";

export default {
  name: "Gallery",
  components: {
    GameList,
    GameFilter,
    Header
  },
  data() {
    return {
      url: null,
    }
  },
  created() {
    this.$store.commit({type: 'setUrl', url: '/game'})
  },
  computed: {
    gamesForDisplay() {
      return this.$store.getters.gamesByFilterServer;
    },
    loggedinUser() {
      return this.$store.getters.loggedUser;
    },
    gamesLoading() {
      return this.$store.getters.gamesLoading;
    }
  },
  methods: {
    removeGame(gameId) {
      swal({
        title: "Are you sure you want to delete this game?",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
        className: "swal-warning"
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch({ type: "removeGame", gameId }).then(() => {
            swal("Your game has been deleted!", {
              icon: "success",
              timer: 2000,
              className: "swal-text",
              button: false
            });
          });
        } else swal.close();
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.swal-text {
  font-family: "Ubuntu";
  color: #0d72fa;
  font-size: 20px !important;
}
.swal-title {
  font-family: "Ubuntu";
  font-size: 20px;
}
.game-list {
  max-width: 850px;
  padding: 0 20px;
}

.container {
  max-width: 850px;
}



@media (min-width: 980px) {
  .filter-images-container-gallery {
    margin-top: rem(30px);
  }
}
</style>
    


