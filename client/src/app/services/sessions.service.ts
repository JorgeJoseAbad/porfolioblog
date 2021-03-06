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
  USERS_URL:string=`${environment.baseURL}`;
  options:Object = {withCredentials:true};


  constructor(private http: Http) {
    this.isLoggedIn().subscribe( (user:User) =>{
      console.log("this is: ",this);
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
      console.log(e.json().message);
      return Observable.throw(e.json().message);
    }

    isLoggedIn():Observable<User>{
      console.log("estamos en SessionsService isLoggedIn");
      return this.http.post(`${this.BASE_URL}/loggedin`, this.options)
        .map(res => {
          this.user = res.json();
          return this.user;
        })
        .catch(this.handleError);
    }

    login(username:string, password:string):Observable<User> {
      console.log(`${this.BASE_URL}/login`);
      return this.http.post(`${this.BASE_URL}/login`, {username,password}, this.options)
        .map(res => {
          this.user = res.json();
          return this.user;
        })
        .catch(this.handleError);
    }

    logout(){
      console.log("logout service");
      return this.http.post(`${this.BASE_URL}/logout`,{},this.options )
        .map(res => {
                      res.json();
                      console.log(res.json());
                      this.user=null; //destroy this session user
                    })
        .catch(this.handleError);
    }
}
