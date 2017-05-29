<template>
  <div class="grid-container">
  
    <div class="calendar-cell week-day" v-for='day in arr'>
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

    <transition 
      name="container-expand"
      v-on:after-enter="enter"
      v-on:after-leave="containerLeft"
    >
      <div 
        class="input-container" 
        v-show="containerActive"

        :style="{ 
          gridRowStart: this.gridRow,  
        }"
      >
        <transition name="expand" v-on:after-leave="afterInputLeft">
          <keep-alive>
            <event-creation-menu v-if="inputActive"></event-creation-menu>
          </keep-alive>
        </transition>
      </div>
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
      containerActive: false,
      gridRow: false,
    };
  },
  methods: {
    afterInputLeft () {
      console.log("Deactivating Container");
      this.containerActive = false;
    },
    containerLeft () {
      if (this.activeDay) {
        console.log("Reactivating container");
        this.gridRow = 2 + Math.ceil((this.$store.state.blankDays - -this.activeDay) / 7);
        this.containerActive = true;
      }
    },
    enter () {
      console.log("Activating Input");
      this.inputActive = true;
    },
  },
  watch: {
    activeDay(newVal, oldVal) {
      let state = this.$store.state;
      let blankDays = state.blankDays;

      if (oldVal == false) {
        console.log("Activating Container");
        this.containerActive = true;
        this.gridRow = 2 + Math.ceil((blankDays - -newVal) / 7);
      } else if (newVal === false) {
        console.log("Deactivating Input");
        this.inputActive = false;
      } else {
        // If new chosen day is in the same row - no need to run animation
        let oldRow = 2 + Math.ceil((blankDays - -oldVal) / 7)
        let newRow = 2 + Math.ceil((blankDays - -newVal) / 7)

        if (oldRow !== newRow) {
          this.inputActive = false;
        }
      }
    },
    gridRow(newVal, oldVal) {

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
  height: 6em;
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

.input-container {
  align-self: center;
  grid-column-start: 1;
  grid-column-end: 8;
  width: 100%;
  height: 6em;
  justify-content: center;
  display: flex;
  align-items: center;
}

.container-expand-enter {
  height: 0em;
}

.container-expand-enter-to {
  height: 6em;
}

.container-expand-enter-active {
  /* transition: height 0.2s cubic-bezier(.25,0,.61,.28); */
  transition: height 0.2s ease-in;
}

.container-expand-leave-active {
  /* transition: height 0.2s cubic-bezier(.25,0,.61,.28); */
  transition: height 0.2s ease-out;
}

.container-expand-leave {
  height: 6em;
}

.container-expand-leave-to {
  height: 0em;
}

/* After implying margin distance between days becomes unconstant*/
/*.calendar-cell:nth-child(7n) {
  margin-right: 2em;
}


.calendar-cell:nth-child(7n+1) {
  margin-left: 2em;
}

.calendar-cell:last-child {
  margin-right: 2em;
}*/
/*.calendar-cell:nth-last-child(7) {
  margin-bottom: 2em;
}*/

.week-day {
  color: #FFFFFF;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 1.25em;

  width: 1.75em;
  height: 1.75em;

  text-align: center;
}
.expand-enter {
  height: 0em;
}

.expand-enter-active, .expand-leave-active {
  transition: height 0.15s cubic-bezier(.25,0,.61,.28);
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