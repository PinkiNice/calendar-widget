<template>
  <div class="container">
    <div
      class="month-control left"
      role="button"
      @click="$store.commit('monthBackward')"> 
      &lt;
    </div>

    <div :style="style" id="month">{{ month | uppercase | shorten }} {{year}}</div>

    <div 
      class="month-control right"
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
    style() {
      return {
        color: this.palette.complement,
      };
    },
    palette() {
      return this.$store.state.palette;
    },
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
  padding-top: 5%;
  display: inline-flex;
  justify-content: center;
}
.month-control {
  font-weight: bold;
  font-size: 2em;
  color: #AFAFAF;
  cursor: pointer;
}
#month {
  width: 45%;
  text-align: center;
  display: inline-block;
  font-family: sans-serif;
  font-size: 2em;
  color: #FCEE6D;
}
</style>