
if (checkUrl('/signup')) {
  let signup = new Vue({
    el: '#signup',
    data: {
      // email: '',
      username: '',
      // name: '',
      // surname: '',
      password: '',
      repPassword: '',
      isUsernameValid: '',
      isPasswordValid: '',
      isPasswordMatch: ''
    },
    watch: {
      username: function (val, oldVal) {
        this.validateUsername();
      },
      password: function(val, oldVal) {
        this.validatePassword();
      },
      repPassword: function(val, oldVal) {
        this.matchPassword();
      }
    },
    computed: {
      // validEmail: function() {
      //   return PATTERN.test(this.email)
      // },
      // validName: function() {
      //   return this.name !== ''
      // },
      // validSurname: function() {
      //   return this.surname !== ''
      // },
      // validUsername: function() {
      //   return this.username !== ''
      // },
      // validPassword: function() {
      //   return this.password === this.repPassword
      // },
      // emptyPassword: function() {
      //   return this.password === ''
      // },
      isValid: function() {
        if (
          this.isUsernameValid &&
          this.isPasswordValid &&
          this.isPasswordMatch) {
          return true;
        } else return false;
      },
    },
    methods: {
      validateUsername: function() {
        if (this.username !== '') this.isUsernameValid = true
        else this.isUsernameValid = false
      },
      validatePassword: function() {
        if (this.password !== '') this.isPasswordValid = true
        else this.isPasswordValid = false
      },
      matchPassword: function() {
        if (this.password === this.repPassword) this.isPasswordMatch = true
        else this.isPasswordMatch = false
      },
      validateForm: function(event) {
        event.preventDefault();
        if (this.isValid) {
          storage.username = this.username;
          storage.password = this.password;
          fetch(url + '/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(storage)
          })
          .then(function(response) {
            if (response.status === 200) {
              setTimeout(function() {window.location = '/'}, 1000);
            }
          })
        } else { }
      },
    }
  })
}
