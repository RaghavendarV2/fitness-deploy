import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivityService } from '../services/activity-service';
import { Activity } from '../models/models';

@Component({
  selector: 'app-activity-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './activity-component.html',
  styleUrl: './activity-component.css'
})
export class ActivityComponent {
  newActivity : any = {
    steps: '',
    distance: '',
    caloriesBurned: '',
    userId: '',
  }

  addSuccess : string = '';

  filterUserId : number = 0;
  filteredList : Activity[] = [];
  getAllFlag : boolean = false;
  getAllMsg : string = '';

  constructor(private activityService : ActivityService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  createActivity(){
    const sendActivity : Activity = {
      steps : this.newActivity.steps,
      distance : this.newActivity.distance,
      caloriesBurned : this.newActivity.caloriesBurned,
      userId : this.newActivity.userId
    }

    this.activityService.createActivity(sendActivity).subscribe( () => {
      this.resetAddForm();
      this.addSuccess = "Successfully Added Activity";
    })
  }

  resetAddForm(){
    this.newActivity = {
      steps: '',
      distance: '',
      caloriesBurned: '',
      userId: ''
    }
  }

  getAllActivityByUser(){
    if(this.filterUserId == 0){
      this.getAllFlag = false;
      this.getAllMsg = "Enter User ID!";
    }
    else{
      this.activityService.getAllActivityByUser(this.filterUserId).subscribe( data =>{
        this.getAllFlag = true;
        this.filteredList = data;
      })
    }
  }
}
