import { CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { lastValueFrom, of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

const createContext = (): ExecutionContext =>
  ({
    switchToHttp: () => ({
      getRequest: () => ({
        method: 'GET',
        url: '/todos',
      }),
    }),
  }) as unknown as ExecutionContext;

describe('LoggingInterceptor', () => {
  it('logs request duration and returns the handler result', async () => {
    const loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
    const nowSpy = jest.spyOn(Date, 'now').mockReturnValueOnce(1000).mockReturnValueOnce(1042);
    const interceptor = new LoggingInterceptor();
    const next: CallHandler = {
      handle: jest.fn(() => of('ok')),
    };

    await expect(lastValueFrom(interceptor.intercept(createContext(), next))).resolves.toBe('ok');

    expect(next.handle).toHaveBeenCalled();
    expect(loggerSpy).toHaveBeenCalledWith('GET /todos 42ms');

    loggerSpy.mockRestore();
    nowSpy.mockRestore();
  });
});
