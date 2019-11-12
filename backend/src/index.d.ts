import { DynamicModule, Provider } from '@nestjs/common';
import { RolesBuilder } from 'nest-access-control';

declare module 'nest-access-control' {
  export class AccessControlModule {
    /**
     * Register a pre-defined roles
     * @param {RolesBuilder} roles  A list containing the access grant
     * definitions. See the structure of this object in the examples.
     */
    static forRoles(roles: RolesBuilder): DynamicModule;
    static forRootAsync(options: {
      inject?: Provider[];
      useFactory: (...args: any) => RolesBuilder | Promise<RolesBuilder>;
    }): DynamicModule;
  }
}
