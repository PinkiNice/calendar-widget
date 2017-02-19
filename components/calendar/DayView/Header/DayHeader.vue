<template>
  <div class="header">

    <div id="button-container">
      <i  class= "content back-button ion-ios-arrow-back" 
          :style="{color: this.$store.state.palette.text }"
          role="button"  
          @click='back'></i>
    </div>

    <div class="month-info">
      <div class="month-name">{{ month | shorten }}</div>
      <div 
      :style="{
        backgroundColor: this.$store.state.palette.complement,
        borderColor: this.$store.state.palette.complement
      }"
      class="day-cell"
      >
      <div
        :style="{color: this.$store.state.palette.main }"
        class="content">
        {{ day }}
      </div>
    </div>
    </div>
    


  </div>  
</template>
    
<script>
export default {
  name: 'day-header',
  computed: {
    month() {
      return this.$store.state.months[this.$store.state.activeDate.split('/')[1]];
    },
    day() {
      return this.$store.state.activeDate.split('/')[2];
    }
  },
  methods: {
    back() {
      this.$store.commit('setNoActiveDay');
      this.$store.commit('toggleViewMode');
    },
  },
  filters: {
    shorten (value) {
      return value.substr(0, 3).toUpperCase();
    },
  },
}
</script>

<style scoped>
.month-name {
  position: relative;
  top: 50%;
  transform: translateY(-25%);
  margin-right: 0.5em;
  font-weight: bold;
  font-size: 1em;
}
.month-info {
  display: inline-flex;
}
.header {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
}
.back-button {
  cursor: pointer;
  display: inherit;
  font-weight: bold;
  align-self: middle;
  font-size: 2em;
  opacity: 0.7;
  color: #AFAFAF;
}
.day {
  display: inline-block;
}
.day-cell {
  font-size: 1.25em;
  text-align: center;
  width: 1.75em;
  height: 1.75em;
  border-style: solid;
  border-width: 0.1em;
  border-radius: 50%;
}
.content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

</style>