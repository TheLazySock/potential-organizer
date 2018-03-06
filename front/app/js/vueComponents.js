var accountTemplate = new Vue({
    el: '#account-template',
    data: {
      currentView: 'unauth',
    },
    created: function() {
      // fetch('/')
      // .then(function(res) {
      //   // console.log(res.headers.get("x-auth"));
      //   this.fetchResp = res.headers.get("x-auth").toString();
      //   this.currentView = res.headers.get("x-auth").toString();
      //   console.log(this.fetchResp);
      //   console.log(this.currentView);
      // })
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