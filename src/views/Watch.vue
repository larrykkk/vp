<template>
  <div>
    <VideoPlayer :options="videoOptions" class="player"></VideoPlayer>
    <div v-if="info">
      <div class="title">{{ info.snippet.localized.title }}</div>
      <div
        class="description"
        v-html="info.snippet.localized.description"
      ></div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "@/components/player.vue";
import youtube from "@/api.js";

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      info: null,
      videoOptions: {
        autoplay: false,
        controls: true,
        sources: [
          {
            src:
              "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
            type: "application/x-mpegURL",
          },
        ],
      },
    };
  },
  async created() {
    const res = await youtube.getVideoById({
      part: "snippet,contentDetails",
      id: this.$route.query.id,
    });
    this.info = res.data.items[0];
  },
};
</script>

<style scoped>
.title {
  text-align: left;
  font-size: 24px;
}
.description {
  font-size: 14px;
  text-align: left;
  color: #555;
}
</style>
