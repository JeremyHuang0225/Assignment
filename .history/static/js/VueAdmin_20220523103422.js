Vue.component('loading', VueLoading);
var app = new Vue({
    delimiters: ["[[", "]]"],
    el: '#app',
    data() {
        return {
            preparelist: [],
            finishlist: [],
            buttondisable:false,
            isloding: false,
            valueIsNull: false,
            timedifference:new Date().getTimezoneOffset()*-60*1000, //自動判斷服務端與 UTC 時區差加以計算出總毫秒
        };
    },
    created() {
        document.onkeydown = function () {
            //禁止 F7
            if (window.event && window.event.keyCode == 118) {
                event.keyCode = 0;
                event.returnValue = false;
            }
            //禁止 F12
            else if (window.event && window.event.keyCode == 123) {
                event.keyCode = 0;
                event.returnValue = false;
            }
        },
            document.oncontextmenu = function (e) {
                var evt = e || window.event;
                evt.returnValue = false;
                return false;
            },
            document.body.onselectstart = function () {
                self.event.returnValue = false
            }
        //app.GetTodolist();
    },
    components: {
        Loading: VueLoading
    },
    //所有function寫在裡面
    methods: {
        GetTodolistprepare: function () {
            $.ajax({
                url: '/todolistprepare/',
                success: function (res) {
                    app.preparelist = res
                }
            });
        },
        GetTodolistfinish: function () {
            $.ajax({
                url: '/todolist/',
                success: function (res) {
                    app.finishlist = res
                }
            });
        },
        finishsubmit: function (id) {
            $.ajax({
                type: "GET",
                url: "/todolistfinishupdate/",
                dataType: "json",
                data: {
                    "id": id,
                },
                success: function (res) {
                    app.GetTodolistprepare()
                }
            })
        },
        removesubmit: function (id) {
            $.ajax({
                type: "GET",
                url: "/todolistremoveupdate/",
                dataType: "json",
                data: {
                    "id": id,
                },
                success: function (res) {
                    app.GetTodolistprepare()
                }
            })
        },
        inputchange: function () {
            const InputValue = this.$refs.getContentValue.value;
            if (InputValue === ""){
                app.valueIsNull = true
                app.buttondisable = true
                this.$refs.getContentValue.style.border = "1px solid red"
            }else{
                app.buttondisable = false
                app.valueIsNull = false
                this.$refs.getContentValue.style.border = "1px solid rgb(231, 231, 231)"
            }
        },
        ContentSubmit: function (title) {
            const InputValue = this.$refs.getContentValue.value;
            if (InputValue === "") {
                app.valueIsNull = true
                app.buttondisable = true
                this.$refs.getContentValue.style.border = "1px solid red"
            } else {
                const value = this.$refs.getContentValue.value
                this.$refs.getContentValue.style.border = "1px solid rgb(231, 231, 231)"
                app.valueIsNull = false
                app.buttondisable = true
                app.isloding = true
                this.$refs.getContentValue.value = ""
                this.$refs.getContentValue.disable = true
                
                app.valueIsNull = false
                $.ajax({
                    type: "POST",
                    url: "/todolistcreate/",
                    dataType: "json",
                    data: {
                        "title": InputValue,
                    },
                    success: function (res) {
                        
                    }
                })
                setTimeout(() => {
                    app.isloding = false
                    app.buttondisable = false
                    app.GetTodolistprepare()
                }, 2500);
            }
            setTimeout(() => {
                this.$refs.getContentValue.value = ""
                this.$refs.getContentValue.disable = false
                this.$refs.getContentValue.style.border = InputBorder
                app.valueIsNull = false
            }, 2000);
            // app.isloding = true;
            // $("#content-input-submit").css("display","none")

        },
        //把你寫換算時間的丟進來
        reversedMessage: function (updated_at) {
            var timestr = String()
            const nowDate = Date.parse(new Date()) + app.timedifference;
            const regionDate = Date.parse(updated_at) + app.timedifference;
            const difference_time = (nowDate - regionDate) / 1000
            switch (true) {
                case (difference_time < 60): {
                    timestr = (Math.floor(difference_time)).toString() + " 秒鐘前";
                    break;
                }
                case difference_time >= 60 && difference_time < 3600: {
                    timestr = (Math.floor(difference_time / 60)).toString() + " 分鐘前";
                    break;
                }
                case difference_time >= 3600 && difference_time < 86400: {
                    timestr = (Math.floor(difference_time / 3600)).toString() + " 小時前";
                    break;
                }
                case (difference_time > 86400): {
                    const chars = (updated_at).toString().split('T');
                    timestr = chars[0];
                    break;
                }
            }
            return timestr
        },
        removebutton: function (id, title) {
            Swal.fire({
                title: '提示',
                text: "是否移除 『" + title + "』 ?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確定移除',
                cancelButtonText: '取消'
            }).then((result) => {
                if (result.isConfirmed) {
                    app.removesubmit(id[0][0]);
                    Swal.fire(
                        '完成移除',
                        '『' + title + "』",
                        'success'
                    )
                }
            })
        },
        finnshbutton: function (id, title) {
            Swal.fire({
                title: '提示',
                text: "是否完成 『" + title + "』 ?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '確定完成',
                cancelButtonText: '取消'
            }).then((result) => {
                if (result.isConfirmed) {
                    app.finishsubmit(id[0][0]);
                    Swal.fire(
                        '完成',
                        '『' + title + "』",
                        'success'
                    )
                }
            })
        },
    },
    mounted() {
        //自动加载convert方法
        this.GetTodolistprepare();
    }

});