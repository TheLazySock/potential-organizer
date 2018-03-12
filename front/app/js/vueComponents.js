var accountTemplate = new Vue({
  el: '#account-template',
  data: {
    currentView: 'unauth',
  },
  created: function() {
    if (getCookie('loggedIn') == 'auth') {
      this.currentView = 'auth';
    }
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
          '<a href="account" class="header-elem">Account</a>' + 
          '</div>'
      }
  },
})

  // var logoff = new Vue({
  //   el: '#logout-btn',
  //   methods: {
  //     glarkl: function(event) {
  //       fetch('/logout', {  
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       });
  //     }
  //   }
  // })