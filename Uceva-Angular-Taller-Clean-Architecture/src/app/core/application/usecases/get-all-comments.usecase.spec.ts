import { TestBed } from "@angular/core/testing";
import { GetAllCommentsUseCase } from "./get-all-comments.usecase";
import { CommentRepository } from "../../domain/repositories/comment.repository";
import { firstValueFrom, of, throwError } from "rxjs";
import { COMMENTS_MOCK } from "../../../mocks/comments.mocks";


describe('GetAllCommentsUseCase', () => {
  let useCase: GetAllCommentsUseCase;

  const countComments = 5;
  const CommentRepositoryMock: jest.Mocked<CommentRepository> = { getAll: jest.fn() };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        providers: [
            GetAllCommentsUseCase,
            { provide: CommentRepository, useValue: CommentRepositoryMock }
        ]
    })
    .compileComponents();
    useCase = TestBed.inject(GetAllCommentsUseCase);
  });

  it('debería ser inyectable y crearse correctamente', () => {
    expect(useCase).toBeInstanceOf(GetAllCommentsUseCase);
  });

  it('debería delegar la llamada del repository', async () => {
    CommentRepositoryMock.getAll.mockReturnValue(of(COMMENTS_MOCK));
    const result = await firstValueFrom(useCase.execute(countComments));
    expect(CommentRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(CommentRepositoryMock.getAll).toHaveBeenCalledWith(countComments);
    expect(result).toEqual(COMMENTS_MOCK);
  });

  it('debería propagar un error cuando el repositorio emita un error', async () => {
    const errorMessage = 'Fallo la busqueda de comentarios';
    CommentRepositoryMock.getAll.mockReturnValue(throwError(() => new Error(errorMessage)));
    const result = useCase.execute(countComments);
    await expect(firstValueFrom(result)).rejects.toThrow(errorMessage);
    expect(CommentRepositoryMock.getAll).toHaveBeenCalledTimes(1);
    expect(CommentRepositoryMock.getAll).toHaveBeenCalledWith(countComments);
  });

});
