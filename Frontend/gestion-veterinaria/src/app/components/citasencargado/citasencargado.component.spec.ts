import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasencargadoComponent } from './citasencargado.component';

describe('CitasencargadoComponent', () => {
  let component: CitasencargadoComponent;
  let fixture: ComponentFixture<CitasencargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasencargadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasencargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
