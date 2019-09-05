import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionDialogComponent } from './solution-dialog.component';

describe('SolutionDialogComponent', () => {
  let component: SolutionDialogComponent;
  let fixture: ComponentFixture<SolutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolutionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
