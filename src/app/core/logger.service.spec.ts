import { TestBed, inject } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggerService]
    });
  });

  it('should log messages', inject([LoggerService], (service: LoggerService) => {
    expect(service).toBeTruthy();
    spyOn(service, 'log');
    service.log("It's gonna be logged");
    expect(service.log).toHaveBeenCalled();
  }));
});
