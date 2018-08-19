<template>
    <div class="filter-gallery-container flex flex-start ">
        <button class="btn-filter" @click="isFilterOpen=!isFilterOpen">
            <font-awesome-icon icon="filter" class="fiter-icon" />
        </button>
        <form @submit.prevent="setFilter" class="search-in-gallery flex">
            <input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games" autofocus/>
            <button class="btn search-btn" type="primary" @click="setFilter">
                <font-awesome-icon icon="search"></font-awesome-icon>
            </button>
            <button class="btn search-btn-text" type="primary" @click="setFilter">Search</button>
        </form>
    <transition name="slowDisplay">
        <div class="checkbox-filter-container capitalize" :class="{open: isFilterOpen}">
            <div class="exit">
                <font-awesome-icon icon="times" class="exit-icon" :class="{close: isFilterOpen}" @click="isFilterOpen=!isFilterOpen" />
            </div>
            <el-checkbox v-show='false' class="checkbox-filter" label="All" value="all" v-model="filterBy.allByName" @change="setFilter"></el-checkbox>
            <div class="filter-menu">
                <h3 class="filter-header">Type</h3>
                <el-checkbox class="checkbox-filter" label="All types" :value="filterBy.allTypes" @change="toggleAllTypes"></el-checkbox>
                <el-checkbox-group v-model="filterBy.type" v-if="allFilterTypes" @change="setFilter">
                    <ul class="checkbox flex column">
                        <li class="checkbox" v-for="oneType in allFilterTypes" :key="oneType">
                            <el-checkbox class="checkbox-filter" :label="oneType"></el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
                <h3 class="filter-header category">Category</h3>
                <el-checkbox class="checkbox-filter" label="All categories" :value="filterBy.allCategories" @change="toggleAllCategories"></el-checkbox>
                <el-checkbox-group class="checkbox-filter" v-model="filterBy.category" v-if="allFilterCategories" @change="setFilter">
                    <ul class="checkbox flex column">
                        <li v-for="oneCategory in allFilterCategories" :key="oneCategory">
                            <el-checkbox class="checkbox-filter" :label="oneCategory"></el-checkbox>
                        </li>
                    </ul>
                </el-checkbox-group>
            </div>
        </div>
    </transition>
    </div>
</template>

<script>
import debounce from "lodash.debounce";
import GameService from "@/services/GameService.js";
import { eventBus, EVENT_SET_FILTER } from "@/services/EventBusService.js";

export default {
  components: {},
  data() {
    return {
      isFilterOpen: false,
      filterBy: {
        allByName: true,
        name: "",
        allTypes: true,
        type: [],
        allCategories: true,
        category: [],
        userId: ""
      },
      allFilterTypes: null,
      allFilterCategories: null
    };
  },
  created() {
    this.allFilterTypes = this.$store.getters.types;
    // console.log("allFilterTypes in home", this.allFilterTypes);
    this.allFilterCategories = this.$store.getters.categories;
    // console.log("allFilterCategories in home", this.allFilterCategories);
    this.filterBy = JSON.parse(
      JSON.stringify(this.$store.state.GameModule.filterBy)
    );

    this.$store.dispatch({
      type: "setFilter",
      filterBy: this.$store.state.GameModule.filterBy
    });
  },
  methods: {
    setFilter: debounce(function() {
      var filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$store.dispatch({ type: "setFilter", filterBy }).then(games => {});
    }, 500),
    toggleAllTypes() {
      this.filterBy.allTypes = !this.filterBy.allTypes;
      if (this.filterBy.allTypes) this.filterBy.type = [];
      this.setFilter();
    },
    toggleAllCategories() {
      this.filterBy.allCategories = !this.filterBy.allCategories;
      if (this.filterBy.allCategories) this.filterBy.category = [];
      this.setFilter();
    }
  },
  watch: {
    ["filterBy.type"]() {
      if (this.filterBy.type.length > 0) this.filterBy.allTypes = false;
    },
    ["filterBy.category"]() {
      if (this.filterBy.category.length > 0)
        this.filterBy.allCategories = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

body {
  overflow: hidden;
}
.checkbox-filter-container {
  text-align: left;
  padding-left: 20px;
  transition: 0.5s;
  overflow-y: scroll;
  height: 400px;
  width: 200px;
  position: fixed;
  z-index: 7;
  top: 92px;
  // left: 30%;
  background-color: $card-text-color;
  padding-top: 15px;
}

.filter-header {
  color: #adaaaa;

}

.filter-header.category {
  margin-top: 20px;
}

.btn-filter {
  border: none;
  background-color: transparent;
  height: 38px;
  padding-right: 20px;
  color: $main-color;
}

.checkbox-filter {
  color: $secondary-color;
  padding: 5px;
}

.search-btn {
  background-color: $main-color;
  position: relative;
}

.search {
  position: absolute;
  left: 5px;
}

.search-in-gallery {
  position: relative;
  left: -28px;
}

.search-input {
  width: 200px;
  // width: 500px;
  // height: 30px;
  height: 40px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid $border-color;
  padding: rem(10px);
  font-size: rem(18px);
  position: relative;
  top: 1px;
}

.search-btn-text, .search-btn {
  display: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  display: inline-block;
  line-height: 1px;
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

.search-in-gallery .search-input {
  width: 350px;
  margin-bottom: rem(50px);
}

h3 {
  text-align: left;
  margin-bottom: 10px;
  margin-top: 30px;
}

.filter-icon {
  display: block;
  width: 25px;
  height: 45px;
}

.filter {
  width: 25px;
  height: 38px;
  text-align: left;
  background-color: $main-color;
  color: white;
  margin-right: 20px;
}

.search-btn-text {
  display: none;
  height: 40px;
}

.search-btn {
  width: 25px;
  height: 38px;
  font-size: rem(14px);
  background-color: $main-color;
}
.search-in-gallery .search-input {
  width: 180px;

  margin-bottom: rem(25px);

}

.search-in-gallery {
  top: 20%;
  height: 70px;
  margin-bottom: 50px;
}
.filter-gallery-container {
  margin-top: 50px;
  // position: absolute;

  // padding: 0 5px;
}

.exit {
  cursor: pointer;
  float: right;
  padding-right: 10px;
}

@media (min-width: 420px) {
  .filter-gallery-container {
    // padding: 0 20px;
  }
}
@media (max-width: 980px) {
  .checkbox-filter-container {
    display: none;

    &.open {
      display: block;
    }
  }
}

@media (min-width: 980px) {
  .search-in-gallery .search-input {
    width: 350px;
  }
  .search-btn {
    display: none;
  }
  .search-btn-text {
    font-family: "Ubuntu-regular";
    display: block;
    height: 42px;
    float: right;
    font-size: 1.125rem;
    background-color: $main-color;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
  .btn-filter {
    display: none;
  }
  body {
    overflow: auto;
  }
  .checkbox-filter-container {
    text-align: left;
    padding-left: 20px;
    transition: 0;
    overflow-y: unset;
    max-height: 300px;
    position: unset;
    z-index: 7;
    top: 92px;
    left: 0;
    background-color: white;
    padding-top: 15px;
    width: 140px;
    position: absolute;
    margin-top: 69px;
    margin-left: 10px;

    h3 {
      margin-top: 5px;
    }
  }
  .exit {
    display: none;
  }
  .gallery-container {
    flex-direction: row;
  }

  .filter-gallery-container {
    height: 50px;
    flex-direction: column;
    .container {
      max-width: 1200px;
    }
  }
  @media (min-width: 1130px) {
    .checkbox-filter-container {
      // margin-left: 378px;
      margin-top: 126px;

    }
  }
}
</style>