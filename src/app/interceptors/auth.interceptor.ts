import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Grab the token from the browser's local storage
  const token = localStorage.getItem('token');

  // 2. If the token exists, "clone" the request and add the Authorization header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    // 3. Send the cloned request with the token to the backend
    return next(cloned);
  }

  // 4. If no token, just send the original request (e.g., for Login/Register)
  return next(req);
};