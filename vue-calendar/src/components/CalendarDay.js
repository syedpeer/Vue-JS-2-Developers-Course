export default {
  name: 'CalendarDay',
  template: `
    <div :class="classObject" @click="captureClick">
      {{day.format('D')}}
      <ul class="event-list">
        <li v-for="(event,index) in events" :key="index">{{event.description}}</li>
      </ul>
    </div>
  `,
  props: ['day'],
  computed: {
    events(){
      return this.$store.state.events.filter((event) => event.date.isSame(this.day,'day'));
    },
    classObject(){
      const eventFormDate = this.$store.state.eventFormDate;
      const eventFormActive = this.$store.state.eventFormActive;
      const today = this.day.isSame(moment(), 'day');
      return {
        day: true,
        today,
        past: this.day.isSameOrBefore(moment(), 'day') && !today,
        active: eventFormDate.isSame(this.day,'day') && eventFormActive
      }
    }
  },
  methods: {
    captureClick(event){
      this.$store.commit('eventFormPos',{x: event.clientX,y: event.clientY});
      this.$store.commit('eventFormActive',true);
      this.$store.commit('eventFormDate',this.day);
    }
  }
}