<template>
  <div class='calendar-header'>
    <div class='week-day' v-for='day in arr'>{{ day }}</div>
  </div>
</template>
    
<script>
export default {
  name: 'days-header',
  data() {
    return {
      arr: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    };
  },
};
</script>

<style scoped>
.calendar-header {
  color: #FFFFFF;
  width: 100%;
  display: subgrid;
  grid-row-start: 1;
  grid-row-end: 7;
}
.week-day {
  font-weight: bold;
  font-size: 30px;
  margin: 10px;
}
</style>