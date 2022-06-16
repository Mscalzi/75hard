import { Models } from '../models';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';

export const getOne = (Model: Models) => {
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return res.status(404).send('Not found');
    }
    return res.status(200).json({
      status: 'success',
      data: model,
    });
  });
};

export const getAll = async (Model: Models) => {
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const models = await Model.find();
    return res.status(200).json({
      status: 'success',
      data: models,
    });
  });
};

export const createOne = async (Model: Models) => {
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const model = await Model.create(req.body);
    if (!model) {
      return res.status(400).send('Bad request');
    }
    return res.status(201).json({
      status: 'success',
      data: model,
    });
  });
};
