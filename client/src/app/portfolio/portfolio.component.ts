import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import {PortfolioService} from '../services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  proyects:Observable<Array<Object>>;

  constructor(
    private route: ActivatedRoute,
    private portfolioservice: PortfolioService) { }

  ngOnInit() {
  }

  getListProyects(){
    this.portfolioservice.getPorfolio()
      .subscribe((proyects)=>{
        this.proyects=proyects;
        console.log(this.proyects);

      })

  }

}
