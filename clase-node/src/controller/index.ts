import { Request, Response, NextFunction } from "express";

export const mainController = (req: Request, res: Response) => {
    res.status(200).send()
};
