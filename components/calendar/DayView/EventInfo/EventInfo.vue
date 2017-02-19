<template>
  <div class="event-container"
    :style="{backgroundColor: this.$store.state.palette.text }"
  >
    <event-caption></event-caption>
    <div class="event-info"> 
      <event-location class="block"></event-location>
      <event-time class="block"></event-time>
    </div>
  </div>
</template>
    
<script>
import EventCaption from './EventCaption';
import EventLocation from './EventLocation';
import EventTime from './EventTime';

export default {
  name: "event-info",
  components: {
    'event-caption': EventCaption,
    'event-location': EventLocation,
    'event-time': EventTime,
  },
  computed: {
    backgroundColor() {
      return this.$store.state.text
    }
  }
}
</script>

<style scoped>
.event-container {
  border-top-right-radius: 0.5em;
  border-top-left-radius: 0.5em;
  display: flex;
  flex-direction: column;
}

.event-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
  margin-bottom: 3em;
}
</style>