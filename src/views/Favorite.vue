<template>
  <list
    :isLoading="isLoading"
    :items="result.items"
    :params="params"
    :localStorageFavor="localStorageFavor"
    @changeFavor="updateFavorData($event)"
  ></list>
</template>

<script>
import list from "@/components/list.vue";
import useLocalStorageFavor from "@/compostion/useLocalStorageFavor.vue";
import { ref, onMounted } from "vue";

export default {
  name: "Favorite",
  props: ["isLoading"],
  components: {
    list,
  },
  setup(props, { emit }) {
    const {
      localStorageFavor,
      updateLocalFavor,
      getFavorVideos,
      changeFavor,
    } = useLocalStorageFavor();

    let result = ref({
      items: [],
    });

    let params = ref({
      part: "snippet,contentDetails",
      chart: "mostPopular",
      maxResults: 50,
      regionCode: "TW",
      pageNum: 1,
    });

    function changeLoadingState(val) {
      emit("changeLoadingState", val);
    }

    async function updateFavorData($event) {
      const items = await changeFavor($event);
      result.value.items = items;
    }

    onMounted(async () => {
      changeLoadingState(true);
      const res = await getFavorVideos();
      result.value.items = res.data.items;
      changeLoadingState(false);
    });

    return {
      result,
      params,
      localStorageFavor,
      updateLocalFavor,
      changeFavor,
      updateFavorData,
    };
  },
};
</script>
