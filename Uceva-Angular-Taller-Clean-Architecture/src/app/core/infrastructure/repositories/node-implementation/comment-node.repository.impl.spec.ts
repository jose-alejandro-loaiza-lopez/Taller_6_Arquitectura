
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COMMENTS_MOCK } from '../../../../mocks/comments.mocks';
import { Comment } from '../../../domain/models/comment.model';
import { DataService } from '../../services/data.service';
import { CommentNodeRepositoryImpl } from './comment-node.repository.impl';

describe('CommentNodeRepositoryImpl (Infrastructure)', () => {
  let repository: CommentNodeRepositoryImpl;

  const countComments = 5;
  const DataServiceMock = { getAllCommentsNode: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            CommentNodeRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(CommentNodeRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCommentsNode()', () => {
    const getAllSpy = DataServiceMock.getAllCommentsNode.mockReturnValue(of([]));
    repository.getAll(countComments).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countComments);
  });

  it('debe devolver el listado de comentarios como Observable', (done) => {
    DataServiceMock.getAllCommentsNode.mockReturnValue(of(COMMENTS_MOCK))
    repository.getAll(countComments).subscribe((comments: Comment[]) => {
      expect(comments).toEqual(COMMENTS_MOCK);
      done();
    });
  });
});
