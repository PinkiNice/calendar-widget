<template>

    <div class="menu" v-bind:style="{gridRowStart: this.row}">
      <input 
        type="text" 
        placeholder="New event"
        v-model="text" 
        class="input-field" 
        :style="style"
        @input="this.drafted = false" 
        @keyup.enter.prevent="submit" 
      ></input>
      <div :style="style" class="icon-container">
        <i :class="iconClass" ></i>
      </div>
    </div>

</template>

<script>
/*
ion-ios-circle-outline - no draft
ion-ios-checkmark - draft

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
      drafted: true,
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
  },
  computed: {
    iconClass() {
      return this.text == '' ? '' : this.drafted ? 'ion-ios-checkmark' : 'ion-ios-circle-outline';
    },
    style() {
      return {
         color: this.palette.main,
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
  display: inline-flex;
}

input[type="text"] {
  float: left;
  font-family: sans-serif;
  font-size: 1.5em;
  padding-bottom: 0;
  padding-top: 0;
  padding-left: 1em;
  width: 100%;
  text-align: left;
  outline-width: 0;
  border: none;
  display: inline-block;
  vertical-align: middle;
}
i {
  font-size: 1.5em;
  padding-right: 0.2em;
  padding-left: 0.2em;
  align-self: center;
}
.icon-container {
  display: inline-flex;
}
</style>  