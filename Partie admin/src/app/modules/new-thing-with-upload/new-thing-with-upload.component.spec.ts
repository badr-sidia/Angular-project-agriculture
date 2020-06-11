import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewThingWithUploadComponent } from './new-thing-with-upload.component';

describe('NewThingWithUploadComponent', () => {
  let component: NewThingWithUploadComponent;
  let fixture: ComponentFixture<NewThingWithUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewThingWithUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewThingWithUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
