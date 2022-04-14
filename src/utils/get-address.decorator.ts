import { createParamDecorator, ExecutionContext } from '@nestjs/common';
const jwt_decode = require('jwt-decode');


export const GetAddress = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const tokenBearer = request.headers['authorization'];
    const token = tokenBearer.slice(7)
    const decoded = jwt_decode(token);
    return decoded.account_address;
  },
);
