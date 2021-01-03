<template>
  <!-- <router-link to="/">首頁</router-link> | -->
  <!-- <router-link to="/favorite">收藏</router-link> -->
  <a href="/">首頁</a> |
  <a href="/favorite">收藏</a>
  <router-view :isLoading="isLoading" />
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
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

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
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
