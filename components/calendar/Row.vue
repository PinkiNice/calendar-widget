<template>
  <div class='row'>
    <component
      v-for="day in days" 
      :is="day ? 'day' : 'blank-day'" 
      :text="day ? day : ''" >
    </component>
    <input-field v-show='activeRow'></input-field>
  </div>
</template>
    
<script>
import Day from './Day';
import BlankDay from './BlankDay';
import InputField from './InputField';

export default {
  name: 'row',
  props: ['days'],
  computed: {
    activeRow() {
      if (!this.$store.state.activeDate) {
        return false;
      };
      let active = this.$store.state.activeDate.split('/')[2];
      return this.days.indexOf(active - 0) != -1;
    },
  },
  components: {
    day: Day,
    'blank-day': BlankDay,
    'input-field': InputField,
  },
};
</script>

<style>
</style>