import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GinDetailsComponent } from './gin-details.component';

describe('GinDetailsComponent', () => {
  let component: GinDetailsComponent;
  let fixture: ComponentFixture<GinDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GinDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GinDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
