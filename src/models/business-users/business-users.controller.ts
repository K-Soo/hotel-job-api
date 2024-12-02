import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessUsersService } from './business-users.service';
import { CreateBusinessUserDto } from './dto/create-business-user.dto';
import { UpdateBusinessUserDto } from './dto/update-business-user.dto';

@Controller('business-users')
export class BusinessUsersController {
  constructor(private readonly businessUsersService: BusinessUsersService) {}

  @Post()
  create(@Body() createBusinessUserDto: CreateBusinessUserDto) {
    return this.businessUsersService.create(createBusinessUserDto);
  }

  @Get()
  findAll() {
    return this.businessUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessUsersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessUserDto: UpdateBusinessUserDto) {
    return this.businessUsersService.update(+id, updateBusinessUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessUsersService.remove(+id);
  }
}
