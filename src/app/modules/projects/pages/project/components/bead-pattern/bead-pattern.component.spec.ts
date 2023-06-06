import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeadPatternComponent } from 'src/app/modules/projects/pages/project/components/bead-pattern/bead-pattern.component';

describe('BeadPatternComponent', () => {
  let component: BeadPatternComponent;
  let fixture: ComponentFixture<BeadPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeadPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeadPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
