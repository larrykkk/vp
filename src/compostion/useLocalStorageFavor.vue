<script>
import { ref } from "vue";

export default function useLocalStorageFavor() {
  const localStorageFavor = ref(
    JSON.parse(localStorage.getItem("favor")) || {}
  );

  return {
    localStorageFavor,
  };
}
</script>
