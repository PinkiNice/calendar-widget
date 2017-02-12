import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    currentMonth: new Date().getFullYear() + '/' + new Date().getMonth(),
    activeDate: false,
    activities: {
      // There are data about date's which have smth noticed
      // [key] = date itself in a format 2017/01/10
      // [value] = object with information about activity
    },
  },
  
  mutations: {
    monthForward (state) {
      let [year, month] = state.currentMonth.split('/');
      let date = new Date(year, month - -1);
      state.activeDate = false;
      state.currentMonth = date.getFullYear() + '/' + date.getMonth();
    },
    monthBackward (state) {
      let [year, month] = state.currentMonth.split('/');
      let date = new Date(year, month - 1);
      state.activeDate = false;
      state.currentMonth = date.getFullYear() + '/' + date.getMonth();
    },
    makeDayActive (state, date) {
      // date - number of the day in current month
      // splitted by slash

      // Here we possibly can define in which row we should add the form.
      state.activeDate = `${state.currentMonth}/${date}`;
    },
  },
});

export default store;