<template>
  <searchBar @search="search"></searchBar>
  <section>
    <ul v-if="result">
      <li
        v-for="({ id, contentDetails, snippet }, index) in result.items.slice(
          (params.pageNum - 1) * perPage,
          (params.pageNum - 1) * perPage + perPage
        )"
        :key="index"
        :style="{ width: '320px' }"
      >
        <div class="cover">
          <router-link :to="{ name: 'Watch', query: { id } }">
            <img
              :src="snippet.thumbnails.medium.url"
              :alt="snippet.channelTitle"
            />
          </router-link>
          <button class="favor" @click="favor(localStorageFavor[id], id)">
            {{ localStorageFavor[id] ? "remove" : "like" }}
          </button>
          <div class="duration">
            {{ convert_time(contentDetails.duration) }}
          </div>
        </div>
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
      </li>
    </ul>
    <div v-if="result && result.items.length" class="pagination">
      <button v-if="params.pageNum > 1" @click="changePage('prev')">
        prev
      </button>
      <button
        v-for="(pageNum, index) in maxPage"
        :key="index"
        @click="changePage(pageNum)"
      >
        {{ pageNum }}
      </button>
      <button v-if="params.pageNum < maxPage" @click="changePage('next')">
        next
      </button>
    </div>
    <div v-else>
      找不到結果。
    </div>
  </section>
</template>

<script>
import youtube from "@/api.js";
import searchBar from "@/components/searchBar.vue";

export default {
  name: "Home",
  components: {
    searchBar,
  },
  data() {
    return {
      result: null,
      windowWidth: null,
      pageToken: null,
      params: {
        part: "snippet,contentDetails",
        chart: "mostPopular",
        maxResults: 50,
        regionCode: "TW",
        pageNum: 1,
      },
      perPage: 12,
      localStorageFavor: JSON.parse(localStorage.getItem("favor")) || {},
    };
  },

  computed: {
    maxPage() {
      return Math.ceil(this.result.items.length / this.perPage);
    },
    routerName() {
      return this.$route.name;
    },
  },
  async created() {
    console.log(process.env.VUE_APP_YOUTUBE_SECRETKEY);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();

    if (this.routerName === "Home") {
      await this.getVideos();
      await this.getVideos();
    } else if (this.routerName === "Favorite") {
      await this.getFavorVideos();
    }
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
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
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
    changePage(pageNum) {
      window.scrollTo(0, 0);
      if (typeof pageNum == "number") {
        this.params.pageNum = pageNum;
      } else if (pageNum == "prev" && this.params.pageNum > 1) {
        this.params.pageNum--;
      } else if (pageNum == "next" && this.params.pageNum < this.maxPage) {
        this.params.pageNum++;
      }
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
    search() {
      return youtube.searchVideos({
        part: "snippet, contentDetails",
      });
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li {
  display: flex;
  flex-direction: column;
  margin: 0px 8px 40px;
}

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
button.favor {
  height: 25px;
  border: 0px;
  background-color: #222;
  color: #fff;
  position: absolute;
  top: 0.2rem;
  right: 0.1rem;
}
.title {
  text-align: left;
}
.description {
  font-size: 0.5rem;
  text-align: left;
  color: #999;
}
.pagination button {
  margin: 0px 2px;
}
</style>
