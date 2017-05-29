<template>
  <div class='calendar' 
    :style="{ backgroundColor: this.$store.state.palette.main }"
  >
    <div class="button-container">
      <div  :style="{backgroundColor: this.$store.state.palette.complement}"
            id="palette-button" 
            @click='onClick'
            >
      </div>
    </div>
<!--     <label :style="{
        color: this.$store.state.palette.text
      }"
      for="palette-button"
    >
    {{ this.$store.state.palette.name }}
    </label> -->
    <month class='month-caption'></month>
    <days></days>
  </div>
</template>
    
<script>
import Month from './Month';
import Days from './Days';

export default {
  name: 'month-view',
  components: {
    month: Month,
    days: Days,
  },
  methods: {
    onClick() {
      this.$store.commit('togglePalette');
    },
    handleKey(e) {
      console.log(e);
    },
  },

};
</script>

<style scoped>
.calendar {
  padding:0;
  margin:0;
  box-shadow: 0px 4px 16px 3px #888888;

}
#palette-button {
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin-left: 1em;
  cursor: pointer;
  display: flex;
}
.button-container {
  padding-top: 1em;
}
label {
  padding-left: 5px;
}
</style>