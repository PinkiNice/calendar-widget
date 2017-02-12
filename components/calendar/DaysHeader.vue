<template>
  <div class='calendar-header'>
    <div class='week-day' v-for='day in arr'>{{day}}</div>
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

<style>
.week-day {
  display: inline-block;
  font-weight: bold;
  font-size: 30px;
  min-width: 40px;
  min-height: 40px;
  margin: 10px;
}
</style>