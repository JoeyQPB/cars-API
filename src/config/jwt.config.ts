import jwt from "jsonwebtoken";

interface User {
  _id: Object;
  name: string;
  role: string;
  email: string;
}

const secretToken = "h3uh5i42h5546i";

export function generateToken(user: User) {
  const { _id, name, role, email } = user;
  const signature = secretToken;
  const expiration = "12h";

  return jwt.sign({ _id, name, email, role }, signature, {
    expiresIn: expiration,
  });
}
