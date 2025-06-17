import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register';
import { User } from '../models/models';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  const dummyUser: User = {
    id: 1,
    userName: 'raghav',
    email: 'gmail',
    password: 'pass',
    profile: {
      id: 1,
      age: 25,
      height: 170,
      weight: 70
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService]
    });
    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    service.registerUser(dummyUser).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://172.24.60.170:2001/api/users/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyUser);
    req.flush(dummyUser);
  });

  it('should login a user', () => {
    service.tryToLogin(dummyUser).subscribe(user => {
      expect(user).toEqual(dummyUser);
    });

    const req = httpMock.expectOne('http://172.24.60.170:2001/api/users/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(dummyUser);
    req.flush(dummyUser);
  });
});
