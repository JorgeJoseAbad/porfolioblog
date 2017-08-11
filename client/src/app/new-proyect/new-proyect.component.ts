import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService} from '../services/portfolio.service';

@Component({
  selector: 'app-new-proyect',
  templateUrl: './new-proyect.component.html',
  styleUrls: ['./new-proyect.component.css']
})
export class NewProyectComponent implements OnInit {
  error: string;
  form: Object;
  constructor(private portfolioservice: PortfolioService, private router:Router) { }

  ngOnInit() {
  }

  newProyect(form){
    this.portfolioservice.addNew(form.value)
      .subscribe(
        (thread) => {
          console.log(thread);
          console.log(thread._id);
          this.router.navigate([''])
        },
        (err) => this.error = err
      );
  }

}
