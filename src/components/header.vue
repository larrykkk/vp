<template>
  <div class="header">
    <router-link to="/" class="logo"
      ><span class="title">Mytube</span></router-link
    >
    <searchBar @search="search" class="searchbar"></searchBar>
    <toolbar class="toolbar"></toolbar>
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
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
}

.searchbar {
  flex: 1;
}

.logo .title {
  font-size: 1.5rem;
  font-weight: 600;
}

@media only screen and (min-width: 600px) {
  .logo .title {
    font-size: 2rem;
  }
}

/* .logo, */
/* .searchbar,
.toolbar {
  flex: 1 0 auto;
}
.header {
  
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
}
h1.title {
  margin: 0;
  font-size: 1rem;
}
@media only screen and (min-width: 600px) {
  h1.title {
    font-size: 2rem;
  }
}
.searchbar {
  flex: 1;
  display: none;
}
@media only screen and (min-width: 600px) {
  .searchbar {
    display: block;
  }
} */
</style>
