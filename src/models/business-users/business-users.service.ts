import { Injectable } from '@nestjs/common';
import { CreateBusinessUserDto } from './dto/create-business-user.dto';
import { UpdateBusinessUserDto } from './dto/update-business-user.dto';

@Injectable()
export class BusinessUsersService {
  create(createBusinessUserDto: CreateBusinessUserDto) {
    console.log('createBusinessUserDto: ', createBusinessUserDto);
    return 'This action adds a new businessUser';
  }

  findAll() {
    return `This action returns all businessUsers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessUser`;
  }

  update(id: number, updateBusinessUserDto: UpdateBusinessUserDto) {
    return `This action updates a #${id} businessUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessUser`;
  }
}
