import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { SerializeInterceptor } from '../../common/interceptors/serialize.interceptor';

@Controller('employers')
export class EmployersController {
  constructor(private readonly employersService: EmployersService) {}

  @Post()
  @UseInterceptors(new SerializeInterceptor(CreateEmployerDto))
  create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employersService.create(createEmployerDto);
  }

  @Get()
  findAll() {
    return this.employersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    return this.employersService.update(+id, updateEmployerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.remove(+id);
  }
}
