import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): { message: string; time: string } {
    return {
      message: 'Hello from the Backend',
      time: new Date().toLocaleTimeString(),
    };
  }
}
