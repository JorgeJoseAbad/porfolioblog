import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { Routes } from '@angular/router';
import { FileUploadModule,FileDropDirective,FileSelectDirective } from "ng2-file-upload";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { PortfolioService} from './services/portfolio.service';
import { BlogService} from './services/blog.service';
import { SessionsService} from './services/sessions.service';

import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IntroductionComponent} from './introduction/introduction.component';
import { BlogComponent} from './blog/blog.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { NewProyectComponent } from './new-proyect/new-proyect.component';
import { NewPostComponent } from './new-post/new-post.component';
import { EdituserComponent } from './edituser/edituser.component';


export const routes: Routes = [
    { path: '', component: IntroductionComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'blog', component: BlogComponent},
    { path: 'introduction', component: IntroductionComponent},
    { path: 'signup',  component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'new-proyect', component: NewProyectComponent},
    { path: 'new-post', component: NewPostComponent},
    { path: 'edituser', component: EdituserComponent}

  ]

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    NavbarComponent,
    IntroductionComponent,
    BlogComponent,
    SignupComponent,
    LoginComponent,
    NewProyectComponent,
    NewPostComponent,
    EdituserComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FileUploadModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [PortfolioService,BlogService,SessionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
