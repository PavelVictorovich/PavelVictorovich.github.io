import RegistrationView from '../view/registration';
import SuccessView from '../view/successPopup';
import LoginView from '../view/login';
import ConfirmView from '../view/confirmPopup';




export function openRegistrationPopUp(container = 'body'){
    const regPopup = new RegistrationView();
    $(container).append(regPopup.$el);
    regPopup.render();
    return regPopup.promise
        .then(()=>regPopup.closePopUp()
        )
}

export function openSuccessPopUp(container = 'body'){
    const successPopUp = new SuccessView();
    $(container).append(successPopUp.$el);
    successPopUp.render();
    return successPopUp.promise;
}

export function openLoginPopUp(container = 'body'){
    const loginPopUp = new LoginView();
    $(container).append(loginPopUp.$el);
    loginPopUp.render();
    return loginPopUp.promise;
}

export function openConfirmPopUp(container = 'body'){
    const confirmPopup = new ConfirmView();
    $(container).append(confirmPopup.$el);
    confirmPopup.render();
    return confirmPopup.promise
        .then(()=>confirmPopup.closePopUp()
    )
}

export function openPopUp(type, container = 'body'){
    const popup = new type();
    $(container).append(popup.$el);
    popup.render();
    return popup.promise;
}


// const popUpManager = {
//     openRegistrationPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     },
//     openSuccessPopUp: function (container = 'body') {
//         const regPopup = new RegistrationView();
//         $(container).append(regPopup.$el);
//         regPopup.render();
//         return regPopup.promise;
//     }



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvaGVscGVycy9wb3B1cE1hbmFnZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlZ2lzdHJhdGlvblZpZXcgZnJvbSAnLi4vdmlldy9yZWdpc3RyYXRpb24nO1xuaW1wb3J0IFN1Y2Nlc3NWaWV3IGZyb20gJy4uL3ZpZXcvc3VjY2Vzc1BvcHVwJztcbmltcG9ydCBMb2dpblZpZXcgZnJvbSAnLi4vdmlldy9sb2dpbic7XG5pbXBvcnQgQ29uZmlybVZpZXcgZnJvbSAnLi4vdmlldy9jb25maXJtUG9wdXAnO1xuXG5cblxuXG5leHBvcnQgZnVuY3Rpb24gb3BlblJlZ2lzdHJhdGlvblBvcFVwKGNvbnRhaW5lciA9ICdib2R5Jyl7XG4gICAgY29uc3QgcmVnUG9wdXAgPSBuZXcgUmVnaXN0cmF0aW9uVmlldygpO1xuICAgICQoY29udGFpbmVyKS5hcHBlbmQocmVnUG9wdXAuJGVsKTtcbiAgICByZWdQb3B1cC5yZW5kZXIoKTtcbiAgICByZXR1cm4gcmVnUG9wdXAucHJvbWlzZVxuICAgICAgICAudGhlbigoKT0+cmVnUG9wdXAuY2xvc2VQb3BVcCgpXG4gICAgICAgIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5TdWNjZXNzUG9wVXAoY29udGFpbmVyID0gJ2JvZHknKXtcbiAgICBjb25zdCBzdWNjZXNzUG9wVXAgPSBuZXcgU3VjY2Vzc1ZpZXcoKTtcbiAgICAkKGNvbnRhaW5lcikuYXBwZW5kKHN1Y2Nlc3NQb3BVcC4kZWwpO1xuICAgIHN1Y2Nlc3NQb3BVcC5yZW5kZXIoKTtcbiAgICByZXR1cm4gc3VjY2Vzc1BvcFVwLnByb21pc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuTG9naW5Qb3BVcChjb250YWluZXIgPSAnYm9keScpe1xuICAgIGNvbnN0IGxvZ2luUG9wVXAgPSBuZXcgTG9naW5WaWV3KCk7XG4gICAgJChjb250YWluZXIpLmFwcGVuZChsb2dpblBvcFVwLiRlbCk7XG4gICAgbG9naW5Qb3BVcC5yZW5kZXIoKTtcbiAgICByZXR1cm4gbG9naW5Qb3BVcC5wcm9taXNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkNvbmZpcm1Qb3BVcChjb250YWluZXIgPSAnYm9keScpe1xuICAgIGNvbnN0IGNvbmZpcm1Qb3B1cCA9IG5ldyBDb25maXJtVmlldygpO1xuICAgICQoY29udGFpbmVyKS5hcHBlbmQoY29uZmlybVBvcHVwLiRlbCk7XG4gICAgY29uZmlybVBvcHVwLnJlbmRlcigpO1xuICAgIHJldHVybiBjb25maXJtUG9wdXAucHJvbWlzZVxuICAgICAgICAudGhlbigoKT0+Y29uZmlybVBvcHVwLmNsb3NlUG9wVXAoKVxuICAgIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Qb3BVcCh0eXBlLCBjb250YWluZXIgPSAnYm9keScpe1xuICAgIGNvbnN0IHBvcHVwID0gbmV3IHR5cGUoKTtcbiAgICAkKGNvbnRhaW5lcikuYXBwZW5kKHBvcHVwLiRlbCk7XG4gICAgcG9wdXAucmVuZGVyKCk7XG4gICAgcmV0dXJuIHBvcHVwLnByb21pc2U7XG59XG5cblxuLy8gY29uc3QgcG9wVXBNYW5hZ2VyID0ge1xuLy8gICAgIG9wZW5SZWdpc3RyYXRpb25Qb3BVcDogZnVuY3Rpb24gKGNvbnRhaW5lciA9ICdib2R5Jykge1xuLy8gICAgICAgICBjb25zdCByZWdQb3B1cCA9IG5ldyBSZWdpc3RyYXRpb25WaWV3KCk7XG4vLyAgICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQocmVnUG9wdXAuJGVsKTtcbi8vICAgICAgICAgcmVnUG9wdXAucmVuZGVyKCk7XG4vLyAgICAgICAgIHJldHVybiByZWdQb3B1cC5wcm9taXNlO1xuLy8gICAgIH0sXG4vLyAgICAgb3BlblN1Y2Nlc3NQb3BVcDogZnVuY3Rpb24gKGNvbnRhaW5lciA9ICdib2R5Jykge1xuLy8gICAgICAgICBjb25zdCByZWdQb3B1cCA9IG5ldyBSZWdpc3RyYXRpb25WaWV3KCk7XG4vLyAgICAgICAgICQoY29udGFpbmVyKS5hcHBlbmQocmVnUG9wdXAuJGVsKTtcbi8vICAgICAgICAgcmVnUG9wdXAucmVuZGVyKCk7XG4vLyAgICAgICAgIHJldHVybiByZWdQb3B1cC5wcm9taXNlO1xuLy8gICAgIH1cblxuXG4iXSwiZmlsZSI6IkJhY2tib25lL3NyYy9oZWxwZXJzL3BvcHVwTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
