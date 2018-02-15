window.onload = function() {
  const PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let storage = {};
  // let port = ':3000';
  let url = '';

  let input = new Vue({
    el: '#input',
    data: {
      name: '',
      surname: '',
      email: '',
      // isValid: false
    },
    computed: {
      validEmail: function() {
        return PATTERN.test(this.email)
      },
      validName: function() {
        return this.name === ''
      },
      validSurname: function() {
        return this.surname === ''
      },
      validateForm: function() {
        if (this.validEmail ||
          !this.validName ||
          !this.validSurname) {
          alert('blablabla');
          console.log('asdasd');
          this.isValid = true;
        }
      },
    },
    methods: {
      validate: function(event) {
        // if (this.validEmail ||
        //   !this.validName ||
        //   !this.validSurname) {
          storage.name = this.name;
          storage.surname = this.surname;
          storage.email = this.email;
          alert(JSON.stringify(storage));
        // }
      },
      submitInfo: function(event) {
        alert(JSON.stringify(storage));
        if (true) {
          fetch(url + '/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(storage)
          });
					setTimeout(function() {}, 500);
        }
        // console.log(storage);
      },
    }
  });
}
