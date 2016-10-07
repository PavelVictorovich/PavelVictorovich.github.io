const api = {
    token: 
        '',
    login: function (email, pass) {
        return fetch('http://tasks.smartjs.academy/login', {
            method: 'post',
            body: JSON.stringify({email: email, password: pass}),
            headers: {'Content-Type': 'application/json'}
        })
    },
    validateEmail: function (email){
        return fetch('http://tasks.smartjs.academy/validate/email', {
            method: 'post',
            body: JSON.stringify({email: email}),
            headers: {'Content-Type': 'application/json'}
        })
    },
    registrationUser: function (email, pass) {
        return fetch('http://tasks.smartjs.academy/users', {
            method: 'post',
            body: JSON.stringify({email: email, password: pass}),
            headers: {'Content-Type': 'application/json'}
        })
    },
    activate: function (userId) {
        return fetch('http://tasks.smartjs.academy/users/' + userId + '/activate', {
            method: 'post',
            headers: {'Authorization': 'Bearer' + ' ' + this.token}
        })
    },
    deactivate: function (userId) {
        return fetch('http://tasks.smartjs.academy/users/' + userId + '/deactivate', {
            method: 'post',
            headers: {'Authorization': 'Bearer' + ' ' + this.token}
        })
    },
    getUsers: function () {
        return fetch('http://tasks.smartjs.academy/users', {
            method: 'get',
            headers: {'Authorization': 'Bearer' + ' ' + this.token}
        })
    }
};

export default api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvYXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGFwaSA9IHtcbiAgICB0b2tlbjogXG4gICAgICAgICcnLFxuICAgIGxvZ2luOiBmdW5jdGlvbiAoZW1haWwsIHBhc3MpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCdodHRwOi8vdGFza3Muc21hcnRqcy5hY2FkZW15L2xvZ2luJywge1xuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7ZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc30pLFxuICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICB2YWxpZGF0ZUVtYWlsOiBmdW5jdGlvbiAoZW1haWwpe1xuICAgICAgICByZXR1cm4gZmV0Y2goJ2h0dHA6Ly90YXNrcy5zbWFydGpzLmFjYWRlbXkvdmFsaWRhdGUvZW1haWwnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtlbWFpbDogZW1haWx9KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgcmVnaXN0cmF0aW9uVXNlcjogZnVuY3Rpb24gKGVtYWlsLCBwYXNzKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnaHR0cDovL3Rhc2tzLnNtYXJ0anMuYWNhZGVteS91c2VycycsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2VtYWlsOiBlbWFpbCwgcGFzc3dvcmQ6IHBhc3N9KSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfVxuICAgICAgICB9KVxuICAgIH0sXG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICh1c2VySWQpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKCdodHRwOi8vdGFza3Muc21hcnRqcy5hY2FkZW15L3VzZXJzLycgKyB1c2VySWQgKyAnL2FjdGl2YXRlJywge1xuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyJyArICcgJyArIHRoaXMudG9rZW59XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbiAodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCgnaHR0cDovL3Rhc2tzLnNtYXJ0anMuYWNhZGVteS91c2Vycy8nICsgdXNlcklkICsgJy9kZWFjdGl2YXRlJywge1xuICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7J0F1dGhvcml6YXRpb24nOiAnQmVhcmVyJyArICcgJyArIHRoaXMudG9rZW59XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBnZXRVc2VyczogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gZmV0Y2goJ2h0dHA6Ly90YXNrcy5zbWFydGpzLmFjYWRlbXkvdXNlcnMnLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdnZXQnLFxuICAgICAgICAgICAgaGVhZGVyczogeydBdXRob3JpemF0aW9uJzogJ0JlYXJlcicgKyAnICcgKyB0aGlzLnRva2VufVxuICAgICAgICB9KVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGFwaTsiXSwiZmlsZSI6IkJhY2tib25lL3NyYy9hcGkuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
