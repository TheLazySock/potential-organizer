if (checkUrl('/account')) {

    Vue.component('user-modal', {
        template: '#user-modal-template'
    })

    var account = new Vue({
        el: '#account',
        data: {
            user_info: [],
            seenEdit: false,
            email: '',
            name: '',
            surname: '',
            sex: '',
            birthday: '',
            phone: '',
            facebook: '',
            vk: '',
            twitter: ''
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
            });

        },
        methods: {
            calcPercent: function() {
                let all = this.user_info.todosAllCount
                let compl = this.user_info.todosCompletedCount

                if (compl > 0) {
                    return (compl/all * 100).toFixed(2);
                } else return 0;
            },
            submitEdited: function() {
                var vm = this;
                dataObject = Object.keys(this.$data); 
                let userdataFieldsKeys = [];
                for (var key in dataObject) {
                    userdataFieldsKeys[key] = dataObject[key];
                }
                userdataFieldsKeys.splice(0, 2);
                var value = {};
                value = userdataFieldsKeys.reduce(function(acc, current) {
                    value[current] = (vm[current]) ? vm[current] : vm.user_info[current];
                    return value;
                }, {});
                if (Object.keys(value).length == 0) {
                    return
                } 
                fetch('/accountinfo', {
                    method: 'PUT',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value)
                })
                .then(function(response) {
                    if (response.status === 200) {
                        window.location = window.location;
                    };
                });
            },
            cancelEdit: function() {
                
                this.seenEdit = false;
            },
        }
    });   

}
