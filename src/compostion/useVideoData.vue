<script>
import { ref } from "vue";

export default function useVideoData() {
  let videoData = ref({
    items: [],
  });
  function setVideoData(val) {
    videoData.value = val;
    console.log(videoData);
  }

  return { videoData, setVideoData };
}
</script>
