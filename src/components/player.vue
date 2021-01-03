<template>
  <div class="container">
    <video ref="videoPlayer" class="video-js"></video>
    <div class="ad" :style="{ 'z-index': adVisable ? '999' : '-999' }">
      <img
        v-if="adVisable"
        src="https://i.ytimg.com/vi/HuhkUIYRryA/maxresdefault.jpg"
        alt="廣告"
      />
      <button v-if="adVisable" @click="adVisable = false">X</button>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
      adVisable: true,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
    this.player.on("pause", () => {
      console.log(this.adVisable);
      this.adVisable = true;
    });
    this.player.on("play", () => {
      this.adVisable = false;
    });
  },
  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style scoped>
.video-js {
  width: 100%;
  height: 560px;
}
.container {
  position: relative;
}
.ad {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 225px;
}
img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
}
button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
