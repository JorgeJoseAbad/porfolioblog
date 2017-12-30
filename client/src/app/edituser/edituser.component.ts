import { Component, OnInit } from '@angular/core';
import {SessionsService} from '../services/sessions.service';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

form:any;
user:any;

id:any;

public uploader: FileUploader = new FileUploader({
  url: `http://localhost:3000/users`

});

feedback: string;

  constructor(
    private session:SessionsService
  ) { }


  ngOnInit() {
      this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };

      this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
                 console.log("ImageUpload:uploaded:", item, status, response);
             };

      //2 callbacks to callbacks to get notified in case of upload success or error.
      this.uploader.onSuccessItem = (item, response) => {
          this.feedback = JSON.parse(response).message;
        };
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
      };

      this.user=this.session.user;
      console.log("user is");
      console.log(this.user);


  }

  submit(){
    console.log("on submit");
    console.log(this.user._id);
  
    // crea la carga que va en request aparate de el fichero imagen
    this.uploader.onBuildItemForm = (item, form) => {
          form.append('_id', this.user._id);
        };

    this.uploader.uploadAll();
  }

}
