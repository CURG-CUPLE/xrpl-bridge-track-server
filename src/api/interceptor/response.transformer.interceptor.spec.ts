import { TestBed } from '@automock/jest';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { firstValueFrom, of } from 'rxjs';
import { ResponseTransformerInterceptor } from './response.transformer.interceptor';

describe('ResponseTransformerInterceptor', () => {
  let responseTransformerInterceptor: ResponseTransformerInterceptor<any>;
  let executionContext: Partial<ExecutionContext>;
  let callHandler: Partial<CallHandler>;

  beforeAll(() => {
    const { unit } = TestBed.create(ResponseTransformerInterceptor).compile();
    responseTransformerInterceptor = unit;
  });

  beforeEach(() => {
    executionContext = {
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn(() => ({})),
      })),
    } as unknown as ExecutionContext;
  });

  describe('intercept', () => {
    it('should return ApiResponseT type when api call result', async () => {
      // given
      callHandler = {
        handle: jest.fn().mockReturnValue(of({ result: 'success' })),
      } as unknown as CallHandler;
      // when - then
      expect(
        Object.keys(
          await firstValueFrom(
            responseTransformerInterceptor.intercept(executionContext as ExecutionContext, callHandler as CallHandler),
          ),
        ),
      ).toEqual(['path', 'data', 'error', 'responseTime']);
    });
  });
});
