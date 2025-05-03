import jwt from "jsonwebtoken";


const JWT_SECRET = "asif";
const JWT_EXPIRATION = "1h"

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { email, password } = req.body;

    if (email == "asif.khan@ksolves.com" && password == "123") {
      const token = jwt.sign({ email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      return res.status(200).json({token})
    }
  }
}
