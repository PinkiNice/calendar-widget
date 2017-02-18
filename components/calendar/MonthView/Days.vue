<template>
  <div class="grid-container">

    <div class="calendar-week week-day" v-for='day in arr'>
      <div :style="style" class="content">
        {{ day }}
      </div>
    </div>

    <component
        class="calendar-cell"
        v-for="day in days" 
        :is="day ? 'day' : 'blank-day'" 
        :text="day ? day : ''" >
    </component>

    <transition name="expand"
      v-on:after-leave="afterLeave"
      :enter="enter"
    >
      <event-creation-menu v-if="inputActive"></event-creation-menu>
    </transition>

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
      inputActive: false,
    };
  },
  methods: {
    afterLeave() {
      console.log('mem');
      if (this.activeDay) {
        this.inputActive = true;
      }
    },
    enter() {
      this.inputActive = true;
    },
  },
  watch: {
    activeDay(newVal, oldVal) {
      let state = this.$store.state;

      if (oldVal == false) {
        this.inputActive = true;
      } else if (newVal === false) {
        this.inputActive = false;
      } else {
        // If new chosen day is in the same row - no need to run animation
        let blankDays = this.$store.state.blankDays;
        let oldRow = 2 + Math.ceil((blankDays - -oldVal) / 7)
        let newRow = 2 + Math.ceil((blankDays - -newVal) / 7)

        if (oldRow === newRow) {
          this.inputActive = true;
        } else {
          this.inputActive = false;
        }
      }
    },
  },
  computed: {
    style() {
      return {
        color: this.palette.text,
      };
    },
    palette() {
      return this.$store.state.palette;
    },
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
    activeDay() {

      if (!this.$store.state.activeDate) return false;
      return this.$store.state.activeDate.split('/')[2];
    },
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

.content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.menu {
  height: 4em;
}
.grid-container {
  display: grid;

  /*padding-top: 1em;
  padding-bottom: 3em;
  padding-left: 2em;
  padding-right: 2em;*/
  padding-top: 1em;
  padding-bottom: 2em;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 0.5em;
  justify-content: center;
  justify-items: center;
}
/*.calendar-cell:nth-child(-n+7) {
  padding-top: 2em;
}
.calendar-cell:nth-child(7n) {
  padding-right: 2em;
}
.calendar-cell:nth-child(7n+1) {
  padding-left: 2em;
}
.calendar-cell:last-child {
  padding-bottom: 2em;
  padding-right: 2em;
}*/
/*.calendar-cell:nth-last-child(7) {
  margin-bottom: 2em;
}*/

.week-day {
  color: #FFFFFF;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1.5em;

  width: 1.75em;
  height: 1.75em;

  text-align: center;
}
.expand-enter {
  height: 0em;
}

.expand-enter-active, .expand-leave-active {
  transition: height 0.2s linear;
} 

.expand-enter-to {
  height: 4em;
}

.expand-leave {
  height: 4em;
}

.expand-leave-to {
  height: 0em;
}
</style>