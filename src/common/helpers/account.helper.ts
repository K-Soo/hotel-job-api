import { ForbiddenException } from '@nestjs/common';
import { AccountStatus } from '../constants/app.enum';
import { customHttpException } from '../constants/custom-http-exception';

export function handleAccountStatus(status: AccountStatus): void {
  switch (status) {
    case AccountStatus.ACTIVE:
      return;
    case AccountStatus.DEACTIVATED:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_DEACTIVATED);
    case AccountStatus.BLOCKED:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_BLOCKED);
    case AccountStatus.SUSPENDED:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_SUSPENDED);
    case AccountStatus.LOCKED:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_LOCKED);
    case AccountStatus.PENDING:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_PENDING);
    case AccountStatus.ANONYMIZED:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_ANONYMIZED);
    case AccountStatus.RECOVERY:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_RECOVERY);
    case AccountStatus.WAITING_APPROVAL:
      throw new ForbiddenException(customHttpException.ACCOUNT_STATUS_WAITING_APPROVAL);
    default:
      throw new ForbiddenException('Unknown account status');
  }
}
