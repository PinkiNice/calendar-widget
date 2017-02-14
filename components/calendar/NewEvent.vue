<template>
 <div class='container'>
    <input v-if='!geo' v-model="text" @keyup.enter.prevent='submit'  placeholder="New Event"></input>
    <choose-geo v-if='geo'></choose-geo>
    <button @click='toggleGeo'>Geo</button>
 </div>
</template>    

<script>
/*
3 Options: Change event-caption, change time, change location.
Setting time is available after setting event-caption.

Check existing day info in store - if exist - show menu. [caption, time, geo]
*/
import ChooseGeo from './ChooseGeo';

export default {
  name: 'new-event',
  data() {
    return {
      geo: false,
      time: false, // later
      text: '',
    };
  },
  computed: {
    activityExists() {
      let state = this.$store.state;
      return !!state.activities[state.activeDate]
    },
  },
  components: {
    'choose-geo': ChooseGeo,
  },
  methods: {
    toggleGeo() {
      this.geo = !this.geo;
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
.button {
  background-color: blue;
  border: solid;
}
.container {
  display: inline-block;
}
</style>