<template>
  <ul>
    <li
      v-for="({ id, contentDetails, snippet }, index) in items"
      :key="index"
      :style="{ width: '320px' }"
    >
      <listItem
        :isLoading="isLoading"
        :id="id"
        :contentDetails="contentDetails"
        :snippet="snippet"
        :localStorageFavor="localStorageFavor"
        @changeFavor="$emit('changeFavor', $event)"
      ></listItem>
    </li>
  </ul>
  <div v-if="isLoading == false && items.length == 0">找不到相關的資料。</div>
</template>

<script>
import listItem from "@/components/listItem.vue";

export default {
  name: "List",
  components: {
    listItem,
  },
  props: ["isLoading", "items", "params", "localStorageFavor"],
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
</style>
