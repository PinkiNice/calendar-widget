<template>
  <div @click='onClick' v-bind:class='this.class' v-bind:style="{ color: this.active ? '#2C3440' : '#FBFBFB' }">
    <div class="content">
    {{ text }}
    </div>
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
      return `day-cell ${ 
        this.active ? 'active-day' 
        : this.drafted ? 'drafted'
        : this.hasInfoInStore ? 'have-info' 
        : ''
      }`;
    },
    active () {
      let activeDate = this.$store.state.activeDate;
      return activeDate && activeDate.split('/')[2] == this.text;
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
  font-size: 20px;
  text-align: center;
  width: 1.75em;
  height: 1.75em;
  cursor: pointer;
  padding: 2px;
  border-color: #2C3440;
  border-style: solid;
  border-width: 2px;
  border-radius: 50%;
}

.active-day {
  background-color: #FCEE6D;
  border-color: #FCEE6D;
}

.have-info {
  border-color: #FCEE6D;
}

.drafted {
  background-color: gray;
}
.content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>