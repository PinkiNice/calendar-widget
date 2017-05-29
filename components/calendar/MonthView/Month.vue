<template>
  <div class="container">
    <div
      class="month-control left ion-ios-arrow-back"
      role="button"
      :style="{color: this.$store.state.palette.text }"
      @click="$store.commit('monthBackward')"> 
    </div>

    <div :style="style" id="month">
      <div class="capture-container">
        <span class="capture" id="prev"> PREV 2017</span>
        <span class="capture" id="current"> {{ month | uppercase | shorten }} {{year}} </span>
        <span class="capture" id="next"> NEXT 2017 </span>
      </div>
    </div>

    <div 
      class="month-control right ion-ios-arrow-forward"
      role="button"
      :style="{color: this.$store.state.palette.text }"
      @click="$store.commit('monthForward')">
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
.capture-container {
  width: 100%;
}
#prev, #next {
  display: none;
  left: 0px;
}
span {
  white-space: nowrap;
}
#capture {
  position: relative;
}
.left {
  margin-right: 1rem;
}
.right {
  margin-left: 1rem;
}
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
  opacity: 0.7;
}
#month {
  width: 5em;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow: hidden;
  text-align: center;
  font-family: sans-serif;
  font-size: 2em;
  color: #FCEE6D;
}
</style>