<template>
  <skeleton v-if="isLoading"></skeleton>
  <div v-else>
    <div class="cover">
      <router-link :to="{ name: 'Watch', query: { id } }">
        <img :src="snippet.thumbnails.medium.url" :alt="snippet.channelTitle" />
      </router-link>

      <div class="duration">
        {{ convert_time(contentDetails.duration) }}
      </div>
    </div>
    <div id="details">
      <div class="info-left">
        <div class="title">
          {{
            snippet.localized.title.length > 36
              ? snippet.localized.title.slice(0, 36) + "..."
              : snippet.localized.title
          }}
        </div>
        <div class="description">
          {{ snippet.localized.description.slice(0, 100) }}
        </div>
      </div>
      <div class="like">
        <button class="favor" @click="favor(localStorageFavor[id], id)">
          {{ localStorageFavor[id] ? "remove" : "like" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import skeleton from "@/components/skeleton.vue";
import useLocalStorageFavor from "@/compostion/useLocalStorageFavor.vue";

export default {
  props: ["isLoading", "id", "contentDetails", "snippet"],
  components: {
    skeleton,
  },
  setup() {
    const { localStorageFavor } = useLocalStorageFavor();
    return { localStorageFavor };
  },
  methods: {
    convert_time(duration) {
      let duration_str = duration.slice(2);
      let str = ["H", "M", "S"];
      let res = [];

      str.forEach((char) => {
        if (duration_str.includes(char)) {
          res.push(duration_str.split(char)[0]);
          duration_str = duration_str.split(char)[1];
        } else {
          res.push("00");
          duration_str = duration_str.split(char)[0];
        }
      });

      if (res[0] == "00") {
        res.shift();
      }

      return res
        .map((x, i) => {
          if (i != 0) {
            return x.length < 2 ? "0" + x : x;
          } else {
            return x;
          }
        })
        .join(":");
    },
    async favor(isFavor, id) {
      var favorList;
      if (localStorage.getItem("favor")) {
        favorList = JSON.parse(localStorage.getItem("favor"));
      } else {
        favorList = {};
      }

      var favor;
      isFavor
        ? (favor = { ...favorList, [id]: 0 })
        : (favor = { ...favorList, [id]: 1 });

      localStorage.setItem("favor", JSON.stringify(favor));
      this.localStorageFavor = JSON.parse(localStorage.getItem("favor"));
      if (this.routerName === "Favorite") {
        await this.getFavorVideos();
      }
    },
  },
};
</script>
