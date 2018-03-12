if (checkUrl('/account')) {

    var account = new Vue({
        el: '#account',
        data: {
            user_info: []
        },
        created: function(event) {
            fetch('/accountinfo', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                account.user_info = data;
            })
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
        }
    });   

}
