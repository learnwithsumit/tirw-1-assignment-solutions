export const productValidationMiddleware = (store) => (next) => (action) => {
  console.log(store, 'store', next, 'next', action, 'action')
  next();
}
