import MovieItem from './MovieItem.js';
import genres from '../util/genres.js';
import times from '../util/times.js';

export default {
  template: `
  <div id="movie-list">
    <div v-if="filteredMovies">
      <movie-item v-for="(movie,index) in filteredMovies" :key="index"
                  v-bind:movie="movie.movie">
        <div class="movie-sessions">
          <div 
            v-for="session in filteredSessions(movie.sessions)" 
            class="session-time-wrapper tooltip-wrapper"
            v-tooltip="{seats: session.seats}">
            <div class="session-time">{{formatSessionTime(session.time)}}</div>
          </div>
        </div>          
      </movie-item>
    </div>
    <div v-else-if="movies" class="no-results">
      {{noResults}}
    </div>
  </div>
  `,
  props: ['genre','time','movies','day'],
  methods: {
    moviePassesGenreFilter(movie){
      const movieGenres = movie.movie.Genre.split(", ");
      let matched = true;
      this.genre.forEach((genre) => {
        if(movieGenres.indexOf(genre) === -1){
          matched = false;
        }
      });
      return matched;
    },
    sessionPassesTimeFilter(session){
      if(!this.day.isSame(moment(session.time),'day')){
        return false;
      }else if(this.time.length === 0 || this.time.length === 2){
        return true;
      }else if(this.time[0] === times.AFTER_6PM){
        return moment(session.time).hour() >= 18;
      }else {
        return moment(session.time).hour() < 18;
      }
    },
    formatSessionTime(raw){
      return moment(raw).format('h:mm A')
    },
    filteredSessions(sessions){
      return sessions.filter(this.sessionPassesTimeFilter);
    }
  },
  computed: {
    filteredMovies(){
      if(this.movies){
        return this.movies
          .filter(this.moviePassesGenreFilter)
          .filter((movie) => movie.sessions.find(this.sessionPassesTimeFilter))
      }
    },
    noResults(){
      const times = this.time.join(', ');
      const genres = this.genre.join(', ');
      return `No results for ${times}${times.length && genres.length ? ', ' : ''}${genres}.`;
    }
  },
  components: {
    MovieItem
  }
}