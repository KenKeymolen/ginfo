import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GinInventoryComponent } from './gin-inventory.component';

describe('GinInventoryComponent', () => {
  let component: GinInventoryComponent;
  let fixture: ComponentFixture<GinInventoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GinInventoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GinInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
