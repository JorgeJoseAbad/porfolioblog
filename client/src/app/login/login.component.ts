import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionsService} from '../services/sessions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: any;
  username: any;
  password: any;

  constructor(
    private session: SessionsService,
    private router: Router) { }

  ngOnInit() {
  }

  login(myForm) {
    console.log(myForm);
    console.log(myForm.value);
      this.session.login(myForm.value.username,myForm.value.password)
        .subscribe(
        (user) => {
          console.log(user.username)
          this.router.navigate(['/'])
        },
        (err) => this.error = err
        );
    }
}
