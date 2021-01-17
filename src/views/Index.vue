<template>
  <Header @search="search"></Header>
  <div class="tv-container">
    <router-view
      :isLoading="isLoading"
      @changeLoadingState="changeLoadingState"
    />
  </div>
</template>

<script>
import Header from "@/components/header.vue";

export default {
  components: {
    Header,
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
  padding: 20px;
  display: flex;
  flex-direction: row;
}
</style>
