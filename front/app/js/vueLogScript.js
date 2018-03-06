if (checkUrl('/login')) {
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
          this.emptyPassword) {
          return false;
        } else return true;
      },
    },
    methods: {
      validateForm: function(event) {
        event.preventDefault();
        if (this.isValid) {
          storage.email = this.email;
          storage.password = this.password;
          fetch(url + '/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(storage),
          })
          setTimeout(function() {window.location = '/'}, 1000);
        } else { }
      },
    }
  });  
}