window.onload = function() {
  let storage = {};
	let port = ':3000';
	let url = '127.0.0.1' + port;

  let input = new Vue({
    el: '#input',
    data: {
			name: '',
			surname: ''
    },
    methods: {
			clog: function(event) {
				console.log('11');
			},
      submitInfo: function(event) {
				storage.name = this.name;
				storage.surname = this.surname
        fetch(url + '/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify(storage)
        });
				// console.log(storage);
				// alert(storage);
      },
    }
  });
}
