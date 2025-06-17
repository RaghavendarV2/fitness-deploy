import { TestBed } from '@angular/core/testing';

import { ActivityService } from './activity-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Activity, Goal } from '../models/models';

describe('ActivityService', () => {
  let service: ActivityService;
  let httpMock: HttpTestingController;

  const dummyActivity: Activity = {
    id: 1,
    steps: 1,
    distance: 1,
    caloriesBurned: 1,
    userId: 1,
    date: new Date()
  }

  const dummyActivity2: Activity = {
    id: 1,
    steps: 1,
    distance: 1,
    caloriesBurned: 1,
    userId: 1,
    date: new Date()
  }

  const dummyGoal : Goal = {
    id:1,
    targetSteps:1,
    targetCalories: 1
  }

  const dummyGoal1 : Goal = {
    id:1,
    targetSteps:1,
    targetCalories: 1
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivityService]
    });
    service = TestBed.inject(ActivityService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should add activity via POST', () => {
    service.createActivity(dummyActivity).subscribe((res) => {
      expect(res).toEqual(dummyActivity);
    });

    const req = httpMock.expectOne('http://172.24.60.170:2002/api/activities');
    expect(req.request.method).toBe('POST');
    req.flush(dummyActivity);
  });


  it('should add goal via POST', () => {
    const UserId = 1;

    service.createGoalForUser(dummyGoal, UserId).subscribe((res) => {
      expect(res).toEqual(dummyGoal);
    });

    const req = httpMock.expectOne(`http://172.24.60.170:2002/api/goals/${UserId}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyGoal);
  });

  it('should get all activities by User', () =>{
    const listActivity : Activity[] = [dummyActivity, dummyActivity2];
    const UserId = 1;
    service.getAllActivityByUser(UserId).subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(listActivity);
    });

    const req = httpMock.expectOne(`http://172.24.60.170:2002/api/user/${UserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(listActivity);
  })


  it('should get all goals by User', () =>{
    const listGoals : Goal[] = [dummyGoal, dummyGoal1];
    const UserId = 1;
    service.getAllGoalsByUser(UserId).subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(listGoals);
    });

    const req = httpMock.expectOne(`http://172.24.60.170:2002/api/goals/user/${UserId}`);
    expect(req.request.method).toBe('GET');
    req.flush(listGoals);
  })

})
