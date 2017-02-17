<template>
  <div class="background">
    <div class='widget'>
      <month-view v-if='mode === "month-view"'></month-view>
      <day-view v-if='mode === "day-view"'></day-view>
    </div>
  </div>
</template>
    
<script>
import DayView from '../components/calendar/DayView/DayView';
import MonthView from '../components/calendar/MonthView/MonthView';

export default {
  name: 'widget',
  components: {
    'month-view': MonthView,
    'day-view': DayView,
  },
  computed: {
    mode() {
      return this.$store.state.mode;
    }, // month-view - calendar, day-view - event-menu
  },
};
</script>

<style scoped>
.background {
  display: inline-block;
  width: 100%;
  padding-bottom: 50px;
  background-color: #FCEE6D;
}

.widget {
  background-color: #2C3440;
  width: 460px;
  margin: 0 auto; 
  height: auto;
}

.month-caption {
  width: 100%;
  margin: 0 auto;
}
</style>