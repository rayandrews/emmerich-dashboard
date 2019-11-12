import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Role } from './role.entity';
import { Permission } from './permission.entity';
import { ACLDefinitions } from './access-control.interface';

@Injectable()
export class AccessControlService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  private createRoleArrays(roles: Role[] = []): ACLDefinitions {
    const roleDefinitions = roles.reduce(
      (container, role) => {
        const permissions: ACLDefinitions = role.permissions.map(
          permission => ({
            role: role.name,
            action: permission.action,
            resource: permission.resource.name,
            attributes: permission.attributes,
          }),
        );

        container.concat(permissions);
        return container;
      },
      [] as ACLDefinitions,
    );

    return roleDefinitions;
  }

  async findAllRoles(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findAllPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async createRolesDefinitions(): Promise<ACLDefinitions> {
    const roles = await this.findAllRoles();
    return this.createRoleArrays(roles);
  }
}
