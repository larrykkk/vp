<script>
import { ref } from "vue";
import youtube from "@/api.js";

export default function useLocalStorageFavor() {
  let localStorageFavor;

  if (localStorage.getItem("favor")) {
    localStorageFavor = ref(JSON.parse(localStorage.getItem("favor") || {}));
  } else {
    localStorageFavor = ref({});
  }

  function updateLocalFavor(val) {
    if (val) {
      localStorage.setItem("favor", JSON.stringify(val));
      localStorageFavor.value = val;
    }
  }

  async function getFavorVideos() {
    let id = Object.entries(localStorageFavor.value)
      .filter((x) => x[1])
      .map((x) => x[0])
      .join();

    const res = await youtube.getVideoById({
      id,
      part: "snippet,contentDetails",
    });
    return res;
  }

  async function changeFavor(val) {
    updateLocalFavor(val);
    const res = await getFavorVideos();
    return res.data.items;
  }

  return {
    localStorageFavor,
    updateLocalFavor,
    getFavorVideos,
    changeFavor,
  };
}
</script>
