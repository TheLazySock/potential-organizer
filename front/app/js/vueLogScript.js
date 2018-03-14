if (checkUrl('/login')) {
  let signin = new Vue({
    el: '#signin',
    data: {
      username: '',
      password: '',
    },
    computed: {
      validEmail: function() {
        return PATTERN.test(this.email)
      },
      validUsername: function() {
        return this.username !== ''
      },
      emptyPassword: function() {
        return this.password === ''
      },
      isValid: function() {
        if (
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
          storage.username = this.username;
          storage.password = this.password;
          fetch(url + '/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(storage),
          })
          .then(function(response) {
            if (response.status === 200) {
              setTimeout(function() {window.location = '/'}, 1000);
            }
          })
        } else { }
      },
    }
  });  
}