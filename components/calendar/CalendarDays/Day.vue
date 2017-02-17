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
    };
  },
  computed: {
    class () {
      let activeDate = this.$store.state.activeDate;
      let ifActive = activeDate && activeDate.split('/')[2] == this.text;
      return `day-cell ${ 
        ifActive ? 'active-day' 
        : this.drafted ? 'drafted'
        : this.hasInfoInStore ? 'have-info' 
        : ''
      }`;
    },
    hasInfoInStore () {
      return !!this.$store.state.activities[`${this.$store.state.currentMonth}/${this.text}`];
    },
    drafted() {
      return !!this.$store.state.drafts[`${this.$store.state.currentMonth}/${this.text}`];
    },
  },
  methods: {
    onClick() {
      if (!this.$store.state.activeDate || this.$store.state.activeDate.split('/')[2] != this.text) {
        this.$store.commit('clickOnDay', this.text);
      };
    },
  },
};
</script>

<style scoped>
.day-cell {
  color: #FFFFFF;
  font-family: sans-serif;
  font-size: 20px;
  text-align: center;

  cursor: pointer;

  border-width: 2px;
  border-radius: 50%;
}

.active-day {
  background-color: #FCEE6D;
}

.have-info {
  border-color: #FCEE6D;
  border-style: solid;
}

.drafted {
  background-color: gray;
}
</style>