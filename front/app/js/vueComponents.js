var acountTemplate = new Vue({
    el: '#account-template',
    data: {
      currentView: 'unauth'
    },
    components: {
      unauth: { 
          template: '<div class="second-nav">' + 
            '<a class="header-elem" href="login.html">Log In</a>' + 
            '<a class="header-elem" href="signup.html">Sign Up</a>' + 
            '</div>'
        },
      auth: {
          template: '<div class="second-nav">' + 
            '<a href="account.html" class="header-elem">Account</a>' + 
            '</div>'
        }
    }
  })