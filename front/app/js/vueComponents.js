var accountTemplate = new Vue({
    el: '#account-template',
    data: {
      currentView: 'unauth'
    },
    created: function() {
      // fetch('/', {
      //   credentials: 'include'
      // })
      // .then(function(res) {
      //   // this.currentView = 'auth';
      //   return res.json();
      // })
      // fetch('/login', {
      //   method: 'GET',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Cookie': 'loggedIn'
      //   },
      // })
      // .then(function(response) {
      //   this.currentView = 'auth';
      // });
      // .then(function(response) {
      //   return response.json
      // })
      // .then(function(myJson) {
      //   console.log(myJson);
      // });
      // console.log('111');
      // if (this.currentView === 'unauth') this.currentView = 'auth'
      // else this.currentView = 'unauth';
    },
    components: {
      unauth: { 
          template: '<div class="second-nav">' + 
            '<a class="header-elem" href="login">Log In</a>' + 
            '<a class="header-elem" href="signup">Sign Up</a>' + 
            '</div>'
        },
      auth: {
          template: '<div class="second-nav">' + 
            '<a href="account.html" class="header-elem">Account</a>' + 
            '</div>'
        }
    }
  })