<template>
  <div class='calendar' :style="{ backgroundColor: this.$store.state.palette.main }">
    <button @click='onClick'>PALETTE</button>
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
  methods: {
    onClick() {
      this.$store.commit('togglePalette');
    },
  },
};
</script>

<style scoped>
.calendar {
}
button {
}
</style>