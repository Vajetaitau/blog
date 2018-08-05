import { TestBed, inject } from '@angular/core/testing';

import { LabyrinthService } from './labyrinth.service';

describe('LabyrinthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabyrinthService]
    });
  });

  it('should be created', inject([LabyrinthService], (service: LabyrinthService) => {
    expect(service).toBeTruthy();
  }));
});
