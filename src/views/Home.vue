<template>
  <list
    :isLoading="isLoading"
    :items="result.items"
    :params="params"
    :localStorageFavor="localStorageFavor"
    @changeFavor="updateLocalFavor($event)"
  ></list>
</template>

<script>
import list from "@/components/list.vue";
import youtube from "@/api.js";
import useVideoData from "@/compostion/useVideoData.vue";
import useLocalStorageFavor from "@/compostion/useLocalStorageFavor.vue";

export default {
  props: ["isLoading"],
  components: {
    list,
  },
  setup() {
    const { videoData } = useVideoData();
    const { localStorageFavor, updateLocalFavor } = useLocalStorageFavor();

    return {
      result: videoData,
      localStorageFavor,
      updateLocalFavor,
    };
  },
  data() {
    return {
      params: {
        part: "snippet,contentDetails",
        chart: "mostPopular",
        maxResults: 12,
        regionCode: "TW",
        pageNum: 1,
      },
    };
  },
  async created() {
    this.changeLoadingState(true);
    try {
      await this.getVideos();
    } catch (error) {
      console.log(error);
      this.$router.push({ name: "Error" });
    }
    this.changeLoadingState(false);
  },
  methods: {
    async getVideos() {
      const res = await youtube.getPopularVideos(this.params);
      if (!this.result) {
        this.result = res.data;
      } else {
        this.result.items = [...this.result.items, ...res.data.items];
      }

      this.params.pageToken = res.data.nextPageToken;
    },
    changeLoadingState(val) {
      this.$emit("changeLoadingState", val);
    },
  },
};
</script>
