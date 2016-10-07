import {Collection} from 'backbone';
import api from '../api';


const UserCollection = Collection.extend({
    fetch: function () {
        api.getUsers()
            .then((response)=> {
                return response.json();
            }).then((responseJson)=> {
            this.reset(responseJson.page);
        })
    }
});


export default UserCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvY29sbGVjdGlvbi91c2Vyc0NvbGxlY3Rpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb2xsZWN0aW9ufSBmcm9tICdiYWNrYm9uZSc7XG5pbXBvcnQgYXBpIGZyb20gJy4uL2FwaSc7XG5cblxuY29uc3QgVXNlckNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uLmV4dGVuZCh7XG4gICAgZmV0Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYXBpLmdldFVzZXJzKClcbiAgICAgICAgICAgIC50aGVuKChyZXNwb25zZSk9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlSnNvbik9PiB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KHJlc3BvbnNlSnNvbi5wYWdlKTtcbiAgICAgICAgfSlcbiAgICB9XG59KTtcblxuXG5leHBvcnQgZGVmYXVsdCBVc2VyQ29sbGVjdGlvbjsiXSwiZmlsZSI6IkJhY2tib25lL3NyYy9jb2xsZWN0aW9uL3VzZXJzQ29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
