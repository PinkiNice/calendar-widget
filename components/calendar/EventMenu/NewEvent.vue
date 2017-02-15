<template>
 <div class='container'>
    <input v-model="text" @keyup.enter.prevent='submit'  placeholder="New Event"></input>
    <span v-if='this.drafted'>saved.</span>
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
  name: 'new-event',
  data() {
    return {
      text: this.$store.state.drafts[this.$store.state.activeDate] || '',
      drafted: false,
    };
  },
  watch: {
    text() {
      console.log('mem');
      this.drafted = false;
      this.draft();
    },
    activeDay() {
      this.text = this.$store.state.drafts[this.$store.state.activeDate] || '';
    },
  },
  computed: {
    activeDay() {
      return this.$store.state.activeDate;
    },
  },
  methods: {
    draft() {
      lodash.debounce(() => {
        this.drafed = true;
        this.$store.commit('updateDraft', this.text);
      }, 1000)
    },
    submit() {
      let info = {
        text: this.text,
        time: false,
        geo: false,
      };
      // clear input field
      this.text = '';

      this.$store.commit('setEvent', info);
    },
  },
};
</script>


<style>
.container {
  display: inline-block;
}
</style>