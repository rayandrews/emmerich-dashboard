export class LoginPayload {
  readonly username: string;
  readonly password: string;
}

export interface JwtPayload {
  readonly username: string;
  readonly lastLogin: Date;
}

export interface JwtResponse {
  readonly accessToken: string;
  readonly expiresIn: number;
}
