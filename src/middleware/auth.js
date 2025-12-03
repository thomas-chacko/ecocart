import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

export function authMiddleware(handler) {
  return async (request) => {
    try {
      const authHeader = request.headers.get('authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { success: false, message: 'No token provided' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7);
      const { valid, decoded, error } = verifyToken(token);

      if (!valid) {
        return NextResponse.json(
          { success: false, message: 'Invalid token', error },
          { status: 401 }
        );
      }

      request.admin = decoded;
      return handler(request);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Authentication failed' },
        { status: 401 }
      );
    }
  };
}
