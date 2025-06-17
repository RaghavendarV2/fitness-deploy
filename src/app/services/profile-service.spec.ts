import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile-service';
import { Profile } from '../models/models';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://172.24.60.170:2001/api/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });

    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch profile by user ID', () => {
    const mockProfile: Profile = { id: 1, age: 25, height: 175, weight: 70 };

    service.viewProfileById(1).subscribe((profile) => {
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(`${baseUrl}/profile/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });

  it('should edit profile by user ID', () => {
    const updatedProfile: Profile = { id: 1, age: 26, height: 175, weight: 72 };

    service.editProfileByUserId(1, updatedProfile).subscribe((profile) => {
      expect(profile).toEqual(updatedProfile);
    });

    const req = httpMock.expectOne(`${baseUrl}/profile/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedProfile);
  });
});
