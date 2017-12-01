const PRICE = 9.99;
const LOAD_NUM = 10;

export default {
  name: 'App',
  template: `
    <div v-cloak>
      <div class="header">
        <h1>Vue.js Poster Store</h1>
        <form class="searchbar" v-on:submit.prevent="_onSubmit">
          <input v-model="newSearch" placeholder="Search for posters">
          <input type="submit" value="Search" class="btn">
        </form>
      </div>
      <div class="main">
        <div class="products">
          <div v-if="loading">
            Loading...
          </div>
          <div class="search-results" v-else>
            Found {{results.length}} results for search term {{lastSearch}}
          </div>
          <div class="product" v-for="(item,index) in items">
            <div>
              <div class="product-image"><img v-bind:src="item.link"></div>
            </div>
            <div>
              <h4 class="product-title">{{item.title}}</h4>
              <p>Price: <strong>{{price | currency}}</strong></p>
              <button v-on:click="_addItem(index)" class="add-to-cart btn">Add to cart</button>
            </div>
          </div>
          <div id="product-list-bottom">
  
            <div v-if="_noMoreItems">No more items.</div>
          </div>
        </div>
  
        <div class="cart">
          <h2>Shopping Cart</h2>
          <transition-group name="fade" tag="ul">
            <li class="cart-item" v-for="item in cart" v-bind:key="item.id">
              <div class="item-title">{{item.title}}</div>
              <span class="item-qty">{{item.price | currency}} x {{item.qty}}</span>
              <button class="btn" v-on:click="_inc(item)">+</button>
              <button class="btn" v-on:click="_dec(item)">-</button>
            </li>
          </transition-group>
  
          <transition name="fade">
            <div v-if="cartCount > 0">
              <div>Total: {{total | currency}}</div>
            </div>
          </transition>
          <div v-if="cartCount === 0">
            No items in cart.
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      total: 0,
      items: [],
      results: [],
      cart: {},
      cartCount: 0,
      newSearch: 'anime',
      lastSearch: '',
      loading: false,
      price: PRICE
    }
  },
  computed: {
    _noMoreItems: function(){
      return this.items.length === this.results.length && this.results.length > 0;
    }
  },
  methods: {
    _appendItems: function(){
      if(this.items.length < this.results.length){
        const append = this.results.slice(this.items.length, this.items.length + LOAD_NUM);
        this.items = this.items.concat(append);
      }
    },
    _onSubmit: function(){
      if(this.newSearch.length){
        this.items = [];
        this.loading = true;
        this.$parent.$http.get('/search/'.concat(this.newSearch)).then((res) =>{
          this.lastSearch = this.newSearch;
          this.results = res.data;
          this._appendItems();
          this.loading = false;
        });
      }
    },
    _addItem: function(index){
      this.total += 9.99;
      const item = this.items[index];

      if(!this.cart.hasOwnProperty(item.id)){
        this.cart[item.id] = {id: item.id, title: item.title, qty: 1, price: PRICE};
      }else{
        this.cart[item.id].qty++;
      }
      this.cartCount = Object.keys(this.cart).length;
    },
    _inc: function(item){
      item.qty++;
      this.total += PRICE;
    },
    _dec: function(item){
      item.qty--;
      this.total -= PRICE;
      if(item.qty <= 0){
        delete this.cart[item.id];
        this.cartCount = Object.keys(this.cart).length;
      }
    }
  },
  filters: {
    currency: function(price){
      return '$'.concat(price.toFixed(2));
    }
  },
  mounted: function(){
    const ele = document.getElementById('product-list-bottom');
    const watcher = scrollMonitor.create(ele);
    watcher.enterViewport(() => {
      this._appendItems();
    });
    this._onSubmit()
  }
}
