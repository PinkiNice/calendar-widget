<template>
    <input 
      spellcheck="false" 
      :style="{
        color: this.$store.state.palette.main,
        backgroundColor: 'transparent' 
        }" 
      type="text" 
      v-model="text"
    >
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
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  width: 70%;
  align-self: center;

  margin-left: 1em;
  margin-right: 1em;

  padding: 0;
  
  text-align: center;
 
  font-family: sans-serif;
  font-size: 2.5em;

  appearance: none;

  outline-width: 0;
  box-shadow: none;
  border-radius: none;
  border: none;
}
</style>