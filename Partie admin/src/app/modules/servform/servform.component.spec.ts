import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServformComponent } from './servform.component';

describe('ServformComponent', () => {
  let component: ServformComponent;
  let fixture: ComponentFixture<ServformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
