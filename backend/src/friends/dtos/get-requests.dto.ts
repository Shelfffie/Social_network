import { IsEnum, IsNotEmpty } from 'class-validator';

export enum RequestsStatus {
  PENDING = 'pending',
  REJECTED = 'rejected',
}

export enum RequestsType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export class GetRequestsDto {
  @IsEnum(RequestsStatus)
  @IsNotEmpty()
  status: RequestsStatus;

  @IsEnum(RequestsType)
  type: RequestsType;
}
