import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { isThisTypeNode } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _authenticatedUser: BehaviorSubject<User | undefined>;

  constructor(private http: HttpClient) {
    this._authenticatedUser = new BehaviorSubject<User | undefined>(undefined);
    this._getUserFromSession();
  }

  private _getUserFromSession(): void {
    if (sessionStorage.getItem('userJWT')) {
      this.retrieveUser(sessionStorage.getItem('userJWT')!).subscribe((user: User) => {
        this.updateUser(user);
      })
    }
  }

  public userNotifier(): Observable<User | undefined> {
    return this._authenticatedUser.asObservable();
  }

  public updateUser(user: User | undefined, token?: string): void {
    this._authenticatedUser.next(user);
    if (token) {
      sessionStorage.setItem('userJWT', token)
    }
  }

  public loginUser(name: string, email: string, password: string): Observable<string> {
    // Temporary code. will be replaced by login call to backend
    // return new Observable((subscribers) => {
    //   let foundUser: boolean = false;
    //   for (let user of this.users) {
    //     if (user.email == email && user.password == password) {
    //       this._updateUser(user, user.email);
    //       subscribers.next(user);
    //       subscribers.complete();
    //       foundUser = true;
    //     }
    //   }
    //   if (!foundUser) {
    //     subscribers.error('User not found');
    //   }
    // })
    return this.http.post('https://webtech.danidipp.com/users/login', { name: name, email: email, password: password}).pipe(map((response: any) => response.token));
  }

  public logoutUser(): boolean {
    sessionStorage.removeItem('userJWT');
    this.updateUser(undefined);
    return true;
  }

  public retrieveUser(token: string): Observable<User> {
    // Temporary code. token is in the meanwhile the email
    // return new Observable<User>((subscribers) => {
    //   let foundUser = false;
    //   for (let user of this.users) {
    //     if (user.email == token) {
    //       subscribers.next(user);
    //       subscribers.complete();
    //       foundUser = true;
    //     }
    //   }
    //   if (!foundUser) {
    //     subscribers.error('User not found');
    //   }
    // })
    return this.http.get('https://webtech.danidipp.com/users', { headers: { Authorization: `Bearer ${token}`}}).pipe(map((response: any) => response.user));
  }

  public registerUser(user: User): Observable<User> {
    // Temporary code. will be replaced by registration call to backend
    // return new Observable((subscribers) => {
    //   for (let currentUser of this.users) {
    //     if (currentUser.email == user.email) {
    //       this._updateUser(user, user.email);
    //       subscribers.next(user);
    //       subscribers.complete();
    //     }
    //   }
    // });
    return this.http.post('https://webtech.danidipp.com/users', user).pipe(map((response: any) => response.user));
  }
}
