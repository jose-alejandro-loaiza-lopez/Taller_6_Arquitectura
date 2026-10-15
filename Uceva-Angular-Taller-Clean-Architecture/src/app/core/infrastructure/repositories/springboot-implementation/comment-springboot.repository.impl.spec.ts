
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { COMMENTS_MOCK } from '../../../../mocks/comments.mocks';
import { Comment } from '../../../domain/models/comment.model';
import { DataService } from '../../services/data.service';
import { CommentSpringBootRepositoryImpl } from './comment-springboot.repository.impl';

describe('CommentSpringBootRepositoryImpl (Infrastructure)', () => {
  let repository: CommentSpringBootRepositoryImpl;

  const countComments = 5;
  const DataServiceMock = { getAllCommentsSpringBoot: jest.fn() };

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            CommentSpringBootRepositoryImpl,
            { provide: DataService, useValue: DataServiceMock }
        ]
    })
    .compileComponents();
    repository = TestBed.inject(CommentSpringBootRepositoryImpl)
  });

  it('debe crearse correctamente', () => {
    expect(repository).toBeTruthy();
  });

  it('debe delegar la llamada a DataService.getAllCommentsSpringBoot()', () => {
    const getAllSpy = DataServiceMock.getAllCommentsSpringBoot.mockReturnValue(of([]));
    repository.getAll(countComments).subscribe();
    expect(getAllSpy).toHaveBeenCalledTimes(1);
    expect(getAllSpy).toHaveBeenCalledWith(countComments);
  });

  it('debe devolver el listado de comentarios como Observable', (done) => {
    DataServiceMock.getAllCommentsSpringBoot.mockReturnValue(of(COMMENTS_MOCK))
    repository.getAll(countComments).subscribe((comments: Comment[]) => {
      expect(comments).toEqual(COMMENTS_MOCK);
      done();
    });
  });
});
