<template>
  <div class='container'>
    <div class='event-caption'> {{text}} </div>

  </div>
</template>
    
<script>
export default {
  name: 'event-caption',
  date() {
    return {

    };
  },
  computed: {
    text() {
      return this.$store.state.activities[this.$store.state.activeDate].text;
    },
  },
};
</script>

<style>
.container {
  display: inline-block;
}
</style>