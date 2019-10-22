import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';


const routes = {
  login: () => `http://localhost:8000/login`,
};

export interface UserContext {
  id: number;
  email: string;
}

export interface LoginContext {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  /**
   * Method to login user to the system.
   *
   * @param context - Login context containing the username and the password.
   */
  login(context: LoginContext) {
    return this.httpClient
      .post(routes.login(),
        'email=' + context.email +
        '&password=' + context.password,
        {
          headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
        }
      )
      .pipe(
        map((body: any) => body),
        catchError(() => of('Error, could not login user'))
      );
  }
}
