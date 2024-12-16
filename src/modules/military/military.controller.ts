import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { MilitaryService } from './military.service';
import { UpdateMilitaryDto } from './dto/update-military.dto';

@Controller('military')
export class MilitaryController {
  constructor(private readonly militaryService: MilitaryService) {}

  @Get()
  findAll() {
    return this.militaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.militaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMilitaryDto: UpdateMilitaryDto) {
    return this.militaryService.update(+id, updateMilitaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.militaryService.remove(+id);
  }
}
