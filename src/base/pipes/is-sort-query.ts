import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsSortQuery(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsSortQuery',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsSortQueryValidator,
    });
  };
}

@ValidatorConstraint()
export class IsSortQueryValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(value: any, _args: ValidationArguments) {
    return (
      typeof value === 'object' &&
      Object.values(value).every((s: string) => ['desc', 'asc'].includes(s))
    );
  }

  defaultMessage(_args: ValidationArguments) {
    return `${_args.property} must be a Record<string, 'desc' | 'asc'>`;
  }
}
