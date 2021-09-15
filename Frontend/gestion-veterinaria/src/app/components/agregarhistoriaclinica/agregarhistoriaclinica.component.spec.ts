import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarhistoriaclinicaComponent } from './agregarhistoriaclinica.component';

describe('AgregarhistoriaclinicaComponent', () => {
  let component: AgregarhistoriaclinicaComponent;
  let fixture: ComponentFixture<AgregarhistoriaclinicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarhistoriaclinicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarhistoriaclinicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
