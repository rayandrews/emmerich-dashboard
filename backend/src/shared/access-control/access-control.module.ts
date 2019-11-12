import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessControlService } from './access-control.service';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [AccessControlService],
  exports: [AccessControlService],
})
export class AccessControlModule {}
