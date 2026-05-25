import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export interface JwtPayload {
  userId: string;
}

export const jwtService = {
  generateAccessToken(userId: string) {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "15m",
    });
  },

  verifyAccessToken(token: string): JwtPayload {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  },
};
