import PopupView from './popupView';
import registrationTemplate from './registration.html';
import {checkValidation, errorMessages} from '../helpers/handleErrors'
import api from '../api';

var RegistrationView = PopupView.extend({
    events: {
        "submit form": "validateFormValues",
        "blur input": "handleEvent",

    },
    template: registrationTemplate,
    validateFormValues: function (event) {
        event.preventDefault();
        const email = this.$el.find("#email").val();
        const pass = this.$el.find('#password').val();
        api.validateEmail(email)
            .then(response => {
                return response.json()})
            .then((responseJson)=> {
                if (responseJson.success) {
                    api.registrationUser(email, pass)
                        .then(()=>{
                            this.resolve(this);
                        })
                } else {
                    this.showErrorFromServer(responseJson.errors); 
                }
            });
        // const passConf = this.$el.find('#confirm-password').val();
        // if (reg.test(pass) && pass === passConf && pass.length >= 6 && correctMail(email)) {
        //     event.preventDefault();
        //     fetch('http://tasks.smartjs.academy/validate/email', {
        //         method: 'post',
        //         body: JSON.stringify({email: email}),
        //         headers: {'Content-Type': 'application/json'}
        //     })
        //         .then(response => response.json())
        //         .then((response)=> {
        //             if (response.success) {
        //                 fetch('http://tasks.smartjs.academy/users', {
        //                     method: 'post',
        //                     body: JSON.stringify({email: email, password: pass}),
        //                     headers: {'Content-Type': 'application/json'}
        //                 })
        //                     .then((response) => {
        //                         this.resolve();
        //                     })
        //             }
        //         })
        // } else {
        //     if (!(reg.test(pass) && pass === passConf && pass.length >= 6)) {
        //         $(":password").css("outline", "2px solid red")
        //         event.preventDefault();
        //     }
        //     if (!correctMail(this.$el.find("#email").val())) {
        //         $("input[name='email']").css("outline", "2px solid red")
        //         event.preventDefault();
        //     }
        // }

    },
    handleEvent: function (event) {
        const flagError = checkValidation(event.target.name, event.target.value);
        if (!flagError) {
            this.showError(event.target.name)
        } else {
            this.hideError(event.target.name)
        }
    },
    showError: function (name, error) {
        this.$el.find('span[data-' + name + ']').html(errorMessages[error || name]).fadeIn();
    },
    showErrorFromServer: function (errors) {
        for (let key in errors){
            if(errors.hasOwnProperty(key)){
                this.showError(key, errors.email);
            }
        }
    },
    hideError: function (name) {
        this.$el.find('span[data-' + name + ']').html('').fadeOut();
    }
});

