export interface JWTPayload {
  UID: string;
  roles: string;
}

interface ProtectedRoutes extends Request {
  admin?: JWTPayload;
  user?: JWTPayload;
}

export interface JWTSigningOptions {
  expiresAt: string | number;
}

export interface VerifiedPayload {
  payload: JWTPayload;
  expired: boolean;
}
