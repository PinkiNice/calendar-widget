<template>
  <div class='event-location'>
    <label for='location-text'>
      <div 
        :class="iconClass"
        :style="{ color: iconColor }"
        @mouseover="mouseOver"
        @mouseout="mouseOut"
      >
      </div>
      <span id='location':style="{ color: iconColor }">{{ 'location' | uppercase }}</span>
    </label>
    <textarea
      id='location-text'
      spellcheck="false"
      placeholder="Your location here"
      maxlength="150"
      :style="{ 
        backgroundColor: 'transparent',
        color: this.$store.state.palette.icons,
      }"
      v-model:value="textareaValue"
      class="location-textarea"
    >
    </textarea>
  </div>
</template>
    
<script>
export default {
  name: 'event-location',
  data() {
    return {
      textareaValue: this.$store.state.activities[this.$store.state.activeDate].location || '',
      icon: 'ion-ios-location',
    };
  },
  computed: {
    iconColor() {
      const palette = this.$store.state.palette;
      return palette.icons ? palette.icons : palette.text;
    },
    iconClass() {
      return 'icon ' + this.icon;
    },
  },
  methods: {
    mouseOver() {
      this.icon = 'ion-ios-location-outline';
    },
    mouseOut() {
      this.icon = 'ion-ios-location';
    },
  },
  watch: {
    //69
    textareaValue(newValue, oldValue) {
      this.$store.commit('changeLocation', newValue);   
    },
  }
}
</script>

<style scoped>
.event-location {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#location {
  font-size: 1em;
  text-align: center;
  width: 100%;
  display: block;
}

.icon {
  font-size: 4em;
  text-align: center;
  display: inline-block;
  text-align: center;
}
.location-textarea {
  align-self: center;
  width: 60%;
  height: 4.5em;
  text-align: center;
  outline: none;
  resize: none;
  overflow: hidden;
  border: none;
  margin-top: 1em;
}
</style>