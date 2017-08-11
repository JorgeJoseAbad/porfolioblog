import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment} from '../../environments/environment';

export interface User{
  _id:string,
  username:string,
  password:string,
  email:string
}

@Injectable()
export class SessionsService {
  user:User; // The current logged in user
  startLoginCompleted:boolean = false;
  BASE_URL:string=`${environment.baseURL}/api`;
  options:Object = {withCredentials:true};


  constructor(private http: Http) {
    this.isLoggedIn().subscribe( (user:User) =>{
        console.log(`Welcome again user ${user.username}`)
        this.user = user;
        this.startLoginCompleted = true;
      }, e => this.startLoginCompleted = true);
    }

    signup(user:User):Observable<User>{
      return this.http.post(`${this.BASE_URL}/signup`, user, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    };

    handleError(e) {
      console.error("Error en la llamada a la API");
      return Observable.throw(e.json().message);
    }

    isLoggedIn():Observable<User>{
      return this.http.post(`${this.BASE_URL}/loggedin`, this.options)
        .map(res => {
          this.user = res.json();
          return this.user;
        })
        .catch(this.handleError);
    }
    
    login(username:string, password:string):Observable<User> {
      return this.http.post(`${this.BASE_URL}/login`, {username,password}, this.options)
        .map(res => {
          this.user = res.json();
          return this.user;
        })
        .catch(this.handleError);
    }
}
