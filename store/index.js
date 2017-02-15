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
    currentMonth: new Date().getFullYear() + '/' + new Date().getMonth(),
    activeDate: false,
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
  },
  
  mutations: {
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
    makeDayActive (state, date) {
      // date - number of the day in current month
      // splitted by slash

      // Here we possibly can define in which row we should add the form.
      state.activeDate = `${state.currentMonth}/${date}`;
    },
    setEvent (state, info) {
      if (!state.activeDate) throw new Error('Active day not defined.');  
      let str = state.activeDate;
      lodash.unset(state.drafts, state.activeDate);
      state.activities = { ...state.activities, [state.activeDate]: info };
    },
    updateDraft(state, text) {
      // Updates text in current active date's draft
      state.drafts = { ...state.drafts, [state.activeDate]: text };
    },
  },
});

export default store;