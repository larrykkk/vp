<template>
  <section>
    <div class="searchbar-inner">
      <input
        v-model="q"
        placeholder="搜尋"
        @keyup.enter="search(q)"
        type="text"
      />
      <button @click="search(q)">搜尋</button>
    </div>
  </section>
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

.searchbar-inner {
  flex: 0 1 728px;
}

input {
  width: 600px;
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
