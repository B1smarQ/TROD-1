import { ArgumentsHost, BadRequestException, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

type ResponseMock = {
  status: jest.Mock<ResponseMock, [number]>;
  json: jest.Mock<void, [unknown]>;
};

const createHost = (response: ResponseMock): ArgumentsHost =>
  ({
    switchToHttp: () => ({
      getResponse: () => response,
      getRequest: () => ({
        method: 'GET',
        url: '/todos',
      }),
    }),
  }) as unknown as ArgumentsHost;

describe('AllExceptionsFilter', () => {
  let response: ResponseMock;
  let filter: AllExceptionsFilter;

  beforeEach(() => {
    response = {
      status: jest.fn(function status(this: ResponseMock, statusCode: number) {
        void statusCode;
        return this;
      }),
      json: jest.fn(),
    };
    filter = new AllExceptionsFilter();
  });

  it('formats known HTTP exceptions', () => {
    filter.catch(new BadRequestException('Invalid payload'), createHost(response));

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 400,
        path: '/todos',
        timestamp: expect.any(String),
        error: expect.objectContaining({
          statusCode: 400,
          message: 'Invalid payload',
        }),
      }),
    );
  });

  it('logs and formats unexpected exceptions', () => {
    const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);

    filter.catch(new Error('Database unavailable'), createHost(response));

    expect(errorSpy).toHaveBeenCalledWith('GET /todos failed', expect.any(String));
    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        path: '/todos',
        error: 'Internal server error',
      }),
    );

    errorSpy.mockRestore();
  });
});
