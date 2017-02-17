<template>
  <div class="container">
    <div
      class="month-control"
      role="button"
      @click="$store.commit('monthBackward')"> 
      &lt;
    </div>

    <div id="month">{{ month | uppercase | shorten }} {{year}}</div>

    <div 
      class="month-control"
      role="button"
      @click="$store.commit('monthForward')">
      &gt;
    </div>
  </div>
</template>
    

<script>
export default {
  name: 'month',
  computed: {
    month () { 
      let [year, month] = this.$store.state.currentMonth.split('/');
      return this.$store.state.months[month];
    },
    year () {
      let [year] = this.$store.state.currentMonth.split('/');
      return year;
    }
  },
  filters: {
    uppercase (value) {
      return value.toUpperCase();
    },
    shorten (value) {
      return value.substr(0, 3);
    },
  },
}
</script>


<style scoped>
.container {
  width: 100%;
  padding-top: 20px;
  display: inline-flex;
  justify-content: space-around;
}
.month-control {
  font-weight: bold;
  font-size: 19px;
  color: #AFAFAF;
  cursor: pointer;
  margin-left: 30px;
  margin-right: 30px;
}
#month {
  display: inline-block;
  font-family: sans-serif;
  font-size: 30px;
  color: #FCEE6D;
}
</style>