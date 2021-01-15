<template>
  <h1>Mytube</h1>
  <searchBar @search="search"></searchBar>
  <div class="tv-container">
    <router-view
      class="main"
      :isLoading="isLoading"
      @changeLoadingState="changeLoadingState"
    />
    <!-- <div class="controls">
      <button>+</button>
      <button>-</button>
      <button>play</button>
      <router-link to="/"> <button>首頁</button> </router-link>
      <router-link to="/favorite"><button>收藏列表</button></router-link>
    </div> -->
  </div>
</template>

<script>
import searchBar from "@/components/searchBar.vue";
import youtube from "@/api.js";

export default {
  components: {
    searchBar,
  },
  data() {
    return {
      isLoading: true,
    };
  },
  methods: {
    changeLoadingState(val) {
      this.isLoading = val;
    },
    search() {
      return youtube.searchVideos({
        part: "snippet, contentDetails",
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  text-decoration: none;
  color: #000;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style-type: none;
}
</style>

<style>
.tv-container {
  /* border: 1px solid #000; */
  padding: 20px;
  display: flex;
  flex-direction: row;
}
</style>
