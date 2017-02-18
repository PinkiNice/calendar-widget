<template>
  <div class="container">
    <div class='week-day' v-for='day in arr'>{{ day }}</div>
    <component
        v-for="day in days" 
        :is="day ? 'day' : 'blank-day'" 
        :text="day ? day : ''" >
    </component>
    <event-creation-menu v-if="someDayIsActive"></event-creation-menu>
  </div>
</template>

<script>
//     <row v-for="row in rows" v-bind:days="row"></row>
// import Row from './Row';
import Day from '../CalendarDays/Day';
import BlankDay from '../CalendarDays/BlankDay';
import EventCreationMenu from '../EventMenu/EventCreationMenu';
import lodash from 'lodash';

export default {
  name: 'days',
  data() {
    return {
      arr: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    };
  },
  computed: {
    days() {
      let arr = [],
          [year, month] = this.$store.state.currentMonth.split('/'),
          lastDay = new Date(year, month - -1, 0).getDate(),
          firstDay = new Date(year, month).getDay();

      let i = 0;
      // Fill first n days to match day of the week to calendar.
      for (; i < firstDay; ++i) {
        arr.push(null);

      };
      this.$store.commit('setBlankDays', i);
      // Fill array with days
      for (let i = 1; i <= lastDay; ++i) {
          arr.push(i);

      };

      // Fill the end of array so it have divisible by 7 amount of days
      if ((arr.length) % 7 != 0) {
        let blocksToFill = 7 - arr.length % 7; 
        for (let i = 0; i < blocksToFill; ++i) {
          arr.push(null);
        }

      };

      // Split all days by arrays of 7 day in each
      //let result = lodash.chunk(arr, 7);

      return arr;
    },
    someDayIsActive() {
      return !!this.$store.state.activeDate;
    },
    toggle() {
      return this.$store.state.toggle;
    }
  },
  components: {
    // row: Row,
    day: Day,
    'event-creation-menu': EventCreationMenu,
    'blank-day': BlankDay,
  },
};
</script>

<style scoped>
.container {
  display: grid;

  padding-top: 3em;
  padding-bottom: 3em;
  padding-left: 2em;
  padding-right: 2em;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.5em;
}
.week-day {
  color: #FFFFFF;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 25px;
  width: 1.75em;
  height: 1.75em;
  text-align: center;
}

.expand-enter {
  height: 0em;
}

.expand-enter-active, .expand-leave-active {
  transition: height 20s;
} 

.expand-enter-to {
  height: 6em;
}

.expand-leave {
  height: 6em;
}

.expand-leave-to {
  height: 0em;
}
</style>