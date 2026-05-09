import { IsEnum, IsNotEmpty } from 'class-validator';

export enum RequestsType {
  INCOMING = 'incoming',
  OUTGOING = 'outgoing',
}

export class GetRequestsDto {
  @IsEnum(RequestsType)
  type: RequestsType;
}
