import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class IsValidMongooseIdPipe implements PipeTransform {
  transform(id: string): string {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    return id;
  }
}
