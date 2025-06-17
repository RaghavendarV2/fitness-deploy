import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterService } from '../services/register';
import { User } from '../models/models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {

  newUser : any = {
    userName: '',
    email: '',
    password: '',
    profile : {
      age: '',
      height : '',
      weight : ''
    }
  }

  // successMsg:string ='';
  registersuccess : boolean = false;

  constructor(private registerService : RegisterService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  registerUser(){
    const user : User = {
      userName: this.newUser.userName,
      email: this.newUser.email,
      password: this.newUser.password,
      profile : this.newUser.profile
    }

    this.registerService.registerUser(user).subscribe(() => {
      this.registersuccess = true;
      this.resetForm();

    })
  }

  resetForm(){
    this.newUser = {
      userName: '',
      email: '',
      password: '',
      profile : {
        age: '',
        height : '',
        weight : ''
      }
    }
  }




}
