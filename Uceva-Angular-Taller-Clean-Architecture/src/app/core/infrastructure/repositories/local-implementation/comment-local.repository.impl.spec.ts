
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COMMENTS_MOCK } from '../../../../mocks/comments.mocks';
import { Comment } from '../../../domain/models/comment.model';
import { DataService } from '../../services/data.service';
import { CommentLocalRepositoryImpl } from './comment-local.repository.impl';

describe('CommentLocalRepositoryImpl (Infrastructure)', () => {
  let repository: CommentLocalRepositoryImpl;

  const countComments = 5;
  const DataServiceMock = { getAllCommentsLocal: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            CommentLocalRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(CommentLocalRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCommentsLocal()', () => {
    const getAllSpy = DataServiceMock.getAllCommentsLocal.mockReturnValue(of([]));
    repository.getAll(countComments).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countComments);
  });

  it('debe devolver el listado de comentarios como Observable', (done) => {
    DataServiceMock.getAllCommentsLocal.mockReturnValue(of(COMMENTS_MOCK))
    repository.getAll(countComments).subscribe((comments: Comment[]) => {
      expect(comments).toEqual(COMMENTS_MOCK);
      done();
    });
  });
});