export default RegistrationView;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvdmlldy9yZWdpc3RyYXRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvcHVwVmlldyBmcm9tICcuL3BvcHVwVmlldyc7XG5pbXBvcnQgcmVnaXN0cmF0aW9uVGVtcGxhdGUgZnJvbSAnLi9yZWdpc3RyYXRpb24uaHRtbCc7XG5pbXBvcnQge2NoZWNrVmFsaWRhdGlvbiwgZXJyb3JNZXNzYWdlc30gZnJvbSAnLi4vaGVscGVycy9oYW5kbGVFcnJvcnMnXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaSc7XG5cbnZhciBSZWdpc3RyYXRpb25WaWV3ID0gUG9wdXBWaWV3LmV4dGVuZCh7XG4gICAgZXZlbnRzOiB7XG4gICAgICAgIFwic3VibWl0IGZvcm1cIjogXCJ2YWxpZGF0ZUZvcm1WYWx1ZXNcIixcbiAgICAgICAgXCJibHVyIGlucHV0XCI6IFwiaGFuZGxlRXZlbnRcIixcblxuICAgIH0sXG4gICAgdGVtcGxhdGU6IHJlZ2lzdHJhdGlvblRlbXBsYXRlLFxuICAgIHZhbGlkYXRlRm9ybVZhbHVlczogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGVtYWlsID0gdGhpcy4kZWwuZmluZChcIiNlbWFpbFwiKS52YWwoKTtcbiAgICAgICAgY29uc3QgcGFzcyA9IHRoaXMuJGVsLmZpbmQoJyNwYXNzd29yZCcpLnZhbCgpO1xuICAgICAgICBhcGkudmFsaWRhdGVFbWFpbChlbWFpbClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpfSlcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZUpzb24pPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZUpzb24uc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBhcGkucmVnaXN0cmF0aW9uVXNlcihlbWFpbCwgcGFzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dFcnJvckZyb21TZXJ2ZXIocmVzcG9uc2VKc29uLmVycm9ycyk7IFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyBjb25zdCBwYXNzQ29uZiA9IHRoaXMuJGVsLmZpbmQoJyNjb25maXJtLXBhc3N3b3JkJykudmFsKCk7XG4gICAgICAgIC8vIGlmIChyZWcudGVzdChwYXNzKSAmJiBwYXNzID09PSBwYXNzQ29uZiAmJiBwYXNzLmxlbmd0aCA+PSA2ICYmIGNvcnJlY3RNYWlsKGVtYWlsKSkge1xuICAgICAgICAvLyAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gICAgIGZldGNoKCdodHRwOi8vdGFza3Muc21hcnRqcy5hY2FkZW15L3ZhbGlkYXRlL2VtYWlsJywge1xuICAgICAgICAvLyAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAvLyAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtlbWFpbDogZW1haWx9KSxcbiAgICAgICAgLy8gICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ31cbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgICAvLyAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmZXRjaCgnaHR0cDovL3Rhc2tzLnNtYXJ0anMuYWNhZGVteS91c2VycycsIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7ZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc30pLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfVxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNvbHZlKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgIC8vICAgICBpZiAoIShyZWcudGVzdChwYXNzKSAmJiBwYXNzID09PSBwYXNzQ29uZiAmJiBwYXNzLmxlbmd0aCA+PSA2KSkge1xuICAgICAgICAvLyAgICAgICAgICQoXCI6cGFzc3dvcmRcIikuY3NzKFwib3V0bGluZVwiLCBcIjJweCBzb2xpZCByZWRcIilcbiAgICAgICAgLy8gICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgaWYgKCFjb3JyZWN0TWFpbCh0aGlzLiRlbC5maW5kKFwiI2VtYWlsXCIpLnZhbCgpKSkge1xuICAgICAgICAvLyAgICAgICAgICQoXCJpbnB1dFtuYW1lPSdlbWFpbCddXCIpLmNzcyhcIm91dGxpbmVcIiwgXCIycHggc29saWQgcmVkXCIpXG4gICAgICAgIC8vICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgfSxcbiAgICBoYW5kbGVFdmVudDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IGZsYWdFcnJvciA9IGNoZWNrVmFsaWRhdGlvbihldmVudC50YXJnZXQubmFtZSwgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgaWYgKCFmbGFnRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0Vycm9yKGV2ZW50LnRhcmdldC5uYW1lKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oaWRlRXJyb3IoZXZlbnQudGFyZ2V0Lm5hbWUpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNob3dFcnJvcjogZnVuY3Rpb24gKG5hbWUsIGVycm9yKSB7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJ3NwYW5bZGF0YS0nICsgbmFtZSArICddJykuaHRtbChlcnJvck1lc3NhZ2VzW2Vycm9yIHx8IG5hbWVdKS5mYWRlSW4oKTtcbiAgICB9LFxuICAgIHNob3dFcnJvckZyb21TZXJ2ZXI6IGZ1bmN0aW9uIChlcnJvcnMpIHtcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGVycm9ycyl7XG4gICAgICAgICAgICBpZihlcnJvcnMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93RXJyb3Ioa2V5LCBlcnJvcnMuZW1haWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbiAgICBoaWRlRXJyb3I6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHRoaXMuJGVsLmZpbmQoJ3NwYW5bZGF0YS0nICsgbmFtZSArICddJykuaHRtbCgnJykuZmFkZU91dCgpO1xuICAgIH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBSZWdpc3RyYXRpb25WaWV3O1xuIl0sImZpbGUiOiJCYWNrYm9uZS9zcmMvdmlldy9yZWdpc3RyYXRpb24uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
