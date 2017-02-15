<template>
  <div class="container">
    <event-caption v-bind:active="active" @click.native="onClick('caption')" v-if='eventCaptionActive'></event-caption>
    <event-time v-bind:active="active" @click.native="onClick('time')" v-if='eventTimeActive'></event-time>
    <event-location v-bind:active="active" @click.native="onClick('location')" v-if='eventLocationActive'></event-location>
  </div>
</template>

<script>
import EventCaption from './EventCaption';
import EventTime from './EventTime';
import EventLocation from './EventLocation';

export default {
  name: 'update-event',
  data() {
    return {
      active: 0,
    };
  },
  components: {
    'event-caption': EventCaption,
    'event-time': EventTime,
    'event-location': EventLocation,
  },
  computed: {
    eventCaptionActive() {
      return this.active === 1 || !this.active;
    },
    eventTimeActive() {
      return this.active === 2 || !this.active;
    },
    eventLocationActive() {
      return this.active === 3 || !this.active;
    },
  },
  methods: {
    onClick(where) {
      switch (where){
        case 'caption':
          if (this.active === 1) {
            this.active = 0;
          } else {
            this.active = 1;
          }
          break;
        case 'time':
          if (this.active === 2) {
            this.active = 0;
          } else {
            this.active = 2;
          }
          break;
        case 'location':
          if (this.active === 3) {
            this.active = 0;
          } else {
            this.active = 3;
          }
          break;
        default:
          break;
      };
    },
  },
};
</script>

<style>
.container {
  display: inline-block;
}
</style>