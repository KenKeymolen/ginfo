import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GinsComponent } from './gins.component';

describe('GinsComponent', () => {
  let component: GinsComponent;
  let fixture: ComponentFixture<GinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
