import HomePageView from './view/homePage';
import AdminPageView from './view/adminPage';
import {Router, history} from 'backbone';
import  Store from './store/store'
import getUser from './helpers/getUser';
import api from './api';


const store = new Store();

const AppRouter = Router.extend({
    initialize: function () {
        if(getUser()){
            api.token = getUser().token;
        }
    },
    routes: {
        '': 'createHomePage',
        'admin': 'createAdminPage',
        'user': 'createUserPage'
    },
    body: $("body"),
    createHomePage: function () {
        const homePage = new HomePageView();
        this.body.css("overflow", "auto");
        this.body.append(homePage.$el);
        homePage.render();

    },
    createAdminPage: function () {
        const adminPage = new AdminPageView();
        this.body.html(adminPage.$el);
        //adminPage.render();
    },
    // createUserPage: function () {
    //     const userPage = new AdminPageView();
    //     this.body.html(adminPage.$el);
    //     adminPage.render();
    // }

});


window.app = new AppRouter();

export default store;
history.start();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhvbWVQYWdlVmlldyBmcm9tICcuL3ZpZXcvaG9tZVBhZ2UnO1xuaW1wb3J0IEFkbWluUGFnZVZpZXcgZnJvbSAnLi92aWV3L2FkbWluUGFnZSc7XG5pbXBvcnQge1JvdXRlciwgaGlzdG9yeX0gZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0ICBTdG9yZSBmcm9tICcuL3N0b3JlL3N0b3JlJ1xuaW1wb3J0IGdldFVzZXIgZnJvbSAnLi9oZWxwZXJzL2dldFVzZXInO1xuaW1wb3J0IGFwaSBmcm9tICcuL2FwaSc7XG5cblxuY29uc3Qgc3RvcmUgPSBuZXcgU3RvcmUoKTtcblxuY29uc3QgQXBwUm91dGVyID0gUm91dGVyLmV4dGVuZCh7XG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZihnZXRVc2VyKCkpe1xuICAgICAgICAgICAgYXBpLnRva2VuID0gZ2V0VXNlcigpLnRva2VuO1xuICAgICAgICB9XG4gICAgfSxcbiAgICByb3V0ZXM6IHtcbiAgICAgICAgJyc6ICdjcmVhdGVIb21lUGFnZScsXG4gICAgICAgICdhZG1pbic6ICdjcmVhdGVBZG1pblBhZ2UnLFxuICAgICAgICAndXNlcic6ICdjcmVhdGVVc2VyUGFnZSdcbiAgICB9LFxuICAgIGJvZHk6ICQoXCJib2R5XCIpLFxuICAgIGNyZWF0ZUhvbWVQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGhvbWVQYWdlID0gbmV3IEhvbWVQYWdlVmlldygpO1xuICAgICAgICB0aGlzLmJvZHkuY3NzKFwib3ZlcmZsb3dcIiwgXCJhdXRvXCIpO1xuICAgICAgICB0aGlzLmJvZHkuYXBwZW5kKGhvbWVQYWdlLiRlbCk7XG4gICAgICAgIGhvbWVQYWdlLnJlbmRlcigpO1xuXG4gICAgfSxcbiAgICBjcmVhdGVBZG1pblBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgYWRtaW5QYWdlID0gbmV3IEFkbWluUGFnZVZpZXcoKTtcbiAgICAgICAgdGhpcy5ib2R5Lmh0bWwoYWRtaW5QYWdlLiRlbCk7XG4gICAgICAgIC8vYWRtaW5QYWdlLnJlbmRlcigpO1xuICAgIH0sXG4gICAgLy8gY3JlYXRlVXNlclBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgICAgY29uc3QgdXNlclBhZ2UgPSBuZXcgQWRtaW5QYWdlVmlldygpO1xuICAgIC8vICAgICB0aGlzLmJvZHkuaHRtbChhZG1pblBhZ2UuJGVsKTtcbiAgICAvLyAgICAgYWRtaW5QYWdlLnJlbmRlcigpO1xuICAgIC8vIH1cblxufSk7XG5cblxud2luZG93LmFwcCA9IG5ldyBBcHBSb3V0ZXIoKTtcblxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7XG5oaXN0b3J5LnN0YXJ0KCk7XG4iXSwiZmlsZSI6IkJhY2tib25lL3NyYy9pbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
