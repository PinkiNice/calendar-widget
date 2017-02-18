<template>

    <div class="menu clearfix" v-bind:style="{gridRowStart: this.row}">
      <input 
        type="text" 
        placeholder="New event"
        v-model="text" 
        class="input-field" 
        :style="style"
        @input="this.drafted = false" 
        @keyup.enter.prevent="submit" 
      >
      </input>
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
const TWEEN = require('tween.js');

export default {
  name: 'event-creation-menu',
  data() {
    return {
      class: 'menu',
      text: this.$store.state.drafts[this.$store.state.activeDate] || '',
      drafted: false,
      place: 0,
    };
  },
  beforeDestroy() {
    this.height = undefined;
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
    row (newValue, oldValue) {
      /**
        On every call this should call animation
        With following steps:
          1. Reduce height of input to 0
          2. Change the fake-var place to be equal to new value of row.
            When this is done - DIV will take it's new position
          3. Increase height of input to 6 em.
      **/
      // this.animateHeight();
      // this.place = newValue; // Alows us to change place in custom time
      //this.class = 'menu expand-leave-active expand-leave-to';
      console.log(oldValue, newValue);
    },
  },
  computed: {
    style() {
      console.log(this.drafted);
      console.log(this.palette.drafted);
      return {
         color: this.drafted ? this.palette.drafted : this.palette.undrafted,
         backgroundColor: this.palette.input ,
      };
    },
    palette() {
      return this.$store.state.palette;
    },
    activeDay() {
      return this.$store.state.activeDate;
    },
    row() {
      let state = this.$store.state;
      if (state.activeDate && state.blankDays !== false) {
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
  width: 100%;
  grid-column-start: 1;
  grid-column-end: 8;
}

.clearfix:after {
   content: " "; /* Older browser do not support empty content */
   visibility: hidden;
   display: block;
   height: 0;
   clear: both;
}

input[type="text"] {
  float: left;
  font-family: sans-serif;
  font-size: 1.5em;
  width: 100%;
  height: 100%;
  text-align: center;
  outline-width: 0;
  border: none;
}
</style>  