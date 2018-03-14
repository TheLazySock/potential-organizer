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

                console.log("all: " + all + "compl: " + compl);
                if (compl > 0) {
                    return all/compl * 100;
                } else return 0;
            },
            submitEdited: function() {
                let value = {};
                if (this.name) {
                    value.name = this.name;
                } else {
                    value.name = this.user_info.name;
                }
                if (this.surname) {
                    value.surname = this.surname;
                } else {
                    value.surname = this.user_info.surname;
                }
                if (this.sex) {
                    value.sex = this.sex;
                } else {
                    value.sex = this.user_info.sex;
                }
                if (this.email) {
                    value.email = this.email;
                } else {
                    value.email = this.user_info.email;
                }
                if (this.phone) {
                    value.phone = this.phone;
                } else {
                    value.phone = this.user_info.phone;
                }
                if (this.birthday) {
                    value.birthday = this.birthday;
                } else {
                    value.birthday = this.user_info.birthday;
                }
                if (this.facebook) {
                    value.facebook = this.facebook;
                } else {
                    value.facebook = this.user_info.facebook;
                }
                if (this.vk) {
                    value.vk = this.vk;
                } else {
                    value.vk = this.user_info.vk;
                }
                if (this.twitter) {
                    value.twitter = this.twitter;
                } else {
                    value.twitter = this.user_info.twitter;
                }
                console.log(value);
                if (Object.keys(value).length == 0) {
                    return
                } else {
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
                } 
            },
            cancelEdit: function() {
                
                this.seenEdit = false;
            },
        }
    });   

}
