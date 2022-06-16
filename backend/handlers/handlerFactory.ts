import { Models } from '../models';
import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../utils/AppError';

export const getOne = (Model: Models) => {
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const model = await Model.findById(req.params.id);
    if (!model) {
      return next(new AppError(`No ${Model.modelName} found with that ID`, 404));
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
      return next(new AppError(`No ${Model.modelName} found with that ID`, 404));
    }
    return res.status(201).json({
      status: 'success',
      data: model,
    });
  });
};

export const deleteOne = async (Model: Models) => {
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const model = await Model.findByIdAndDelete(req.params.id);
    if (!model) {
      return next(new AppError(`No ${Model.modelName} found with that ID`, 404));
    }
    return res.sendStatus(204);
  });
};

export const updateOne = async (Model: Models) => {
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const model = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!model) {
      return next(new AppError(`No ${Model.modelName} found with that ID`, 404));
    }
    return res.status(200).json({
      status: 'success',
      data: model,
    });
  });
}