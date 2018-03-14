var unauth = {
  template: '<div class="second-nav">' +
    '<a class="header-elem" href="login">Log In</a>' +
    '<a class="header-elem" href="signup">Sign Up</a>' +
    '</div>'
};

var auth = {
  template: '<div class="second-nav">' + 
  '<ul class="header-elem dropable-menu">' + 
  '<li><a href="#!">Menu</a>' + 
  '<ul class="submenu">' + 
     '<li><a href="/account">Account</a></li>' + 
     '<li><a href="/logout">Logout</a></li>' + 
  '</ul>' + 
  '</li>' +
  '</ul>' + 
  '</div>'
}

var accountTemplate = new Vue({
  el: '#account-template',
  data: {
    currentView: unauth,
  },
  created: function() {
    if (getCookie('loggedIn') == 'auth') {
      this.currentView = auth;
    }
  },
  methods: {
    logout: function(event) {
      fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    },
  },
})

if (checkUrl('/logout')) {

  var logout = new Vue({
    el: '#logout',
    created: function() {
      setTimeout(function() {
        fetch('/logout', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(function(response) {
          if (response.status === 200) window.location = '/';
        });  
      }, 5000);
    },
  })

}