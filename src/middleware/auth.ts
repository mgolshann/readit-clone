import { NextFunction, Request, Response } from "express";
import { User } from "../entities/User";
import jwt from 'jsonwebtoken';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) throw new Error('Unauthenticated');

        const { username }: any = jwt.verify(token, process.env.JWT_SECURET);
        const user = await User.findOne({ username });
        if (!user) throw new Error('Unauthenticated');

        const msg: any = {
            "user": user.username,
            "email": user.email,
            "createdAt": user.createdAt,
            "updatedAt": user.updatedAt
        };
        
        res.locals.user = msg;
        return next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ error: 'Unauthenticated' })
    }
}