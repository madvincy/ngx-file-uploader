import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFileUploaderComponent } from './ngx-file-uploader.component';

describe('NgxFileUploaderComponent', () => {
  let component: NgxFileUploaderComponent;
  let fixture: ComponentFixture<NgxFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
