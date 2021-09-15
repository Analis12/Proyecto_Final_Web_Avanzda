import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMascotaComponent } from './registrar-mascota.component';

describe('RegistrarMascotaComponent', () => {
  let component: RegistrarMascotaComponent;
  let fixture: ComponentFixture<RegistrarMascotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarMascotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMascotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
