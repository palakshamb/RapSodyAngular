import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsobsComponent } from './bsobs.component';

describe('BsobsComponent', () => {
  let component: BsobsComponent;
  let fixture: ComponentFixture<BsobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
