import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GoalComponent } from './goal-component';
import { ActivityService } from '../services/activity-service';
import { of } from 'rxjs';

describe('GoalComponent', () => {
  let component: GoalComponent;
  let fixture: ComponentFixture<GoalComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    const mockActivityService = {
      createGoalForUser: () => of({}),
      getAllGoalsByUser: () => of([])
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [GoalComponent],
      providers: [{ provide: ActivityService, useValue: mockActivityService }]
    }).compileComponents();

    fixture = TestBed.createComponent(GoalComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should bind input fields to newGoal and UserIdForAddGoal correctly', () => {
    const userIdInput: HTMLInputElement = nativeElement.querySelector('input[name="uId"]')!;
    const stepsInput: HTMLInputElement = nativeElement.querySelector('input[name="tgtStep"]')!;
    const caloriesInput: HTMLInputElement = nativeElement.querySelector('input[name="tgtCal"]')!;

    userIdInput.value = '5';
    stepsInput.value = '10000';
    caloriesInput.value = '500';

    userIdInput.dispatchEvent(new Event('input'));
    stepsInput.dispatchEvent(new Event('input'));
    caloriesInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.UserIdForAddGoal).toBe(5);
    expect(component.newGoal.targetSteps).toBe('10000');
    expect(component.newGoal.targetCalories).toBe('500');
  });
});
