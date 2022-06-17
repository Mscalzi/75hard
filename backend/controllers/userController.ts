import { getOne, updateOne, createOne, deleteOne, getAll } from './handlerFactory';
import { Request, Response } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { User } from '../models/User';
import { AppError, catchAsync } from '../utils';

const multerStorage = multer.memoryStorage();

type PhotoFile = File & {
  mimetype: string;
};

const multerFilter = (req: Request, file: PhotoFile, cb: Function) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image, please upload only images', 400), false);
  }
};

export const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single('photo');

// DO SOMETHING WITH THISD AWFUL FUMCTION
export const resizeUserPhoto = async (req: Request, res: Response, next: Function) => {
  // @ts-ignore
  if (!req.file) {
    return next();
  }
  // @ts-ignore
  const file: PhotoFile = req.file;
  // @ts-ignore
  req.file.mimetype = 'image/jpeg';
  // @ts-ignore
  const photoBuffer = await sharp(file.buffer)
  // @ts-ignore
  .resize(500, 500)
  .toBuffer();
  // @ts-ignore
  req.file.buffer = photoBuffer;
  next();
};

const filterObj = (obj: any, ...allowedFields: string[]) => {
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
};

export const updateMe = catchAsync(async (req: Request, res: Response, next: Function) => {
    if (req.body.password || req.body.passwordConfirm) {
      return next(new AppError('This route is not for password updates. Please use /updateMyPassword', 400));
    };
    const filteredBody = filterObj(req.body, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return next(new AppError('No user found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: updatedUser,
    });
});

export const deleteMe = catchAsync(async (req: Request, res: Response, next: Function) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const getMe = (req: Request, res: Response, next: Function) => {
  req.params.id = req.user.id;
  next();
};

export const updateUser = updateOne(User);
export const createUser = createOne(User);
export const getUser = getOne(User);
export const deleteUser = deleteOne(User);
export const getAllUsers = getAll(User);