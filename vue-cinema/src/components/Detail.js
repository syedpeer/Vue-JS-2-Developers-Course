import MovieItem from './MovieItem.js';

export default {
  template: `
    <div id="detail" v-if="movie_check">
      <movie-item v-bind:movie="movie_check">
        <div class="movie-details">
          <p class="movie-genre">{{movie_check.Genre}}</p>
          <p class="movie-plot">{{movie_check.Plot}}</p>
          <table>
            <tr><td>Released date:</td><td>{{movie_check.Released}}</td></tr>
            <tr><td>Running Time:</td><td>{{movie_check.Runtime}}</td></tr>
            <tr><td>Director:</td><td>{{movie_check.Director}}</td></tr>
            <tr><td>Cast:</td><td>{{movie_check.Actors}}</td></tr>
          </table>
        </div>
      </movie-item>
      <div class="home">
        <router-link v-bind:to="{name: 'home'}">Back to results</router-link>
      </div>
    </div>
  `,
  props: ['movies'],
  computed: {
    movie_check(){
      const movie = this.movies.find((movie) => movie.id === this.$route.params.id);
      return movie ? movie.movie : null;
    }
  },
  components: {
    MovieItem
  }
}