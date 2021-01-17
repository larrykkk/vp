<template>
  <!-- <skeleton v-if="isLoading"></skeleton> -->
  <div>
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
              : snippet.localized.title.trim()
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
// import skeleton from "@/components/skeleton.vue";
import useLocalStorageFavor from "@/compostion/useLocalStorageFavor.vue";

export default {
  props: ["isLoading", "id", "contentDetails", "snippet"],
  components: {
    // skeleton,
  },
  setup() {
    const { localStorageFavor, updateLocalFavor } = useLocalStorageFavor();
    return { localStorageFavor, updateLocalFavor };
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
      console.log(123);
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
      // this.localStorageFavor = ;
      // this.(JSON.parse(localStorage.getItem("favor")));
      this.updateLocalFavor();
      console.log(this.localStorageFavor);
      if (this.$route.name === "Favorite") {
        // await this.getFavorVideos();
        // console.log(123123);
        this.$emit("changeFavor");
      }
    },
  },
};
</script>

<style scoped>
.cover {
  display: inline-block;
  position: relative;
}
.duration {
  padding: 2px 4px;
  background-color: #000;
  color: #fff;
  position: absolute;
  bottom: 0.5rem;
  right: 0.2rem;
  font-weight: 500;
}
#details {
  display: flex;
}
.info-left {
  display: inline-block;
  width: 90%;
}
.like {
  display: inline-block;
}
button.favor {
  padding: 4px;
  border: 2px solid #000;
  border-radius: 5px;
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
.pagination button {
  margin: 0px 2px;
}
</style>
