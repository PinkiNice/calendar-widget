<template>
    <div :style="style" class="background">
      <div 
        class='widget'
      >
        <transition v-bind:name="this.direction" mode="out-in">
          <component class="view" :is="view"></component>
        </transition>
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
    direction() {
      console.log(this.$store.state.view);
      return this.$store.state.view === 'month-view' ? 'left-switch' : 'right-switch';
    },
    view() {
      return this.$store.state.view;
    },  
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
.background {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #FCEE6D;
}

.widget {
  /* width: 41em; */
  min-width: 25em;
  width: 40%;
  margin-left: auto; 
  margin-right: auto;
}

.left-switch-leave-active,
.left-switch-enter-active,
.right-switch-enter-active,
.right-switch-leave-active {
  transition: all 0.2s ease-out;
}

.right-switch-enter {
  transform: translateX(-10%);
  opacity: 0;
}

.right-switch-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.right-switch-leave-to {
  transform: translateX(10%);
  opacity: 0;
}

.left-switch-enter {
  transform: translateX(10%);
  opacity: 0;
}

.left-switch-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.left-switch-leave-to {
  opacity: 0;
  transform: translateX(-10%);
}

.view {
}
</style>