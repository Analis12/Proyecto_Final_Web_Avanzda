import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasclienteComponent } from './citascliente.component';

describe('CitasclienteComponent', () => {
  let component: CitasclienteComponent;
  let fixture: ComponentFixture<CitasclienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasclienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
