import { expressjwt } from "express-jwt";

const secretToken = "h3uh5i42h5546i";

export default expressjwt({
  secret: secretToken,
  algorithms: ["HS256"],
});
