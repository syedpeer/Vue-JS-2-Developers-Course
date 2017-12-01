import CheckFilter from './CheckFilter.js';
import genres from '../util/genres.js';
import times from '../util/times.js';

export default {
  template: `
  <div id="movie-filter">
    <h2>Filter results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter v-for="(time,index) in times" :key="index" category="time" v-bind:title="time"></check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
      <check-filter v-for="(genre,index) in genres" :key="index" category="genre" v-bind:title="genre"></check-filter>
    </div>
  </div>
  `,
  data(){      //alternate way of setting data in component
    return {
      genres,  //name of property is same as name of variable
      times
    }
  },
  components: {
    CheckFilter
  }
}