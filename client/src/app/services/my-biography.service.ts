import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {environment} from '../../environments/environment';

@Injectable()
export class MyBiographyService {

  BASE_URL: string = `${environment.baseURL}`;

  constructor(private http: Http) { }

  getBiography(name){
    console.log("in biography service",name); //
    return this.http
    .get(`${this.BASE_URL}/api/biographies/${name}`)

  }

}
