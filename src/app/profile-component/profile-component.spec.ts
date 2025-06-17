import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile-component';
import { ProfileService } from '../services/profile-service';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    const mockProfileService = {
      viewProfileById: () => of({ id: 1, age: 25, height: 170, weight: 65 }),
      editProfileByUserId: () => of({})
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ProfileComponent],
      providers: [{ provide: ProfileService, useValue: mockProfileService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should bind input values to editProfile object', async () => {
    const ageInput: HTMLInputElement = nativeElement.querySelector('input[name="newAge"]')!;
    const heightInput: HTMLInputElement = nativeElement.querySelector('input[name="newHeight"]')!;
    const weightInput: HTMLInputElement = nativeElement.querySelector('input[name="newWeight"]')!;

    ageInput.value = '30';
    heightInput.value = '180';
    weightInput.value = '75';

    ageInput.dispatchEvent(new Event('input'));
    heightInput.dispatchEvent(new Event('input'));
    weightInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.editProfile.editAge).toBe('30');
    expect(component.editProfile.editHeight).toBe('180');
    expect(component.editProfile.editWeight).toBe('75');
  });
});
