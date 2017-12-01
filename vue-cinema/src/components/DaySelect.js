import {EventBus} from "../util/bus.js";

export default {
  template: `
    <div id="day-select">
      <ul class="days">
        <li v-bind:class="{day: true, active: isActive(day)}" v-for="day in days" v-on:click="selectDay(day)">{{formatDay(day)}}</li>
        <li class="day-selector">
          <span class="dec" v-on:click="changeDay(-1)"></span>
          <span class="inc" v-on:click="changeDay(1)"></span>
        </li>
      </ul>
    </div>
  `,
  data() {
    return {
      days: [0,1,2,3,4,5,6].map((num) => moment().add(num,'days'))
    }
  },
  props: ['selected'],
  methods: {
    formatDay: function(raw){ //raw is a moment instance
      if(raw.isSame(moment(),'day')){
        return 'Today';
      }else {
        return raw.format('ddd DD/MM');
      }
    },
    isActive: function(day){
      return day.isSame(this.selected,'day');
    },
    selectDay: function(day){
      EventBus.$emit('set-day',day);
    },
    changeDay: function(change){
      const newDay = moment(this.selected).add(change,'days'); //mutate a new moment to propagate a change
      if(this.days.find(day => newDay.isSame(day,'day'))){
        this.selectDay(newDay);
      }

    }
  }
}
