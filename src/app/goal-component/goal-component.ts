import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivityService } from '../services/activity-service';
import { Goal } from '../models/models';

@Component({
  selector: 'app-goal-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './goal-component.html',
  styleUrl: './goal-component.css'
})
export class GoalComponent {
  newGoal : any = {
    targetSteps:'',
    targetCalories: ''
  }

  UserIdForAddGoal : number = 0;
  addMsg : string  = '';
  addFlag : boolean = false;

  filteredList : Goal[] = [];
  filterUserId : number = 0;

  constructor(private activityService : ActivityService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }

  addGoalsForAUser(){
    if(this.UserIdForAddGoal == 0){
      this.addFlag = false;
      this.addMsg = "Enter Valid user Id"
    }
    else{
      this.addFlag = true;

      const goal : Goal = {
        targetSteps : this.newGoal.targetSteps,
        targetCalories : this.newGoal.targetCalories
      }
      this.activityService.createGoalForUser(goal, this.UserIdForAddGoal).subscribe(() => {
        this.addMsg = "Successfully Added";
        this.resetAddForm();
      })
    }
  }

  resetAddForm(){
    this.newGoal = {
       targetSteps:'',
       targetCalories: ''
    }
  }

  filterGoalsByUser(){
    this.activityService.getAllGoalsByUser(this.filterUserId).subscribe(data => {
      this.filteredList = data;
    })
  }
}
