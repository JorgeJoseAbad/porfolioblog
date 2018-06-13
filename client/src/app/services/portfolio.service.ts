import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';

import { Response } from '@angular/http';

@Injectable()
export class PortfolioService {
  BASE_URL: String = `${environment.baseURL}`;
  options: Object = {withCredentials:true};

  constructor(private http: Http) { }

  getPorfolio() {
    console.log("en getPorfolio service");
      return this.http
        .get(`${this.BASE_URL}/api/proyects`)
        .map((res) => res.json());
    }

  addNew(proyect) {
      console.log(proyect)
      return this.http
        .post(`${this.BASE_URL}/api/proyects`,proyect,this.options)
        .map((res) => res.json());
    }

  getTemplate(proyectoID){
    console.log(proyectoID);
    return this.http
    .get(`${this.BASE_URL}/api/proyects/${proyectoID}`);

  }

  deleteproyect(proyectoID){
    console.log("en service: ",proyectoID);
    console.log(`${this.BASE_URL}/api/proyects/${proyectoID}`);
    return this.http.delete(`${this.BASE_URL}/api/proyects/${proyectoID}`,this.options);
  }


}
