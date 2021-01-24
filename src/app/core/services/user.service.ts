import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

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
    return this.http.post(`${environment.backendURL}/users/login`, { name: name, email: email, password: password}).pipe(map((response: any) => response.token));
  }

  public logoutUser(): boolean {
    sessionStorage.removeItem('userJWT');
    this.updateUser(undefined);
    return true;
  }

  public retrieveUser(token: string): Observable<User> {
    return this.http.get(`${environment.backendURL}/users`, { headers: { Authorization: `Bearer ${token}`}}).pipe(map((response: any) => response.user));
  }

  public registerUser(user: User): Observable<User> {
    return this.http.post(`${environment.backendURL}/users`, user).pipe(map((response: any) => response.user));
  }
}
