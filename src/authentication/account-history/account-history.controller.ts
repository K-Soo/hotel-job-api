import { Controller } from '@nestjs/common';
import { AccountHistoryService } from './account-history.service';

@Controller('account-history')
export class AccountHistoryController {
  constructor(private readonly accountHistoryService: AccountHistoryService) {}
}
