import jwt from "jsonwebtoken";

export const generateToken = ({ payload, key, expiresIn }) => {
  return jwt.sign({ ...payload }, key, {
    expiresIn: expiresIn,
  });
};
export function parseJwtExpiresToMs(expires) {
  const unit = expires.slice(-1); // m, h, d
  const num = parseInt(expires.slice(0, -1));
  switch (unit) {
    case "s":
      return num * 1000;
    case "m":
      return num * 60 * 1000;
    case "h":
      return num * 60 * 60 * 1000;
    case "d":
      return num * 24 * 60 * 60 * 1000;
    default:
      return parseInt(expires);
  }
}
