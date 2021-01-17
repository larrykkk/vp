<script>
import { ref } from "vue";

export default function useLocalStorageFavor() {
  const localStorageFavor = ref(
    JSON.parse(localStorage.getItem("favor")) || {}
  );

  function updateLocalFavor() {
    localStorageFavor.value = JSON.parse(localStorage.getItem("favor")) || {};
    // console.log(val)
    // localStorageFavor.value = val;
    // console.log(localStorageFavor.value)
  }

  return {
    localStorageFavor,
    updateLocalFavor,
  };
}
</script>
