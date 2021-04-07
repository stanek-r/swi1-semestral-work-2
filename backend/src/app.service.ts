import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! aaa';
  }

  logIdk(): void {
    console.log("Hehe");
  }
}
