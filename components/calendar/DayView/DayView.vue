<template>
  <div class='container'>
    <div class="header">

      <div class= "back-button" role="button" @click='back'>&lt;</div>
      <div class="day"> 
        <span class="month-name">{{month | shorten}}</span> 
        <div class="day-cell">{{day}}</div>
      </div>

    </div>
    <div class="weather-container">
      <weather></weather>
    </div>
    <div class="event-container">
      <event-caption></event-caption>
      <div class="event-info"> 
        <event-location class="block"></event-location>
        <event-time class="block"></event-time>
      </div>
    </div>
  </div>
</template>
    
<script>
import EventCaption from './EventCaption';
import EventLocation from './EventLocation';
import EventTime from './EventTime';
import Weather from './Weather';

export default {
  name: 'day-view',
  components: {
    'event-caption': EventCaption,
    'event-location': EventLocation,
    'event-time': EventTime,
    'weather': Weather,
  },
  data() {
    return {};
  },
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
};
</script>

<style scoped>
.container {
  background-color: #2C3440;
}
.header {
  padding: 10px;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
}
.back-button {
  cursor: pointer;
  display: inherit;
  font-weight: bold;
  font-size: 19px;
  color: #AFAFAF;
}
.day {
  display: inherit;
}
.month-name {

}
.event-info {
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
}
.block {
  display: inherit;
  margin: 20px;
}
.weather-container {
  width: 100%;
  margin: 20px;
}
.day-cell {
  min-width: 40px;
  min-height: 40px;
  border-width: 3px;
  border-radius: 50%;
  background-color: yellow;
}
</style>