import { Global, Module } from '@nestjs/common';

import {
  AccessControlModule as BaseAccessControlModule,
  RolesBuilder,
} from 'nest-access-control';

import { AuthModule } from './auth/auth.module';

import { AccessControlModule } from './access-control/access-control.module';
import { AccessControlService } from './access-control/access-control.service';

@Global()
@Module({
  imports: [
    AuthModule,
    AccessControlModule,
    BaseAccessControlModule.forRootAsync({
      useFactory: async (
        accessControlService: AccessControlService,
      ): Promise<RolesBuilder> => {
        const role = await accessControlService.createRolesDefinitions();

        return new RolesBuilder(role);
      },
      inject: [AccessControlService],
    }),
  ],
  exports: [AuthModule, AccessControlModule],
})
export class SharedModule {}
