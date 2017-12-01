import {EventBus} from "../util/bus.js";

export default {
  template: `
    <div v-bind:class="{'check-filter':true, active: checked}" v-on:click="checkFilter">
      <span class="checkbox"></span>
      <span class="check-filter-title">{{title}}</span>
    </div>
  `,
  data(){
    return {
      checked: false
    }
  },
  props: ['title','category'],
  methods: {
    checkFilter(){
      this.checked = !this.checked;
      EventBus.$emit('check-filter',this.category,this.title,this.checked)
    }
  }
}