import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';

// middleware와의 차이점은 실행 순서가 다르다
@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(
      map(data => ({
        success: true,
        data,
      })),
    );
  }
}
