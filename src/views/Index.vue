<template>
  <h1>Mytube</h1>
  <searchBar @search="search"></searchBar>
  <div class="tv-container">
    <router-view
      class="main"
      :isLoading="isLoading"
      @changeLoadingState="changeLoadingState"
    />
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
    async search(q) {
      await youtube.searchVideos({
        q,
        part: "snippet",
        maxResults: 10,
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
