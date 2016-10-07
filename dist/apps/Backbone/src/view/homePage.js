import { View } from 'backbone';
import homePageTemplate from './homePage.html'
import { openRegistrationPopUp, openSuccessPopUp, openLoginPopUp } from '../helpers/popupManager';
import getUser from '../helpers/getUser';

const homePageView = View.extend({
  initialize: function() {
    const user = getUser();
    if(!user){
      return;
    }
    if (user.user.isAdmin) {
      window.app.navigate("admin", {trigger: true});
    } else {
      window.app.navigate("user", {trigger: true});
    }
  },
  render: function() {
    this.$el.html(homePageTemplate);
    return this;
  },
  events:{
    "click #registration":'openRegPopUp',
    "click #login":'openLogPopUp'
  },
  openRegPopUp: function(){
    openRegistrationPopUp()
        .then(()=>{
          openSuccessPopUp()
          });
        //.catch(function(){alert(123)});
  },
  openLogPopUp: function () {
    openLoginPopUp();
  }
  });

export default homePageView;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvdmlldy9ob21lUGFnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWV3IH0gZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IGhvbWVQYWdlVGVtcGxhdGUgZnJvbSAnLi9ob21lUGFnZS5odG1sJ1xuaW1wb3J0IHsgb3BlblJlZ2lzdHJhdGlvblBvcFVwLCBvcGVuU3VjY2Vzc1BvcFVwLCBvcGVuTG9naW5Qb3BVcCB9IGZyb20gJy4uL2hlbHBlcnMvcG9wdXBNYW5hZ2VyJztcbmltcG9ydCBnZXRVc2VyIGZyb20gJy4uL2hlbHBlcnMvZ2V0VXNlcic7XG5cbmNvbnN0IGhvbWVQYWdlVmlldyA9IFZpZXcuZXh0ZW5kKHtcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24oKSB7XG4gICAgY29uc3QgdXNlciA9IGdldFVzZXIoKTtcbiAgICBpZighdXNlcil7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh1c2VyLnVzZXIuaXNBZG1pbikge1xuICAgICAgd2luZG93LmFwcC5uYXZpZ2F0ZShcImFkbWluXCIsIHt0cmlnZ2VyOiB0cnVlfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdpbmRvdy5hcHAubmF2aWdhdGUoXCJ1c2VyXCIsIHt0cmlnZ2VyOiB0cnVlfSk7XG4gICAgfVxuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGVsLmh0bWwoaG9tZVBhZ2VUZW1wbGF0ZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGV2ZW50czp7XG4gICAgXCJjbGljayAjcmVnaXN0cmF0aW9uXCI6J29wZW5SZWdQb3BVcCcsXG4gICAgXCJjbGljayAjbG9naW5cIjonb3BlbkxvZ1BvcFVwJ1xuICB9LFxuICBvcGVuUmVnUG9wVXA6IGZ1bmN0aW9uKCl7XG4gICAgb3BlblJlZ2lzdHJhdGlvblBvcFVwKClcbiAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICBvcGVuU3VjY2Vzc1BvcFVwKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgLy8uY2F0Y2goZnVuY3Rpb24oKXthbGVydCgxMjMpfSk7XG4gIH0sXG4gIG9wZW5Mb2dQb3BVcDogZnVuY3Rpb24gKCkge1xuICAgIG9wZW5Mb2dpblBvcFVwKCk7XG4gIH1cbiAgfSk7XG5cbmV4cG9ydCBkZWZhdWx0IGhvbWVQYWdlVmlldztcbiJdLCJmaWxlIjoiQmFja2JvbmUvc3JjL3ZpZXcvaG9tZVBhZ2UuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
