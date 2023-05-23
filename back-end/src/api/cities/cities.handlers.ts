import { NextFunction, Request, Response } from 'express';
import { Cities, CitiesModel, City } from './cities.model';
import { User } from '../users/users.model';
import { ObjectId } from 'mongodb';

export async function searchCities(req: Request, res: Response, next: NextFunction) {
  try {
    const { objectName } = CitiesModel.pick({ objectName: true }).parse(req.params);

    const regex = new RegExp(objectName.toUpperCase(), 'i');
    console.log(regex);
    const cities = await Cities.find({ objectName: { $regex: regex } }, { limit: 50 }).toArray();

    res.json({ cities: [...cities] });
  } catch (error) {
    next(error);
  }
}
export async function findUserCity(req: Request<User, City, {}>, res: Response<City>, next: NextFunction) {
  try {
    const result = await Cities.findOne({
      _id: new ObjectId(req.params.cityId),
    });
    if (!result) {
      res.status(404);
      next(`City with id "${req.params.cityId}" not found.`);
      return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const cities = await Cities.find({}, { limit: 50 }).toArray();

    res.json({ cities: [...cities] });
  } catch (error) {
    next(error);
  }
}
