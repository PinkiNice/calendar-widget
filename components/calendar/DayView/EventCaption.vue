<template>
  <div class='container'>
    <input type="text" v-model="text">
  </div>
</template>
    
<script>
export default {
  name: 'event-caption',
  data() {
    return {
      text: this.$store.state.activities[this.$store.state.activeDate].text,
    };
  },
  watch: {
    text() {
      this.$store.commit('eventCaptionChange', this.text);
    },
  },
};
</script>

<style scoped>
.container {
  display: inline-block;
}
input[type="text"] {
  outline-width: 0;
  text-align: center;
  display: block;
  margin: 10px;
  width: 100%;
  font-family: sans-serif;
  font-size: 20px;
  appearance: none;
  box-shadow: none;
  border-radius: none;
  border: none;
}
</style>