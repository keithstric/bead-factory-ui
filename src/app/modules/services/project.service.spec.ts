import { TestBed } from '@angular/core/testing';

import { ProjectsService } from 'src/app/modules/services/projects.service';

describe('ProjectService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
