import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReviewsTableComponent } from './reviews-table.component';
import { REVIEWS_MOCK } from '../../../mocks/reviews.mocks';

describe('ReviewsTableComponent', () => {
  let component: ReviewsTableComponent;
  let fixture: ComponentFixture<ReviewsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewsTableComponent);
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

  it('debería renderizar una fila por cada reseña', () => {
    component.reviews = REVIEWS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.reviews.length);
  });

  it('debería mostrar los datos de la reseña en cada columna', () => {
    component.reviews = REVIEWS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const review = component.reviews[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(review.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(review.reviewer);
      expect(columns[2].nativeElement.textContent.trim()).toBe(review.product);
      expect(columns[3].nativeElement.textContent.trim()).toBe(review.comment);
    });
  });

  it('debería mapear cada estado a su BadgeType correcto', () => {
    expect(component.statusMap['Pendiente']).toBe('warning');
    expect(component.statusMap['Aprobada']).toBe('success');
    expect(component.statusMap['Rechazada']).toBe('danger');
  });

});
