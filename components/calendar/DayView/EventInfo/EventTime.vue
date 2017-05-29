<template>
  <div class='time-container'>
    <label for='time-field'>
      <div 
        @mouseover="mouseOver"
        @mouseout="mouseout"
        :class="iconClass"
        :style="{color: iconColor}"
      ></div>

      <div 
        id="time"
        class="event-time"
        :style="{color: iconColor}"
      >
        {{ 'time' | uppercase}}
      </div>
    </label>
    <input 
      maxlength="5"
      :style="{ 
        backgroundColor: 'transparent',
        color: this.$store.state.palette.icons,
      }"
      v-model="time"
      placeholder="00:00" 
      v-model:value="time"
      class="time-input"
      id="time-field"
    >
  </div>
</template>
    
<script>
// ion-ios-alarm-outline
export default {
  name: 'event-time',
  data() {
    return {
      time: this.$store.state.activities[this.$store.state.activeDate].time || '',
      icon: 'ion-ios-alarm',
    };
  },
  computed: {
    iconClass() {
      return 'icon ' + this.icon; 
    },
    iconColor() {
      let palette = this.$store.state.palette;
      return palette.icons ? palette.icons : palette.text;
    },
    dayData() {
      return this.$store.state.activities[this.$store.state.activeDate];
    },
  },
  methods: {
    mouseOver() {
      console.log('H');
      this.icon = 'ion-ios-alarm-outline'
    },
    mouseout() {
      this.icon = 'ion-ios-alarm'
    },
  },
  watch: {
    time(newVal, oldVal) {
      this.$store.commit('setTime', newVal);
    },
  },
};
</script>

<style scoped>
.time-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.time-input {
  width: 30%;
  margin-top: 1em;
  text-align: center;
  align-self: center;
  outline: none;
  border: none;
  box-shadow: none;
}
#time {
  font-size: 1em;
  text-align: center;
  width: 100%;
}
.icon {
  font-size: 4em;
  text-align: center;
  width: auto;
}
</style>