import { Module } from '@nestjs/common';

import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import {
  QueryFilter,
  ComparisonOperator,
  CondOperator,
} from '@nestjsx/crud-request';
import {
  ObjectLiteral,
} from 'typeorm';

import { BootstrapModule } from './bootstrap.module';

// @ts-ignore
TypeOrmCrudService.prototype.mapOperatorsToQuery = function(
  cond: QueryFilter,
  param: any,
): { str: string; params: ObjectLiteral } {
  const field = this.getFieldWithAlias(cond.field);
  const likeOperator =
    this.repo.metadata.connection.options.type === 'postgres' ? 'ILIKE' : /* istanbul ignore next */ 'LIKE';
  let str: string;
  let params: ObjectLiteral;

  if (cond.operator[0] !== '$') {
    cond.operator = ('$' + cond.operator) as CondOperator;
  }

  switch (cond.operator) {
    case '$eq':
      str = `${field} = :${param}`;
      break;

    case '$ne':
      str = `${field} != :${param}`;
      break;

    case '$gt':
      str = `${field} > :${param}`;
      break;

    case '$lt':
      str = `${field} < :${param}`;
      break;

    case '$gte':
      str = `${field} >= :${param}`;
      break;

    case '$lte':
      str = `${field} <= :${param}`;
      break;

    case '$starts':
      str = `${field} ${likeOperator} :${param}`;
      params = { [param]: `${cond.value}%` };
      break;

    case '$ends':
      str = `${field} ${likeOperator} :${param}`;
      params = { [param]: `%${cond.value}` };
      break;

    case '$cont':
      str = `${field} ${likeOperator} :${param}`;
      params = { [param]: `%${cond.value}%` };
      break;

    case '$excl':
      str = `${field} NOT ${likeOperator} :${param}`;
      params = { [param]: `%${cond.value}%` };
      break;

    case '$in':
      this.checkFilterIsArray(cond);
      str = `${field} IN (:...${param})`;
      break;

    case '$notin':
      this.checkFilterIsArray(cond);
      str = `${field} NOT IN (:...${param})`;
      break;

    case '$isnull':
      str = `${field} IS NULL`;
      params = {};
      break;

    case '$notnull':
      str = `${field} IS NOT NULL`;
      params = {};
      break;

    case '$between':
      this.checkFilterIsArray(cond, cond.value.length !== 2);
      str = `${field} BETWEEN :${param}0 AND :${param}1`;
      params = {
        [`${param}0`]: cond.value[0],
        [`${param}1`]: cond.value[1],
      };
      break;

    // case insensitive
    // case '$eqL':
    //   str = `LOWER(${field}) = :${param}`;
    //   break;

    // case '$neL':
    //   str = `LOWER(${field}) != :${param}`;
    //   break;

    // case '$startsL':
    //   str = `${field} ${likeOperator} :${param}`;
    //   params = { [param]: `${cond.value}%` };
    //   break;

    // case '$endsL':
    //   str = `${field} ${likeOperator} :${param}`;
    //   params = { [param]: `%${cond.value}` };
    //   break;

    // case '$contL':
    //   str = `${field} ${likeOperator} :${param}`;
    //   params = { [param]: `%${cond.value}%` };
    //   break;

    // case '$exclL':
    //   str = `${field} NOT ${likeOperator} :${param}`;
    //   params = { [param]: `%${cond.value}%` };
    //   break;

    // case '$inL':
    //   this.checkFilterIsArray(cond);
    //   str = `LOWER(${field}) IN (:...${param})`;
    //   break;

    // case '$notinL':
    //   this.checkFilterIsArray(cond);
    //   str = `LOWER(${field}) NOT IN (:...${param})`;
    //   break;

    /* istanbul ignore next */
    default:
      str = `${field} = :${param}`;
      break;
  }

  if (typeof params === 'undefined') {
    params = { [param]: cond.value };
  }

  return { str, params };
}

@Module({
  imports: [BootstrapModule],
})
export class AppModule { }


