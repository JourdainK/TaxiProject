import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtaxiComponent } from './newtaxi.component';

describe('NewtaxiComponent', () => {
  let component: NewtaxiComponent;
  let fixture: ComponentFixture<NewtaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewtaxiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewtaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
