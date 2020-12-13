import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import verifyToken from '../../models/jwt';
describe(`verifyToken`, () => {
  it('is derived from headers', () => {
    const req = {};
    const res = {};
    const next: NextFunction;
    expect(verifyToken(req, res, next)).toBe('');
  });
});
