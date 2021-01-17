<template>
  <div>
    <input
      v-model="q"
      placeholder="搜尋"
      @keyup.enter="search(q)"
      type="text"
      class="flex"
    />
    <button @click="search(q)">搜尋</button>
  </div>
</template>

<script>
export default {
  setup(props, { emit }) {
    let q = "";
    function search(q) {
      if (q) {
        emit("search", q);
      }
    }

    return {
      search,
      q,
    };
  },
};
</script>

<style scpoed>
.search {
  margin-bottom: 30px;
}

.flex {
  flex: 1 0 auto;
}

input {
  height: 24px;
}
button {
  border: 0px solid gray;
  height: 24px;
}
button:hover {
  cursor: pointer;
}
</style>
