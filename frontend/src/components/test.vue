  <template>
    <div class="filter-gallery-container">
        <form @submit.prevent="setFilter" class="search-in-gallery">
            <el-input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games" autofocus></el-input>
            <el-button class="btn search-btn" type="primary">Search</el-button>
        </form>
        <el-checkbox class="checkbox-filter" label="All" value="all" v-model="filterBy.allByName" @change="setFilter">All</el-checkbox>
        <div>
          <h3>Type</h3>
              <el-checkbox class="checkbox-filter" label="All types" value="all-types" v-model="filterBy.allTypes" @change="setFilter"></el-checkbox>
              <ul v-if="allFilterTypes">
                <li v-for="oneType in allFilterTypes" :key="oneType._id"> 
                    <el-checkbox class="checkbox-filter" :label='oneType' :value="oneType" v-model="filterBy.type" @change="setFilter"></el-checkbox>
                </li>
              </ul>
          <h3>Category</h3>
          <el-checkbox class="checkbox-filter" label="All categories" value="all-categories" v-model="filterBy.allCategories" @change="setFilter"></el-checkbox>
          <ul v-if="allFilterCategories">
            <li v-for="oneCategory in allFilterCategories" :key="oneCategory"> 
                <el-checkbox class="checkbox-filter" :label='oneCategory' :value="oneCategory" v-model="filterBy.type" @change="setFilter">{{oneCategory}}</el-checkbox>
            </li>
          </ul>
        </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import GameService from "@/services/GameService.js";

export default {
  name: 'home',
  components: {},
  data() {
    return {
      filterBy: {
        allByName: true,
        name: '',
        allTypes: true,
        type: [],
        allCategories: true,
        category: [],
        userId: '',
      },
      allFilterTypes: null,
      allFilterCategories: null,
    };
  },
  created() {
    this.allFilterTypes = this.$store.getters.types;
    // console.log("allFilterTypes in home", this.allFilterTypes);
    this.allFilterCategories = this.$store.getters.categories;
    // console.log('allFilterCategories in home', this.allFilterCategories);
  },
  methods: {
    setFilter: debounce(function() {
      if (this.filterBy.allTypes) this.filterBy.type = this.$store.getters.types;
      // console.log("this.filterBy.type", this.filterBy.type);
      if (this.filterBy.allCategories) this.filterBy.category = this.$store.getters.categories;
      // console.log("this.filterBy.type", this.filterBy.category);
      this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy });
    }, 2000)
  }
};
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

  .filter-gallery-container {
    width: 250px;
  }

  .checkbox-filter {
    color: $secondary-color;
    text-transform: capitalize;
  }
  .search-btn {
    background-color: $main-color;
  }
  .search-in-gallery .search-input {
    width: 350px;
    margin-bottom: rem(20px);
  }

  .search-in-gallery {
    position: absolute;
    top: 20%;
    margin: rem(20px);
  }
</style>



