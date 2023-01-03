import express, { Request, Response, NextFunction } from "express";

export async function isAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.currentUser.role !== "ADMIN") {
      return res.status(401).json({ msg: "User unauthorized." });
    }

    next();
  } catch (err) {
    return res.status(500).json(err);
  }
}
