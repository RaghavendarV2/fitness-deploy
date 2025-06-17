import { Component } from '@angular/core';
import { RegisterService } from '../services/register';
import { Profile, User } from '../models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {
  loginUser : any = {
    username: '',
    password : '',
    email : ''
  }

  dummyProfile : Profile = {
    id:0,
    age:0,
    height:0,
    weight:0,
  }

  loginFlag : boolean = false;
  UserFlag : User | null = null;

  constructor(private registerService : RegisterService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  tryToLogin(){

    const dummyProfile : Profile = {
      id:0,
      age:0,
      height:0,
      weight:0,
    }
    const user : User = {
      userName : this.loginUser.username,
      password : this.loginUser.password,
      email : this.loginUser.password,
      profile : dummyProfile
    }
    this.registerService.tryToLogin(user).subscribe((user) => {
      this.UserFlag = user;
    });
  }
}
