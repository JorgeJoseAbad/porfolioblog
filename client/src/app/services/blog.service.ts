import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';

import { Response } from '@angular/http';

@Injectable()
export class BlogService {

  BASE_URL: string = `${environment.baseURL}`;
  options: Object = {withCredentials:true};

  constructor(private http: Http) { }

  getBlog() {
    console.log("en blog service");
      return this.http
        .get(`${this.BASE_URL}/api/blog`)
        .map((res) => res.json());
    }

  addPost(newPost){
    console.log("in addPost"+newPost);
    return this.http
      .post(`${this.BASE_URL}/api/blog`,newPost)
      .map((res) => res.json());
  }


}
