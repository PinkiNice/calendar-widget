<template>
  <div class='container' :style="{backgroundColor: this.palette.main, color: this.palette.text}">
    <day-header></day-header>
    <weather></weather>
    <event-info></event-info>
  </div>
</template>

<script>
import EventInfo from './EventInfo/EventInfo';
import DayHeader from './Header/DayHeader';
import Weather from './Weather/Weather';

export default {
  name: 'day-view',
  components: {
    'day-header': DayHeader,
    'event-info': EventInfo,
    'weather': Weather,
  },
  data() {
    return {};
  },
  computed: {
    palette() {
      return this.$store.state.palette;
    },
  },
};
</script>

<style scoped>
.container {
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
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


</style>