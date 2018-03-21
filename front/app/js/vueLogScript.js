if (checkUrl('/login')) {
  let signin = new Vue({
    el: '#signin',
    data: {
      username: '',
      password: '',
      isUsernameValid: '',
      isPasswordValid: '',
      usernameWarn: '',
      passwordWarn: ''
    },
    watch: {
      // username: function (val, oldVal) {
      //   this.validateUsername();
      // },
      // password: function(val, oldVal) {
      //   this.validatePassword();
      // }
    },
    computed: {
      // validEmail: function() {
      //   return PATTERN.test(this.email)
      // },
      isValid: function() {
        return (this.isUsernameValid && this.isPasswordValid)
      },
    },
    methods: {
      validateUsername: function() {
        if (this.username === '') {
          this.usernameWarn = 'Username is empty';
          return this.isUsernameValid = false;
        } 
        else {
          this.isUsernameValid = true;
          this.usernameWarn = '';
        }
      },
      validatePassword: function() {
        if (this.password === '') {
          this.passwordWarn = 'Password is empty';
          return this.isPasswordValid = false;
        }
        if (this.password.length < 6) {
          this.passwordWarn = 'Password is less than 6 symbols';
          return this.isPasswordValid = false;
        }
        else {
          this.isPasswordValid = true;
          this.passwordWarn = '';
        }
      },
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
          .catch(function(error) {
            console.log(error);   
          })
        } else { }
      },
    }
  });  
}