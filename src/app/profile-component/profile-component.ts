import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Profile } from '../models/models';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-profile-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css'
})
export class ProfileComponent {

  editProfile : any = {
    editAge : '',
    editHeight : '',
    editWeight : ''
  }


  currentProfile : any = {
    editAge : '',
    editHeight : '',
    editWeight : ''
  }
  foundProfile : Profile | null = null;
  searchId : number = 0;
  searchAttempted : boolean = false;

  editUserId : number = 0;
  editAttempted : boolean = false;

  successMsg : String = '';



  constructor(private profileService : ProfileService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  searchProfile(){
    if(this.searchId == 0){
      this.searchAttempted = false;
      this.foundProfile = null;
    }
    else{
      this.searchAttempted = true;
      this.profileService.viewProfileById(this.searchId).subscribe({
        next : profile => {
          this.foundProfile = profile;
        }
      })
    }
  }


  preLoadDetails(){
    this.profileService.viewProfileById(this.editUserId).subscribe({
      next : profile => {
        this.currentProfile = profile;
      }
    })
  }

  editAProfileByUserId(){
    const profile : Profile = {
      age : this.editProfile.editAge,
      height : this.editProfile.editHeight,
      weight : this.editProfile.editWeight
    }

    this.profileService.editProfileByUserId(this.editUserId, profile).subscribe(() => {
      this.successMsg = "Successfully Edited";
      this.resetEditForm();
    })
  }

  resetEditForm(){
    this.editProfile = {
      editAge : '',
      editHeight : '',
      editWeight : ''
    }
  }
}
