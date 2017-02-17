<template>
  <div class="container">
    <days-header></days-header>
    <row v-for="row in rows" v-bind:days="row"></row>
  </div>
</template>

<script>
import Row from './Row';
import DaysHeader from './DaysHeader';
import lodash from 'lodash';

export default {
  name: 'days',
  computed: {
    rows() {
      let arr = [],
          [year, month] = this.$store.state.currentMonth.split('/'),
          lastDay = new Date(year, month - -1, 0).getDate(),
          firstDay = new Date(year, month).getDay();

      // Fill first n days to match day of the week to calendar.
      for (let i = 0; i < firstDay; ++i) {
        arr.push(null);

      };

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
      let result = lodash.chunk(arr, 7);

      return result;
    },
  },
  components: {
    row: Row,
    'days-header': DaysHeader,
  },
};
</script>

<style scoped>
.container {
  padding-top: 20px;
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>