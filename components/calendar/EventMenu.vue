<template>
 <div class='container'>
    <new-event v-if='!activityExists'></new-event>
    <update-event v-if='activityExists'></update-event>
 </div>
</template>
      

<script>
/*
3 Options: Change event-caption, change time, change location.
Setting time is available after setting event-caption.

Check existing day info in store - if exist - show menu. [caption, time, geo]
*/
import NewEvent from './NewEvent';
import UpdateEvent from './UpdateEvent';

export default {
  name: 'event-menu',
  data() {
    return {};
  },

  computed: {
    activityExists() {
      let state = this.$store.state;
      return !!state.activities[state.activeDate]
    },
  },

  components: {
    'new-event': NewEvent,
    'update-event': UpdateEvent,
  },

  methods: {
  },
};
</script>


<style>
.container {
  display: inline-block;
}
</style>