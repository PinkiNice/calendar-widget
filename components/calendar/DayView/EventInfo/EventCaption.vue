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
  display: inline-block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;


  padding-left: 1em;
  padding-right: 1em;

  width: 80%;

  
  text-align: center;

  font-family: sans-serif;
  font-size: 2.5em;

  outline-width: 0;
  box-shadow: none;
  border-radius: none;
  border: none;
}
</style>