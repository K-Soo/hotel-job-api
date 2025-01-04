import { Injectable } from '@nestjs/common';
import { EmployersService } from '../employers/employers.service';

@Injectable()
export class VerificationsService {
  constructor(private readonly employersService: EmployersService) {}

  findEmployerUserId(userId: string) {
    return this.employersService.findOneUserId(userId);
  }
}
