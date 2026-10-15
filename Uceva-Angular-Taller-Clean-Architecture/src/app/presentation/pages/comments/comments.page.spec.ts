import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { GetAllCommentsUseCase } from '../../../core/application/usecases/get-all-comments.usecase';
import { COMMENTS_MOCK } from '../../../mocks/comments.mocks';
import { CommentsTableComponent } from '../../components/comments-table/comments-table.component';
import { CommentsPage } from './comments.page';

describe('CommentsPage', () => {
  let component: CommentsPage;
  let fixture: ComponentFixture<CommentsPage>;

  const GetAllCommentsUseCaseMock = { execute: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsPage, CommentsTableComponent],
    })
    .overrideComponent(CommentsPage, {
      set: {
        providers: [
          { provide: GetAllCommentsUseCase, useValue:GetAllCommentsUseCaseMock }
        ]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsPage);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.state).toBe('init');
    expect(component.comments).toEqual([]);
  });

  it('debe cargar los comentarios y cambiar el estado a success', () => {
    GetAllCommentsUseCaseMock.execute.mockReturnValue(of(COMMENTS_MOCK));
    fixture.detectChanges();
    expect(component.comments).toEqual(COMMENTS_MOCK);
    expect(component.state).toBe('success');
  });

  it('no deberia cargar los comentarios y cambiar el estado a error', () => {
    GetAllCommentsUseCaseMock.execute.mockReturnValue(
      throwError(() => new Error('error'))
    );
    fixture.detectChanges();
    expect(component.comments).toEqual([]);
    expect(component.state).toBe('error');
  });

});
