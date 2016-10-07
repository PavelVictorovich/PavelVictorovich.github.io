function getUser () {
    const user = sessionStorage.getItem('user') || localStorage.getItem('user');
    if(user){
        return JSON.parse(user);
    }
}

export default getUser; 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvaGVscGVycy9nZXRVc2VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFVzZXIgKCkge1xuICAgIGNvbnN0IHVzZXIgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1c2VyJykgfHwgbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3VzZXInKTtcbiAgICBpZih1c2VyKXtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodXNlcik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBnZXRVc2VyOyAiXSwiZmlsZSI6IkJhY2tib25lL3NyYy9oZWxwZXJzL2dldFVzZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
