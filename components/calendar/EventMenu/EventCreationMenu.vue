<template>
  <transition name="expand">  
    <div class='menu clearfix' v-bind:style="this.style">
      <input 
        type="text" 
        placeholder="Your event caption here"
        v-model="text" 
        v-bind:style="{ color: drafted ? '#2C3440' : '#6D6D6D'}" 
        class="input-field" 

        @input='this.drafted = false' 
        @keyup.enter.prevent='submit' 
      >
      </input>
    </div>
  </transition>
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
const TWEEN = require('tween.js');

export default {
  name: 'event-creation-menu',
  data() {
    return {
      text: this.$store.state.drafts[this.$store.state.activeDate] || '',
      drafted: false,
      place: 2 + Math.ceil((this.$store.state.blankDays - -this.$store.state.activeDate.split('/')[2]) / 7),
      height: undefined, // in EM
    };
  },
  beforeDestroy() {
    this.height = undefined;
  },
  watch: {
    text() {
      // no need to draft empty caption
      if (this.text == '') {
        this.drafted = false;
        this.$store.commit('updateDraft', this.text);
        return;
      }

      this.drafted = this.text == this.$store.state.drafts[this.$store.state.activeDate];
      this.updateDraft();
    },
    activeDay() {
        this.text = this.$store.state.drafts[this.$store.state.activeDate] || '';
    },
    row (newValue, oldValue) {
      /**
        On every call this should call animation
        With following steps:
          1. Reduce height of input to 0
          2. Change the fake-var place to be equal to new value of row.
            When this is done - DIV will take it's new position
          3. Increase height of input to 6 em.
      **/
      this.animateHeight();
      //this.place = newValue; // Alows us to change place in custom time
      console.log(oldValue, newValue);
    },
  },
  computed: {
    style() {
      console.log('mem');
      if (this.height != undefined) {
        return { 
          gridRowStart: this.place,
          height: this.height + 'em' 
        };
      } else {
        return {
          gridRowStart: this.place,
        };
      }
    },
    activeDay() {
      return this.$store.state.activeDate;
    },
    row() {
      let state = this.$store.state;

      if (state.activeDate && state.blankDays) {
        let day = state.activeDate.split('/')[2];
        return 2 + Math.ceil((state.blankDays - -day) / 7);
      }
    },
  },
  methods: {
    updateDraft: lodash.debounce(
      function ()  {
        if (this.text != '') {
          this.drafted = true;
          this.$store.commit('updateDraft', this.text);
        }
      }, 300
    ),
    submit() {
      let info = {
        text: this.text,
        time: false,
        geo: false,
      };
      // clear input field
      this.text = '';
      
      this.$store.commit('setEvent', info);
      this.$store.commit('setNoActiveDay');
    },
    animateHeight() {
      console.log('HM');
      let vm = this; //vue instance
      let animationFrame;

      function animate(time) {
        TWEEN.update(time);
        animationFrame = requestAnimationFrame(animate);
      }

      const collapse = 
        new TWEEN.Tween({ tweeningValue: 6})
        .to({ tweeningValue: 0 }, 1750)
        .onUpdate(function () {
          vm.height = this.tweeningValue;
          console.log(vm.height);
        })
        .onComplete(function () {
          vm.place = vm.row;
          cancelAnimationFrame(animationFrame);
        });

      const expand = 
        new TWEEN.Tween({ tweeningValue: 0 })
          .to({ tweeningValue: 6 }, 1750)
          .onUpdate(function () {
            vm.height = this.tweeningValue;
          })
          .onComplete(function () {
            cancelAnimationFrame(animationFrame);
          });

      // collapse.chain(expand).start();
      collapse.chain(expand).start();
      animationFrame = requestAnimationFrame(animate);
    },
  },
};
</script>


<style scoped>
.menu {
  width: 116%;
  height: 6em;
  grid-column-start: 1;
  grid-column-end: 8;
  align-content: stretch;
  justify-self: center;
}

.clearfix:after {
   content: " "; /* Older browser do not support empty content */
   visibility: hidden;
   display: block;
   height: 0;
   clear: both;
}

input[type="text"] {
  font-family: sans-serif;
  font-size: 35px;
  width: 100%;
  height: 100%;
  text-align: center;

  align-self: center;

  outline-width: 0;
  border: none;
}

.expand-enter {
  height: 0em;
}

.expand-enter-active, .expand-leave-active {
  transition: height 2s;
} 

.expand-enter-to {
  height: 6em;
}

.expand-leave {
  height: 6em;
}

.expand-leave-to {
  height: 0em;
}
</style>