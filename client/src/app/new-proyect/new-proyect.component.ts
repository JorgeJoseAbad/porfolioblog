import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService} from '../services/portfolio.service';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-new-proyect',
  templateUrl: './new-proyect.component.html',
  styleUrls: ['./new-proyect.component.css']
})
export class NewProyectComponent implements OnInit {
  error: string;
  form: Object;

  uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/proyects/`

  });

  newProyecto = {
      title: '',
      content: '',
      imageURL: ''
    };

    feedback: string;

  constructor(private portfolioservice: PortfolioService, private router:Router) { }

  ngOnInit() {
    this.uploader.onSuccessItem = (item, response) => {
        this.feedback = JSON.parse(response).message;
      };

      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
      };
  }

  submit() {
      console.log("funcion submit:");

      this.uploader.onBuildItemForm = (item, form) => {
        form.append('title', this.newProyecto.title);
        form.append('content', this.newProyecto.content);
        console.log(this.newProyecto);

      };
      this.uploader.uploadAll();
      console.log(this.newProyecto);
      this.router.navigate(['portfolio'])

    }

}
