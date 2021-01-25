<template>
  <div class="search-page">
    <div
      v-for="({ id, snippet }, index) in result.items"
      :key="index"
      class="search-item"
    >
      <router-link :to="{ name: 'Watch', query: { id: id.videoId } }">
        <div class="left">
          <img
            :src="snippet.thumbnails.default.url"
            :alt="snippet.description"
          />
        </div>
        <div class="right">
          <div class="title">{{ snippet.title }}</div>
          <div class="description">{{ snippet.description }}</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import youtube from "@/api.js";

export default {
  props: ["isLoading"],
  setup() {
    let params = {
      part: "snippet",
      maxResults: 10,
    };
    let result = {
      items: [],
    };

    function search(q) {
      return youtube.searchVideos({ ...params, q });
    }

    return {
      search,
      params,
      result,
    };
  },
  watch: {
    $route: function() {
      this.init();
    },
  },
  async mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.changeLoadingState(true);

      try {
        const res = await this.search(this.$route.query.q);
        this.result = res.data;
      } catch (error) {
        alert(error);
      }

      this.changeLoadingState(false);
    },
    changeLoadingState(val) {
      this.$emit("changeLoadingState", val);
    },
  },
};
</script>

<style scpoed>
.search-page {
  width: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
}
.search-item a {
  width: 100%;
  display: flex;
}
.title {
  text-align: left;
  /* padding-right: 1.5rem; */
}
.description {
  font-size: 0.5rem;
  text-align: left;
  color: #999;
  overflow: hidden;
}
</style>
