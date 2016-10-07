import PopupView from './popupView';
import loginTemplate from './login.html';
import store from '../index';
import api from '../api';


var LoginView = PopupView.extend({
    events: {
        "submit form": "getUserData",
    },
    template: loginTemplate,
    rememberMe: function (input, user){
        sessionStorage.setItem('user', JSON.stringify(user));
        if(input.is(':checked')){
            localStorage.setItem('user', JSON.stringify(user));
        }
    },
    navigateRoute: function (response) {
        if (response.user.isAdmin) {
            window.app.navigate("admin", {trigger: true});
        } else {
            window.app.navigate("user", {trigger: true});
        }
    },
    getUserData: function (event) {
        event.preventDefault();
        const email = this.$el.find("#email").val();
        const pass = this.$el.find('#password').val();
        const checkbox = this.$el.find("input[type=checkbox]");
        console.log(api.login);
        api.login(email, pass)
            .then(response => {
                return response.json()
            })
            .then((responseJson)=> {
                console.log();
                api.token = responseJson.token;
                this.rememberMe(checkbox, responseJson);
                this.navigateRoute(responseJson);
            });
    }
});

export default LoginView;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvdmlldy9sb2dpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9wdXBWaWV3IGZyb20gJy4vcG9wdXBWaWV3JztcbmltcG9ydCBsb2dpblRlbXBsYXRlIGZyb20gJy4vbG9naW4uaHRtbCc7XG5pbXBvcnQgc3RvcmUgZnJvbSAnLi4vaW5kZXgnO1xuaW1wb3J0IGFwaSBmcm9tICcuLi9hcGknO1xuXG5cbnZhciBMb2dpblZpZXcgPSBQb3B1cFZpZXcuZXh0ZW5kKHtcbiAgICBldmVudHM6IHtcbiAgICAgICAgXCJzdWJtaXQgZm9ybVwiOiBcImdldFVzZXJEYXRhXCIsXG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogbG9naW5UZW1wbGF0ZSxcbiAgICByZW1lbWJlck1lOiBmdW5jdGlvbiAoaW5wdXQsIHVzZXIpe1xuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1c2VyJywgSlNPTi5zdHJpbmdpZnkodXNlcikpO1xuICAgICAgICBpZihpbnB1dC5pcygnOmNoZWNrZWQnKSl7XG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndXNlcicsIEpTT04uc3RyaW5naWZ5KHVzZXIpKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgbmF2aWdhdGVSb3V0ZTogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS51c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICAgIHdpbmRvdy5hcHAubmF2aWdhdGUoXCJhZG1pblwiLCB7dHJpZ2dlcjogdHJ1ZX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2luZG93LmFwcC5uYXZpZ2F0ZShcInVzZXJcIiwge3RyaWdnZXI6IHRydWV9KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0VXNlckRhdGE6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBlbWFpbCA9IHRoaXMuJGVsLmZpbmQoXCIjZW1haWxcIikudmFsKCk7XG4gICAgICAgIGNvbnN0IHBhc3MgPSB0aGlzLiRlbC5maW5kKCcjcGFzc3dvcmQnKS52YWwoKTtcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSB0aGlzLiRlbC5maW5kKFwiaW5wdXRbdHlwZT1jaGVja2JveF1cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGFwaS5sb2dpbik7XG4gICAgICAgIGFwaS5sb2dpbihlbWFpbCwgcGFzcylcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlSnNvbik9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICBhcGkudG9rZW4gPSByZXNwb25zZUpzb24udG9rZW47XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1lbWJlck1lKGNoZWNrYm94LCByZXNwb25zZUpzb24pO1xuICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGVSb3V0ZShyZXNwb25zZUpzb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IExvZ2luVmlldztcbiJdLCJmaWxlIjoiQmFja2JvbmUvc3JjL3ZpZXcvbG9naW4uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
