// const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// let storage = {};
// // let port = ':3000';
// let url = '';

let signin = new Vue({
  el: '#signin',
  data: {
    email: '',
    password: '',
  },
  computed: {
    validEmail: function() {
      return PATTERN.test(this.email)
    },
    emptyPassword: function() {
      return this.password === ''
    },
    isValid: function() {
      if (!this.validEmail ||
        !this.validUsername ||
        this.emptyPassword) {
        return false;
      } else return true;
    },
  },
  methods: {
    validateForm: function(event) {
        event.preventDefault();
        if (this.isValid) {
            fetch(url + '/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(storage)
            });
		    setTimeout(function() {window.location = 'index.html'}, 1000);
      } else { }
    },
  }
})
