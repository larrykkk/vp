import axios from "axios";
axios.defaults.baseURL = "https://youtube.googleapis.com/youtube/v3";

export default {
  async getPopularVideos(params) {
    if (!params.key) {
      params = { key: process.env.VUE_APP_YOUTUBE_SECRETKEY, ...params };
    }
    return await axios.get(`/videos`, { params });
  },
  async searchVideos(params) {
    if (!params.key) {
      params = { key: process.env.VUE_APP_YOUTUBE_SECRETKEY, ...params };
    }
    return await axios.get(`/search`, { params });
  },
  async getVideoById(params) {
    if (!params.key) {
      params = { key: process.env.VUE_APP_YOUTUBE_SECRETKEY, ...params };
    }
    return await axios.get(`/videos`, { params });
  },
};
