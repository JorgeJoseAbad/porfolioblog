import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {PortfolioService} from '../services/portfolio.service';
import {SessionsService} from '../services/sessions.service';

import { Response } from '@angular/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  proyects:Observable<Array<Object>>;
  pageURL:any;
  customHTML:any;
  user:any;

  constructor(
    private activatedroute: ActivatedRoute,
    private portfolioservice: PortfolioService,
    private session:SessionsService) { }

  ngOnInit() {
    this.user=this.session.user; //no used 
  }

  getListProyects(){
    this.portfolioservice.getPorfolio()
      .subscribe((proyects)=>{
        this.proyects=proyects;
        console.log(this.proyects);

      })
    }

// experimental funcion to render the url of a express html from getTemplate()
    rendermyPage(page){
      console.log("rendermyPage");
      console.log(page);
      //window.location.href=page; //this load the url
      window.open(
          page,
          '_blank' // <- This is what makes it open in a new window.
        );

    };

//experimental function to bring a html page defined in back-end to front-end
  getTemplate(proyect){
      this.portfolioservice.getTemplate(proyect)
      .subscribe((response)=>{
        console.log(response); //object Response with headers, ok:true, status:200, url.., _body..
        console.log(response);
        console.log(response.text()); //HTML document, text. <!DOCTYPE html> <html>.....</html>
        this.pageURL=`${response.url}`;
        console.log(this.pageURL); //http://localhost:3000/api/proyects/proyect
        this.rendermyPage(this.pageURL); //send  to custom function to render

      });

    }



}
