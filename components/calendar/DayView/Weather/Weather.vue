<template>
  <div class="weather-container">
    <div 
      class="icon ion-ios-sunny"
      :style="{color: this.$store.state.palette.text}"
    >
    </div>
    <div class="degrees">
      <div class="content">
        {{temperature}}° F
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: 'weather',
  data() {
    return { 
      temperature: '50', //should be api request tho
    };
  },
};
</script>

<style scoped>
.weather-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 1em;
  padding-bottom: 2em;
  width: 100%;
}
.picture {
  font-size: 2em;
}
.content {
  align-self: center;
}
.icon {
  font-size: 6em;
  padding-right: 10%;
}
.degrees {  
  font-size: 5em;
  display: inline-flex;
}
</style>