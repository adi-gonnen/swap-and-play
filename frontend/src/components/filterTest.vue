<template>
  <div class="filter-gallery-container">
      <form @submit.prevent="setFilter" class="search-in-gallery">
          <el-input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games" autofocus></el-input>
          <el-button class="btn search-btn" type="primary">Search</el-button>
      </form>
      <label >
        <el-checkbox class="checkbox-filter" type="checkbox" name="feature" value="all" v-model="filterBy.allByName" @change="setFilter">All</el-checkbox>
      </label>
      <div>
        <h3>Type</h3>
        <label >
          <el-checkbox class="checkbox-filter" type="checkbox" name="feature" value="all-types" v-model="filterBy.allTypes" @change="setFilter">All types</el-checkbox>
        </label>
        <ul v-if="allFilterTypes">
          <li v-for="oneType in allFilterTypes" :key="oneType._id"> 
            <label >
              <el-checkbox class="checkbox-filter" type="checkbox" name="feature" :value="oneType" v-model="filterBy.type" @change="setFilter">{{oneType}}</el-checkbox>
            </label>  
          </li>
        </ul>
        <h3>Category</h3>
        <label >
          <el-checkbox class="checkbox-filter" type="checkbox" name="feature" value="all-categories" v-model="filterBy.allCategories" @change="setFilter">All categories</el-checkbox>
        </label>
        <ul v-if="allFilterCategories">
          <li v-for="oneCategory in allFilterCategories" :key="oneCategory"> 
            <label >
              <el-checkbox class="checkbox-filter" type="checkbox" name="feature" :value="oneCategory" v-model="filterBy.type" @change="setFilter">{{oneCategory}}</el-checkbox>
            </label>  
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import GameService from "@/services/GameService.js";

export default {
  name: "home",
  components: {},
  data() {
    return {
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
    console.log("allFilterTypes in home", this.allFilterTypes);
    this.allFilterCategories = this.$store.getters.categories;
    console.log("allFilterCategories in home", this.allFilterCategories);
  },
  methods: {
    setFilter: debounce(function() {
      // console.log('setFilter in gameFilter cmp');
      // console.log('this.filterBy.allTypes', this.filterBy.allTypes);
      if (this.filterBy.allTypes)
        this.filterBy.type = this.$store.getters.types;
      // console.log("this.filterBy.type", this.filterBy.type);
      if (this.filterBy.allCategories)
        this.filterBy.category = this.$store.getters.categories;
      // console.log("this.filterBy.type", this.filterBy.category);
      this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy });
    }, 2000)
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.checkbox-filter {
  color: $secondary-color;
}
.filter-gallery-container {
  width: 250px;
}
.search-btn {
  background-color: $main-color;
}
</style>