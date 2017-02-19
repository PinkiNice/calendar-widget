<template>
  <div @click='onClick' v-bind:class='this.class' v-bind:style="style">
    <div class="content">
      {{ text }}
    </div>
  </div>
</template>
    
<script>
/*
  TODO
  drafted {
  background-color: gray;
}*/
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
    style () {
      return {
        color: this.active ? this.palette.main : this.palette.text,
        backgroundColor: this.active ? this.palette.complement : 'transparent',
        borderColor: this.hasInfoInStore ? this.palette.complement : this.palette.main,

      };
    },
    active () {
      let activeDate = this.$store.state.activeDate;
      return activeDate && activeDate.split('/')[2] == this.text;
    },
    palette () {
      return this.$store.state.palette;
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
  font-size: 1.25em;
  text-align: center;
  width: 1.75em;
  height: 1.75em;
  cursor: pointer;
  border-style: solid;
  border-width: 0.1em;
  border-radius: 50%;
}

.active-day {
  border-style: solid;
}

.have-info {
  border-style: solid;
}
.content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>