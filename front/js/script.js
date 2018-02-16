const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let storage = {};
// let port = ':3000';
let url = '';

let signup = new Vue({
  el: '#signup',
  data: {
    email: '',
    username: '',
    name: '',
    surname: '',
    password: '',
    repPassword: '',
  },
  computed: {
    validEmail: function() {
      return PATTERN.test(this.email)
    },
    validName: function() {
      return this.name !== ''
    },
    validSurname: function() {
      return this.surname !== ''
    },
    validUsername: function() {
      return this.username !== ''
    },
    validPassword: function() {
      return this.password === this.repPassword
    },
    emptyPassword: function() {
      return this.password === ''
    },
    isValid: function() {
      if (!this.validEmail ||
        !this.validName ||
        !this.validSurname ||
        !this.validUsername ||
        !this.validPassword ||
        this.emptyPassword) {
        return false;
      } else return true;
    },
  },
  methods: {
    validateForm: function(event) {
			event.preventDefault();
      if (this.isValid) {
        this.formValid = true;
        storage.email = this.email;
        storage.name = this.name;
        storage.surname = this.surname;
        storage.username = this.username;
        storage.password = this.password;
        fetch(url + '/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(storage)
        });

        // localStorage.setItem('currentUserInfo', JSON.stringify(storage));

        // window.location = 'welcome.html';
				setTimeout(function() {window.location = 'welcome.htmp'}, 1000);
      } else { }
    },
  }
})
