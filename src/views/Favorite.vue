<template>
  <list :isLoading="isLoading" :items="result.items" :params="params"></list>
</template>

<script>
import list from "@/components/list.vue";
import youtube from "@/api.js";
import useLocalStorageFavor from "@/compostion/useLocalStorageFavor.vue";

export default {
  props: ["isLoading"],
  components: {
    list,
  },
  setup() {
    const { localStorageFavor } = useLocalStorageFavor();
    return { localStorageFavor };
  },
  data() {
    return {
      result: {
        items: [],
      },
      params: {
        part: "snippet,contentDetails",
        chart: "mostPopular",
        maxResults: 50,
        regionCode: "TW",
        pageNum: 1,
      },
    };
  },
  async created() {
    this.changeLoadingState(true);
    await this.getFavorVideos();
    this.changeLoadingState(false);
  },
  methods: {
    async getFavorVideos() {
      let id = Object.entries(this.localStorageFavor)
        .filter((x) => x[1])
        .map((x) => x[0])
        .join();
      const res = await youtube.getVideoById({
        id,
        part: "snippet,contentDetails",
      });
      this.result = res.data;
    },
    changeLoadingState(val) {
      this.$emit("changeLoadingState", val);
    },
  },
};
</script>
