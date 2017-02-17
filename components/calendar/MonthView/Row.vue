<template>
  <div class="container">    
    <div class='row'>
      <component
        v-for="day in days" 
        :is="day ? 'day' : 'blank-day'" 
        :text="day ? day : ''" >
      </component>
    </div>
    <event-creation-menu v-if='activeRow'></event-creation-menu>
  </div>
</template>
    
<script>
import Day from '../CalendarDays/Day';
import BlankDay from '../CalendarDays/BlankDay';
import EventCreationMenu from '../EventMenu/EventCreationMenu';

export default {
  name: 'row',
  props: ['days'],
  computed: {
    activeRow() {
      if (!this.$store.state.activeDate) {
        return false;
      };
      let active = this.$store.state.activeDate.split('/')[2];
      // Return different values depending on day, so other elements
      // Inside row able to detect whether active day changed
      if (this.days.indexOf(active - 0) != -1) {
        return active;
      };
      return false;
    },
  },
  components: {
    day: Day,
    'blank-day': BlankDay,
    'event-creation-menu': EventCreationMenu,
  },
};
</script>

<style scoped>
.row {
  width: 100%;
  display: subgrid;
  grid-row-align: center;
}
.container {
  display: subgrid;
}
</style>