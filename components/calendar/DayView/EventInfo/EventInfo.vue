<template>
  <div class="info">

    <div class="event-container"
      :style="{ backgroundColor: this.$store.state.palette.text }"
    > 
      <event-caption></event-caption>
      <div class="event-info"> 
        <event-location class="block"></event-location>
        <event-time class="block"></event-time>
      </div>
    </div>

    <div class="shadow"></div>  
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
.shadow {
  min-width: 3em;
  min-height: 3em;
  width: 90%;
  height: 80%;
  position: absolute;
  top: -0.75em;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-top-right-radius: 0.3em;
  border-top-left-radius: 0.3em;
  opacity: 0.5;
  z-index: 5;
  background-color: #EAEAEA;
  align-self: center;
}
.info {
  position: relative;
}
.event-container {
  position: relative;
  border-top-right-radius: 0.5em;
  border-top-left-radius: 0.5em;
  display: flex;
  z-index: 10;
  flex-direction: column;
}

.event-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: baseline;
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>