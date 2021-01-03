<template>
  <section class="search">
    <h1>mytube</h1>
    <input
      v-model="q"
      placeholder="搜尋"
      @keyup.enter="$emit('search', q)"
      type="text"
    />
    <input type="button" value="搜尋" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      q: "",
    };
  },
};
</script>
