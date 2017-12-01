import CalendarDay from './CalendarDay.js';
import CurrentMonth from './CurrentMonth.js';
import EventForm from './EventForm.js';

export default {
  name: 'App',
  template: `
    <div>
      <div id="header">
        <div>
          <img src="../assets/logo.png">
          <h1>Vue.js Calendar</h1>
        </div>
        <current-month></current-month>
      </div>
      <div id="day-bar">
        <div>Mon</div>
        <div>Tus</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>
      <div id="calendar">
        <div v-for="week in weeks" class="calendar-week">
          <calendar-day v-for="(day,index) in week" :key="index" :day="day"></calendar-day>
        </div>
      </div>  
      <event-form></event-form>
    </div>
  `,
  components: {
    CalendarDay,
    CurrentMonth,
    EventForm
  },
  computed: {
    month(){
      return this.$store.state.currentMonth;
    },
    year(){
      return this.$store.state.currentYear;
    },
    days() {
      const SUNDAY = 0;
      const MONDAY = 1;
      const days = [];
      let currentDay = moment(this.year + '-' + this.month + '-1','YYYY-M-D');
      //adding days to current month

      do {
        days.push(currentDay);
        currentDay = moment(currentDay).add(1,'days');
      }while((currentDay.month()+1) === this.month);

      //add previous days
      currentDay = moment(days[0]);
      if(currentDay.day() !== MONDAY){
        do{
          currentDay = moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
        }while(currentDay.day() !== MONDAY);  //not Monday (Sunday = 0)
      }
      //add following days
      currentDay = moment(days[days.length - 1]);
      if(currentDay.day() !== SUNDAY){
        do {
          currentDay = moment(currentDay).add(1,'days');
          days.push(currentDay);
        }while(currentDay.day() !== SUNDAY);
      }
      return days;
    },
    weeks(){
      const weeks = [];
      let week = [];
      for(let day of this.days){
        week.push(day);
        if(week.length === 7){
          weeks.push(week);
          week = [];
        }
      }
      return weeks;
    }
  }
}