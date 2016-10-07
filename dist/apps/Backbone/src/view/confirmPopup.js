import PopupView from './popupView';
import confirmPopupTemplate from './confirmPopup.html';

var ConfirmView = PopupView.extend({
    events: {
        "click #confirm": "activateUser",
        //"change input[type=checkbox]": "rememberMe"
    },
    template: confirmPopupTemplate,
    activateUser: function () {
        this.resolve();
    }
});

export default ConfirmView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvdmlldy9jb25maXJtUG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBvcHVwVmlldyBmcm9tICcuL3BvcHVwVmlldyc7XG5pbXBvcnQgY29uZmlybVBvcHVwVGVtcGxhdGUgZnJvbSAnLi9jb25maXJtUG9wdXAuaHRtbCc7XG5cbnZhciBDb25maXJtVmlldyA9IFBvcHVwVmlldy5leHRlbmQoe1xuICAgIGV2ZW50czoge1xuICAgICAgICBcImNsaWNrICNjb25maXJtXCI6IFwiYWN0aXZhdGVVc2VyXCIsXG4gICAgICAgIC8vXCJjaGFuZ2UgaW5wdXRbdHlwZT1jaGVja2JveF1cIjogXCJyZW1lbWJlck1lXCJcbiAgICB9LFxuICAgIHRlbXBsYXRlOiBjb25maXJtUG9wdXBUZW1wbGF0ZSxcbiAgICBhY3RpdmF0ZVVzZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZXNvbHZlKCk7XG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IENvbmZpcm1WaWV3OyJdLCJmaWxlIjoiQmFja2JvbmUvc3JjL3ZpZXcvY29uZmlybVBvcHVwLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
