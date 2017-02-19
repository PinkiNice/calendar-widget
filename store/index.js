import Vuex from 'vuex';
import lodash from 'lodash';
import Vue from 'vue';

const changeMonth = (state, step) => {
  let [year, month] = state.currentMonth.split('/');
  let date = new Date(year, Number(month) + Number(step));
  state.activeDate = false;
  state.currentMonth = date.getFullYear() + '/' + date.getMonth();
};

const palettes = [
  { 
    name: 'strawberry',
    main: '#F03861',
    text: '#FEF2F2',
    input: '#FEF2F2',
    complement: '#FEF2F2'
  },
  {
    name: 'bunny',
    main: '#FFF6F6',
    text: '#891180',
    input: '#EEA1EB',
    complement: '#EEA1EB'
  },
  {
    name: 'dark',
    main: '#212121',
    text: '#14FFEC',
    input: '#212121',
    complement: '#323232'
  },
  {
    name: 'plain',
    main: '#2C3440',
    text: '#FBFBFB',
    input: '#FBFBFB',
    icons: '#2C3440',
    complement: '#FCEE6D'
  },
  {
    name: 'candy',
    main: '#F68686',
    text: '#FFE3B9',
    input: '#92CCE1',
    complement: '#FFE3B9'
  },
  {
    name: 'summer',
    main: '#F19584',
    text: '#F6E4C4',
    input: '#29C6CD',
    complement: '#29C6CD'
  }
];  

const getPalette = (name) => {
  let palette = palettes.filter(palette => palette.name == name);
  return palette[0] || {};
}
const store = new Vuex.Store({
  state: {
    mode: 'month-view', // month-view or day-view
    currentMonth: new Date().getFullYear() + '/' + new Date().getMonth(),
    activeDate: false,
    blankDays: false,
    activities: {
      '2017/1/1': {
        text: 'Privet!',
        time: false,
        location: false,
      },
      // There are data about date's which have smth noticed
      // [key] = date itself in a format 2017/01/10
      // [value] = object with information about activity
    },
    drafts: {
      // unsubmitted changes in days caption
      '00/00/00': {
        text: 'lorem',
      },
    },
    months: [
      'january', 'february', 'march',
      'april',   'may',      'june',
      'jule',    'august',   'september',
      'october', 'november', 'december'
    ],
    palette: getPalette('plain'),
    paletteIndex: 0,
    },
  
  mutations: {
    /*
    main: The most part of monitor () (BLACK ON DARK PALETTE)
    text: visible on main color
    drafted: just a little bit diff from text
    complement: contrapart to main

    Dark Background: #2C3440
    Yellow: #FCEE6D
    White: #FBFBFB
    */
    togglePalette (state) {
      
      state.paletteIndex += 1;

      state.palette = palettes[state.paletteIndex % palettes.length];
      console.log(`CURRENT PALETTE IS: ${state.palette.name}`);

    },
    changeLocation (state, location) {
      state.activities[state.activeDate] = { ...state.activities[state.activeDate], location };
    },
    setTime (state, time) {
      state.activities[state.activeDate] = { ...state.activities[state.activeDate], time };
    },
    setPalette (state, palette) {
      state.colors = palette;
    },
    setBlankDays (state, n) {
      state.blankDays = n;
    },
    changeMonth (state, step) {
      let [year, month] = state.currentMonth.split('/');
      let date = new Date(year, Number(month) + Number(step));
      state.activeDate = false;
      state.currentMonth = date.getFullYear() + '/' + date.getMonth();
    },
    monthForward (state) {
      store.commit('changeMonth', 1);
    },
    monthBackward (state) {
      store.commit('changeMonth', -1);
    },
    clickOnDay (state, date) {
      // date - 'YYYY/MM/DD'
      // inform the whole application about which day is currently chosen
      state.activeDate = `${state.currentMonth}/${date}`;

      // move widget to a event-view mode if day already have info
      if (state.activities[state.activeDate]) {
        state.mode = 'day-view';
      };
    },
    toggleViewMode(state) {
      state.mode = state.mode === 'month-view' ? 'event-view' : 'month-view';
    },
    setNoActiveDay (state) {
      state.activeDate = false;
    },
    eventCaptionChange (state, text) {
      state.activities[state.activeDate] = { ...state.activities[state.activeDate], text };
    },
    setEvent (state, info) {
      if (!state.activeDate) throw new Error('Store.js: Active Day is Not Defined.');  
      let str = state.activeDate;
      state.drafts = { ...state.drafts, [state.activeDate]: false };
      lodash.unset(state.drafts, state.activeDate);
      state.activities = { ...state.activities, [state.activeDate]: info };
    },
    updateDraft(state, text) {
      // Updates text in current active date's draft
      if (text == '') {
        state.drafts = { ...state.drafts, [state.activeDate]: false };
        lodash.unset(state.drafts, state.activeDate);
        return;
      }
      state.drafts = { ...state.drafts, [state.activeDate]: text };
    },
  },
});

export default store;