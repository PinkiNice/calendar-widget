<template>
    <div :style="style" class="background">
      <div class='widget'>
        <month-view v-if='mode === "month-view"'></month-view>
        <day-view v-if='mode === "day-view"'></day-view>
      </div>
    </div>
</template>
    
<script>
import DayView from '../components/calendar/DayView/DayView';
import MonthView from '../components/calendar/MonthView/MonthView';

export default {
  name: 'widget',
  components: {
    'month-view': MonthView,
    'day-view': DayView,
  },
  computed: {
    mode() {
      return this.$store.state.mode;
    }, // month-view - calendar, day-view - event-menu
    style() {
      return {
        backgroundColor: this.palette.complement,
      };
    },
    palette() {
      return this.$store.state.palette;
    }
  },
};
</script>

<style scoped>
::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: pink;
}
::-moz-placeholder { /* Firefox 19+ */
  color: pink;
}
:-ms-input-placeholder { /* IE 10+ */
  color: pink;
}
:-moz-placeholder { /* Firefox 18- */
  color: pink;
}

.background {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: #FCEE6D;
}

.height-active-enter, .height-active-leave {
  transition: height 1s;
}

.widget {
  
  min-height: 27em;
  min-width: 24em;
  /*height:60vw;
  max-height:80vh;  max-height / height = aspect ratio */
/*  width:40vw;
  max-width: 60vh;  max-width / width = aspect ratio */
  width: 41em;
  margin-left: auto; 
  margin-right: auto;
}
</style>