import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittaxiComponent } from './edittaxi.component';

describe('EdittaxiComponent', () => {
  let component: EdittaxiComponent;
  let fixture: ComponentFixture<EdittaxiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdittaxiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdittaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
