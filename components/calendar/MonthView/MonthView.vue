<template>
  <div
    @keyup.left="$store.commit('monthBackward')"
    @keydown.left="$store.commit('monthBackward')" 
    @keydown.right="$store.commit('monthForward')"
    class='calendar'
  >

    <month class='month-caption'></month>
    <days></days>

  </div>
</template>
    
<script>
import Month from './Month';
import Days from './Days';

export default {
  name: 'month-view',
  components: {
    month: Month,
    days: Days,
  },
};
</script>

<style scoped>
</style>