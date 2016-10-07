const regulars = {
  email: new RegExp('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$'),
  password: new RegExp('[0-9]')
};
export const errorMessages = {
  email:"e-mail isn't valid",
  password:"password isn't valid",
  ALREADY_REGISTERED:"e-mail already registered"
};
export function checkValidation (inputName, val) {
  return regulars[inputName].test(val);
}

export function showError(inputName) {

}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJCYWNrYm9uZS9zcmMvaGVscGVycy9oYW5kbGVFcnJvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgcmVndWxhcnMgPSB7XG4gIGVtYWlsOiBuZXcgUmVnRXhwKCdeKFthLXowLTlfLV0rXFwuKSpbYS16MC05Xy1dK0BbYS16MC05Xy1dKyhcXC5bYS16MC05Xy1dKykqXFwuW2Etel17Miw2fSQnKSxcbiAgcGFzc3dvcmQ6IG5ldyBSZWdFeHAoJ1swLTldJylcbn07XG5leHBvcnQgY29uc3QgZXJyb3JNZXNzYWdlcyA9IHtcbiAgZW1haWw6XCJlLW1haWwgaXNuJ3QgdmFsaWRcIixcbiAgcGFzc3dvcmQ6XCJwYXNzd29yZCBpc24ndCB2YWxpZFwiLFxuICBBTFJFQURZX1JFR0lTVEVSRUQ6XCJlLW1haWwgYWxyZWFkeSByZWdpc3RlcmVkXCJcbn07XG5leHBvcnQgZnVuY3Rpb24gY2hlY2tWYWxpZGF0aW9uIChpbnB1dE5hbWUsIHZhbCkge1xuICByZXR1cm4gcmVndWxhcnNbaW5wdXROYW1lXS50ZXN0KHZhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93RXJyb3IoaW5wdXROYW1lKSB7XG5cbn1cbiJdLCJmaWxlIjoiQmFja2JvbmUvc3JjL2hlbHBlcnMvaGFuZGxlRXJyb3JzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
