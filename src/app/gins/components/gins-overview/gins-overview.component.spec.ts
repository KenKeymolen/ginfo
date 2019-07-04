import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GinsOverviewComponent } from './gins-overview.component';

describe('GinsOverviewComponent', () => {
  let component: GinsOverviewComponent;
  let fixture: ComponentFixture<GinsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GinsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GinsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
