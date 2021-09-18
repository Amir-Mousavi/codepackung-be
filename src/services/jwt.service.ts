import { Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  sign(options, key) {
    return jwt.sign(options, key);
  }

  verify(token, key) {
    return jwt.verify(token, key);
  }

  verifyMasterToken(masterToken, key) {
    try {
      const token = jwt.verify(masterToken, key);

      if (token) {
        const user = jwt.verify(token?.token, key);

        return user;
      }
    } catch {
      return null;
    }
  }
}
