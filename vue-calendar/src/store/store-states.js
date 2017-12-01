/**
 * Created by Rick on 2017-11-30.
 */
'use strict';

export default new Vuex.Store({
  state: {
    currentYear: 2017,
    currentMonth: 11,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    events: [],
    eventFormDate: moment(),
    vueInstance: null
  },
  mutations: {
    setCurrentMonth(state,payload){
      state.currentMonth = payload;
    },
    setCurrentYear(state,payload){
      state.currentYear = payload;
    },
    eventFormPos(state,payload){
      state.eventFormPosX = payload.x;
      state.eventFormPosY = payload.y;
    },
    eventFormActive(state,payload){
      state.eventFormActive = payload;
    },
    addEvent(state,payload){
      state.events.push(payload);
    },
    eventFormDate(state,payload){
      state.eventFormDate = payload;
    },
    setVueInstance(state,payload){
      state.vueInstance = payload;
    }
  },
  actions: {
    addEvent(context,payload){
      return new Promise((resolve,reject) => {
        const eventObj = {
          description: payload,
          date: context.state.eventFormDate
        };
        context.state.vueInstance.$http.post('/add_event',eventObj).then((response) => {
          if(response.status === 200){
            context.commit('addEvent',eventObj);
            resolve();
          }else{
            reject(`Error saving event at server. Status: ${response.status}`);
          }
        })
      })
    }
  }
});