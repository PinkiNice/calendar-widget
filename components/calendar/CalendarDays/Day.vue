<template>
  <div @click='onClick' v-bind:class='this.class'>
    <span class='month-day'> {{ text }} </span>
  </div>
</template>
    
<script>
export default {
  name: 'day',
  props: ['text'],
  data() {
    return {
      click: false,
      hover: false,
    };
  },
  computed: {
    class () {
      let activeDate = this.$store.state.activeDate;
      let ifActive = activeDate && activeDate.split('/')[2] == this.text;
      return `day-cell ${ifActive ? 'active-day' : this.hasInfoInStore ? 'have-info' : ''}`;
    },
    hasInfoInStore () {
      return !!this.$store.state.activities[`${this.$store.state.currentMonth}/${this.text}`];
    },
  },
  methods: {
    onClick() {
      if (!this.$store.state.activeaDate || this.$store.state.activeDate.split('/')[2] != this.text) {
        this.$store.commit('makeDayActive', this.text);
      };
    },
  },
};
</script>

<style>
.day-cell {
  display: inline-block;
  min-width: 40px;
  min-height: 40px;
  margin: 10px;
  line-height: 34px;
  border-width: 3px;
  border-radius: 50%;
}

.month-day {
}

.active-day {
  background-color: yellow;
}
.hover-on {
  background-color: yellow;
  border-color: yellow;
  border-style: solid;
}
.have-info {
  border-color: yellow;
  border-style: solid;
}
</style>