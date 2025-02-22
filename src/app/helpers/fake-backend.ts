import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/getuserbymail') && method === 'POST':
                    return getuserbymail();
                case url.endsWith('/users/register') && method === 'POST':
                    return register();
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                case url.match(/\/users\/\d+$/) && method === 'DELETE':
                    return deleteUser();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function register() {
            const user = body

            if (users.find(x => x.username === user.username)) {
                return error('Username "' + user.username + '" is already taken')
            }

            user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));

            return ok();
        }

        function authenticate() {
            const { email, password } = body;
            const user = users.find(x => x.email === email && x.password === password);
            if (!user) return error('email or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                phone: user.phone,
                token: 'fake-jwt-token'
            })
        }


        function getuserbymail() {
            
            const {email} = body;
            console.log('It gets here too :::',email);
            const user = users.find(x => x.email === email);
            if (!user) return error('email  is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                name: user.name,
                email: user.email,
                phone: user.phone,
                token: 'fake-jwt-token'
            })
        }


        function changePassword(){

            const{ id, email} = body;
            const user = users.find(x => x.email === email && x.id === id);
            if (!user) {return error('email  is incorrect');}
           else{
            let newPassword = Math.random().toString(36).substring(7);
            console.log("random", newPassword);
               
           }
           return ok({

            id: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.newPassword,
            token: 'fake-jwt-token'
        })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            const user = users.find(x => x.id == idFromUrl());
            return ok(user);
        }

        function getUserByEmail() {
            //if (!isLoggedIn()) return unauthorized();
            console.log('i got here::::::::: toooo',users.email);
            const user = body

            if (users.find(x => x.email === user.email)) {
                
                return ok({
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    token: 'fake-jwt-token'
                })

            }
        }

       

        function deleteUser() {
            if (!isLoggedIn()) return unauthorized();

            users = users.filter(x => x.id !== idFromUrl());
            localStorage.setItem('users', JSON.stringify(users));
            return ok();
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};