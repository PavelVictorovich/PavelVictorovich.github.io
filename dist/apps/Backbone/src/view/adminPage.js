import {View} from 'backbone';
import adminPageTemplate from './adminPage.html';
import adminItemTemplate from './adminItemTamplate.html';
import {openConfirmPopUp} from '../helpers/popupManager'
import api from '../api';
import getUser from '../helpers/getUser';
import logout from '../helpers/logout';
import UsersCollection from '../collection/usersCollection';



const AdminPageView = View.extend({
    initialize: function () {
        const user = getUser();
        if (!user) {
            window.app.navigate("", {trigger: true});
        } else if (!user.user.isAdmin) {
            window.app.navigate("user", {trigger: true});
        }
        this.getUsersList();

    },
    getUsersList: function () {
        this.collection = new UsersCollection();
        this.collection.fetch();
        this.collection.on('reset', this.render, this);
    },
    render: function (data) {
        this.$el.html(adminPageTemplate);
        const userList = this.$el.find('#userList');
        const documentFragment = $(document.createDocumentFragment());
        data.forEach(i => {
            const item = i.attributes;
            let itemTemplate = $(adminItemTemplate);
            itemTemplate.find('.userEmail').html(item.email);
            itemTemplate.find('.btn').data('userData', {id: item.id, activated: item.activated,});
            itemTemplate.css('border', '1px solid black');
            if (item.activated) {
                itemTemplate.find('input[type=checkbox]').prop('checked', true);
                itemTemplate.css('background', '#7FFF00');
            } else {
                itemTemplate.css('background', 'red');
            }
            documentFragment.html(itemTemplate);
        });
        userList.html(documentFragment);
        return this;

    },
    changeUserActivation: function (event) {
        let activatedId = $(event.target).data('userData').id;
        openConfirmPopUp()
            .then(()=> {
                api.activate(activatedId)
            })
    },
    logout: function(){
        logout();
        this.$el.remove();
    },
    events: {
        "click #logout": 'logout',
        "click .btn": 'changeUserActivation',
    }
});

export default AdminPageView;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvdmlldy9hZG1pblBhZ2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtWaWV3fSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgYWRtaW5QYWdlVGVtcGxhdGUgZnJvbSAnLi9hZG1pblBhZ2UuaHRtbCc7XG5pbXBvcnQgYWRtaW5JdGVtVGVtcGxhdGUgZnJvbSAnLi9hZG1pbkl0ZW1UYW1wbGF0ZS5odG1sJztcbmltcG9ydCB7b3BlbkNvbmZpcm1Qb3BVcH0gZnJvbSAnLi4vaGVscGVycy9wb3B1cE1hbmFnZXInXG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaSc7XG5pbXBvcnQgZ2V0VXNlciBmcm9tICcuLi9oZWxwZXJzL2dldFVzZXInO1xuaW1wb3J0IGxvZ291dCBmcm9tICcuLi9oZWxwZXJzL2xvZ291dCc7XG5pbXBvcnQgVXNlcnNDb2xsZWN0aW9uIGZyb20gJy4uL2NvbGxlY3Rpb24vdXNlcnNDb2xsZWN0aW9uJztcblxuXG5cbmNvbnN0IEFkbWluUGFnZVZpZXcgPSBWaWV3LmV4dGVuZCh7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB1c2VyID0gZ2V0VXNlcigpO1xuICAgICAgICBpZiAoIXVzZXIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hcHAubmF2aWdhdGUoXCJcIiwge3RyaWdnZXI6IHRydWV9KTtcbiAgICAgICAgfSBlbHNlIGlmICghdXNlci51c2VyLmlzQWRtaW4pIHtcbiAgICAgICAgICAgIHdpbmRvdy5hcHAubmF2aWdhdGUoXCJ1c2VyXCIsIHt0cmlnZ2VyOiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRVc2Vyc0xpc3QoKTtcblxuICAgIH0sXG4gICAgZ2V0VXNlcnNMaXN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbiA9IG5ldyBVc2Vyc0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uLmZldGNoKCk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbi5vbigncmVzZXQnLCB0aGlzLnJlbmRlciwgdGhpcyk7XG4gICAgfSxcbiAgICByZW5kZXI6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHRoaXMuJGVsLmh0bWwoYWRtaW5QYWdlVGVtcGxhdGUpO1xuICAgICAgICBjb25zdCB1c2VyTGlzdCA9IHRoaXMuJGVsLmZpbmQoJyN1c2VyTGlzdCcpO1xuICAgICAgICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gJChkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCkpO1xuICAgICAgICBkYXRhLmZvckVhY2goaSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpdGVtID0gaS5hdHRyaWJ1dGVzO1xuICAgICAgICAgICAgbGV0IGl0ZW1UZW1wbGF0ZSA9ICQoYWRtaW5JdGVtVGVtcGxhdGUpO1xuICAgICAgICAgICAgaXRlbVRlbXBsYXRlLmZpbmQoJy51c2VyRW1haWwnKS5odG1sKGl0ZW0uZW1haWwpO1xuICAgICAgICAgICAgaXRlbVRlbXBsYXRlLmZpbmQoJy5idG4nKS5kYXRhKCd1c2VyRGF0YScsIHtpZDogaXRlbS5pZCwgYWN0aXZhdGVkOiBpdGVtLmFjdGl2YXRlZCx9KTtcbiAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgYmxhY2snKTtcbiAgICAgICAgICAgIGlmIChpdGVtLmFjdGl2YXRlZCkge1xuICAgICAgICAgICAgICAgIGl0ZW1UZW1wbGF0ZS5maW5kKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpLnByb3AoJ2NoZWNrZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBpdGVtVGVtcGxhdGUuY3NzKCdiYWNrZ3JvdW5kJywgJyM3RkZGMDAnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbVRlbXBsYXRlLmNzcygnYmFja2dyb3VuZCcsICdyZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50RnJhZ21lbnQuaHRtbChpdGVtVGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgdXNlckxpc3QuaHRtbChkb2N1bWVudEZyYWdtZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICB9LFxuICAgIGNoYW5nZVVzZXJBY3RpdmF0aW9uOiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgbGV0IGFjdGl2YXRlZElkID0gJChldmVudC50YXJnZXQpLmRhdGEoJ3VzZXJEYXRhJykuaWQ7XG4gICAgICAgIG9wZW5Db25maXJtUG9wVXAoKVxuICAgICAgICAgICAgLnRoZW4oKCk9PiB7XG4gICAgICAgICAgICAgICAgYXBpLmFjdGl2YXRlKGFjdGl2YXRlZElkKVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGxvZ291dDogZnVuY3Rpb24oKXtcbiAgICAgICAgbG9nb3V0KCk7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZSgpO1xuICAgIH0sXG4gICAgZXZlbnRzOiB7XG4gICAgICAgIFwiY2xpY2sgI2xvZ291dFwiOiAnbG9nb3V0JyxcbiAgICAgICAgXCJjbGljayAuYnRuXCI6ICdjaGFuZ2VVc2VyQWN0aXZhdGlvbicsXG4gICAgfVxufSk7XG5cbmV4cG9ydCBkZWZhdWx0IEFkbWluUGFnZVZpZXc7XG4iXSwiZmlsZSI6IkJhY2tib25lL3NyYy92aWV3L2FkbWluUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
