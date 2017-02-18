import Vuex from 'vuex';
import lodash from 'lodash';

const changeMonth = (state, step) => {
  let [year, month] = state.currentMonth.split('/');
  let date = new Date(year, Number(month) + Number(step));
  state.activeDate = false;
  state.currentMonth = date.getFullYear() + '/' + date.getMonth();
};

const store = new Vuex.Store({
  state: {
    mode: 'month-view', // month-view or day-view
    currentMonth: new Date().getFullYear() + '/' + new Date().getMonth(),
    activeDate: false,
    blankDays: false,
    activities: {
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
    palette: {
      name: 'neon',
      main: '#212121',
      text: '#14FFEC',
      input: '#0D7377',
      undrafted: '#323232',
      drafted: '#212121',
      complement: '#0D7377'
    },
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
      let palette = {
        name: '',
        main: '',
        text: '',
        input: '',
        undrafted: '',
        drafted: '',
        complement: ''
      };
      let neon = {
        name: 'neon',
        main: '#212121',
        text: '#14FFEC',
        input: '#0D7377',
        undrafted: '#323232',
        drafted: '#212121',
        complement: '#0D7377'
      };
      let dark = {
        name: 'dark',
        main: '#2C3440',
        text: '#FBFBFB',
        input: '#FBFBFB',
        undrafted: '#424242',
        drafted: '#000000',
        complement: '#FCEE6D'
      }
      let palettes = [neon, dark];
      state.paletteIndex += 1;

      state.palette = palettes[state.paletteIndex % palettes.length];

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