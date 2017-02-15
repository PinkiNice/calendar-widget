<template>
  <div class="container">
    <div id="month-caption">{{ month }}</div>
    <button @click="$store.commit('monthBackward')">&lt;</button>
    <button @click="$store.commit('monthForward')">&gt;</button>
  </div>
</template>
    
<script>
export default {
  name: 'month',
  data() {
    return { 
      months: [
      'January', 'February', 'March',
      'April',   'May',      'June',
      'Jule',    'August',   'September',
      'October', 'November', 'December'
       ],
     };
  },
  computed: {
    month () { 
      let [year, month] = this.$store.state.currentMonth.split('/');
      return `${this.months[month]} of ${year}`;
    }, 
  },
}
</script>

<style>
</style>