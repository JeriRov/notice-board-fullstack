import { NextFunction, Request, Response } from 'express';
import { ParamsWithId } from '../../interfaces/ParamsWithId';

import { ObjectId } from 'mongodb';
import { Users, UserWithId } from './users.model';


export async function findOne(req: Request<ParamsWithId, UserWithId, {}>, res: Response<UserWithId>, next: NextFunction) {
  try {
    const result = await Users.findOne({
      _id: new ObjectId(req.params.id),
    });
    if (!result) {
      res.status(404);
      next(`Notice with id "${req.params.id}" not found.`);
      return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}
