<template>
 <div class='menu' v-bind:style="{ gridRowStart: this.row}">
    <input type="text" v-bind:style="{ fontColor: drafted ? '#2C3440' : '#ABABAB'}" class="input-field" @input='this.drafted = false' v-model="text" @keyup.enter.prevent='submit' placeholder="Your event caption here"></input>
 </div>
</template>

<script>
/*
3 Options: Change event-caption, change time, change location.
Setting time is available after setting event-caption.
    <choose-geo v-if='geo'></choose-geo>
    <button @click='toggleGeo'>Geo</button>
Check existing day info in store - if exist - show menu. [ [caption], [time], [geo] ]
*/

import lodash from 'lodash';

export default {
  name: 'event-creation-menu',
  data() {
    return {
      text: this.$store.state.drafts[this.$store.state.activeDate] || '',
      drafted: false,
    };
  },
  watch: {
    text() {
      // no need to draft empty caption
      if (this.text == '') {
        this.drafted = false;
        this.$store.commit('updateDraft', this.text);
        return;
      }

      this.drafted = this.text == this.$store.state.drafts[this.$store.state.activeDate];
      this.updateDraft();
    },
    activeDay() {
      this.text = this.$store.state.drafts[this.$store.state.activeDate] || '';
    },
  },
  computed: {
    activeDay() {
      return this.$store.state.activeDate;
    },
    row() {
      let state = this.$store.state;

      if (state.activeDate && state.blankDays) {
        let day = state.activeDate.split('/')[2];
        return 2 + Math.ceil((state.blankDays - -day) / 7);
      }
    },
  },
  methods: {
    updateDraft: lodash.debounce(
      function ()  {
        if (this.text != '') {
          this.drafted = true;
          this.$store.commit('updateDraft', this.text);
        }
      }, 300
    ),
    submit() {
      let info = {
        text: this.text,
        time: false,
        geo: false,
      };
      // clear input field
      this.text = '';
      
      this.$store.commit('setEvent', info);
      this.$store.commit('setNoActiveDay');
    },
  },
};
</script>


<style scoped>
.menu {
  position: absolute;
  z-index: 2;
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 8;
  align-content: stretch;
}
.input-field {

}
input[type="text"] {
  outline-width: 0;
  text-align: center;
  display: block;
  margin: 10px;
  width: 100%;
  font-family: sans-serif;
  font-size: 20px;
  box-shadow: none;
  border: none;
}
</style>