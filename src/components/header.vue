<template>
  <div class="header">
    <router-link to="/"><h1>Mytube</h1></router-link>
    <searchBar @search="search" class="searchbar"></searchBar>
    <toolbar></toolbar>
  </div>
</template>

<script>
import searchBar from "@/components/searchBar.vue";
import toolbar from "@/components/toolbar.vue";

export default {
  components: {
    searchBar,
    toolbar,
  },
  methods: {
    async search(q) {
      this.$router.push({ name: "Search", query: { q } });
    },
  },
};
</script>

<style scpoed>
.header {
    /* background: red; */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
}
h1 {
  margin: 0px;
}
.searchbar {
  flex: 1;
}
</style>
