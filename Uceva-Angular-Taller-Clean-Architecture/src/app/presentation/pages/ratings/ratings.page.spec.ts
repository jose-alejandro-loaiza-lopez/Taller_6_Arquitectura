import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllRatingsUseCase } from '../../../core/application/usecases/get-all-ratings.usecase';
import { RATINGS_MOCK } from '../../../mocks/ratings.mocks';
import { RatingsTableComponent } from '../../components/ratings-table/ratings-table.component';
import { RatingsPage } from './ratings.page';

describe('RatingsPage', () => {
  let component: RatingsPage;
  let fixture: ComponentFixture<RatingsPage>;

  const GetAllRatingsUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsPage, RatingsTableComponent],
    })
    .overrideComponent(RatingsPage, {
      set: {
        providers: [
          { provide: GetAllRatingsUseCase, useValue:GetAllRatingsUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.ratings).toEqual([]);
  });

  it('debe cargar las calificaciones y cambiar el estado a success', () => {
    GetAllRatingsUseCaseMock.execute.mockReturnValue(of(RATINGS_MOCK));
    fixture.detectChanges();
    expect(component.ratings).toEqual(RATINGS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar las calificaciones y cambiar el estado a error', () => {
    GetAllRatingsUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.ratings).toEqual([]);
    expect(component.state).toBe('error');
  });

});
