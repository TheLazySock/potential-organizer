if (checkUrl('/login')) {
  let signin = new Vue({
    el: '#signin',
    data: {
      username: '',
      password: '',
      isUsernameValid: '',
      isPasswordValid: ''
    },
    watch: {
      username: function (val, oldVal) {
        this.validateUsername();
      },
      password: function(val, oldVal) {
        this.validatePassword();
      }
    },
    computed: {
      // validEmail: function() {
      //   return PATTERN.test(this.email)
      // },
      isValid: function() {
        if (
          this.isUsernameValid &&
          this.isPasswordValid) {
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