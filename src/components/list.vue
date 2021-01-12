<template>
  <ul>
    <li
      v-for="({ id, contentDetails, snippet }, index) in getVariable(isLoading)"
      :key="index"
      :style="{ width: '320px' }"
    >
      <listItem
        :isLoading="isLoading"
        :id="id"
        :contentDetails="contentDetails"
        :snippet="snippet"
      ></listItem>
    </li>
  </ul>
</template>

<script>
import listItem from "@/components/listItem.vue";

export default {
  name: "List",
  components: {
    listItem,
  },
  props: ["isLoading", "items", "params"],
  data() {
    return {
      windowWidth: null,
      perPage: 12,
    };
  },

  computed: {
    maxPage() {
      return Math.ceil(this.items.length / this.perPage);
    },
    routerName() {
      return this.$route.name;
    },
  },
  async created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
    getVariable(isLoading) {
      return isLoading
        ? this.perPage
        : this.items.slice(
            (this.params.pageNum - 1) * this.perPage,
            (this.params.pageNum - 1) * this.perPage + this.perPage
          );
    },
  },
};
</script>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
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
#details {
  display: flex;
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
  padding-right: 1.5rem;
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
