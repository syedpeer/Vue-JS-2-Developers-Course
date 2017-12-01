import DaySelect from './DaySelect.js';
import MovieList from './MovieList.js';
import MovieFilter from './MovieFilter.js';

export default {
  template: `
    <div>
      <div id="title">
        <img src="../assets/logo.png">
        <h1>Vue.js Cinema</h1>
      </div>
      <div id="overview"> 
        <day-select v-bind:selected="day"></day-select>
        <div class="main">
          <movie-list
            v-bind:genre="genre"
            v-bind:time="time"
            v-bind:movies="movies"
            v-bind:day="day"></movie-list>
          <movie-filter></movie-filter>
        </div>
      </div>
    </div>
  `,
  props: ['genre','time','movies','day'],
  components: {
    MovieList, //name of property is same as name of variable
    MovieFilter,
    DaySelect
  }
}