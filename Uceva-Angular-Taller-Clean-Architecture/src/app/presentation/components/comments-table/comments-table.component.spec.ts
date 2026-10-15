import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommentsTableComponent } from './comments-table.component';
import { COMMENTS_MOCK } from '../../../mocks/comments.mocks';

describe('CommentsTableComponent', () => {
  let component: CommentsTableComponent;
  let fixture: ComponentFixture<CommentsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsTableComponent);
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

  it('debería renderizar una fila por cada comentario', () => {
    component.comments = COMMENTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.comments.length);
  });

  it('debería mostrar los datos del comentario en cada columna', () => {
    component.comments = COMMENTS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const comment = component.comments[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(comment.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(comment.author);
      expect(columns[2].nativeElement.textContent.trim()).toBe(comment.subject);
      expect(columns[3].nativeElement.textContent.trim()).toBe(comment.message);
    });
  });

  it('debería mapear cada tipo a su BadgeType correcto', () => {
    expect(component.typeMap['General']).toBe('primary');
    expect(component.typeMap['Soporte']).toBe('secondary');
    expect(component.typeMap['Sugerencia']).toBe('success');
  });

});
