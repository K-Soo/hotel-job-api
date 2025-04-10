import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsTrue(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isTrue',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return value === true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be true.`;
        },
      },
    });
  };
}
