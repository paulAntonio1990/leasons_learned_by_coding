import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './user';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersURL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(this.usersURL + '/users');
  }

  addUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(this.usersURL + '/users', user);
  }

  deleteUser(uId: number): Observable<{}> {
    return this.httpClient.delete(this.usersURL + '/users/' + uId);
  }

  editUser(user: IUser, uid: number): Observable<IUser> {
      return this.httpClient.put<IUser>(this.usersURL + '/users/' + uid, user);
  }

  handleError(handleError: any): import("rxjs").OperatorFunction<IUser[], any> {
    throw new Error("Method not implemented.");
  }

}
