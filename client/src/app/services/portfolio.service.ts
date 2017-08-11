import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';

@Injectable()
export class PortfolioService {
  BASE_URL: String=environment.baseURL;
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
          .post(`${this.BASE_URL}/api/proyects`, proyect, this.options)
          .map((res) => res.json());
      }


}
