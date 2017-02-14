<template>
  <div class='row'>
    <component
      v-for="day in days" 
      :is="day ? 'day' : 'blank-day'" 
      :text="day ? day : ''" >
    </component>
    <event-menu v-if='activeRow'></event-menu>
  </div>
</template>
    
<script>
import Day from './Day';
import BlankDay from './BlankDay';
import EventMenu from './EventMenu';

export default {
  name: 'row',
  props: ['days'],
  computed: {
    activeRow() {
      if (!this.$store.state.activeDate) {
        return false;
      };
      let active = this.$store.state.activeDate.split('/')[2];
      return this.days.indexOf(active - 0) != -1;
    },
  },
  components: {
    day: Day,
    'blank-day': BlankDay,
    'event-menu': EventMenu,
  },
};
</script>

<style>
</style>