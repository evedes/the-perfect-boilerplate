import { All, Controller, Req, Res } from '@nestjs/common';
import type { IncomingMessage, ServerResponse } from 'http';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';

@Controller('auth')
export class AuthController {
  private handler = toNodeHandler(auth);

  @All('*')
  async handleAuth(
    @Req() req: IncomingMessage,
    @Res() res: ServerResponse<IncomingMessage>,
  ) {
    return this.handler(req, res);
  }
}
