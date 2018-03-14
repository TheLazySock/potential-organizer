
if (checkUrl('/signup')) {
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
        if (
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
          setTimeout(function() {window.location = '/'}, 1000);
        } else { }
      },
    }
  })
}
