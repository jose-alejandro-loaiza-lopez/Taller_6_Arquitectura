import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RatingsTableComponent } from './ratings-table.component';
import { RATINGS_MOCK } from '../../../mocks/ratings.mocks';

describe('RatingsTableComponent', () => {
  let component: RatingsTableComponent;
  let fixture: ComponentFixture<RatingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada calificación', () => {
    component.ratings = RATINGS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.ratings.length);
  });

  it('debería mostrar los datos de la calificación en cada columna', () => {
    component.ratings = RATINGS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const rating = component.ratings[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(rating.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(rating.rater);
      expect(columns[2].nativeElement.textContent.trim()).toBe(rating.product);
      expect(columns[3].nativeElement.textContent.trim()).toBe(String(rating.score));
    });
  });

  it('debería mapear cada nivel a su BadgeType correcto', () => {
    expect(component.levelMap['Bajo']).toBe('danger');
    expect(component.levelMap['Medio']).toBe('warning');
    expect(component.levelMap['Alto']).toBe('success');
  });

});
