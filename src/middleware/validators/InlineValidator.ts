import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'inlineValidator', async: false })
export class InlineValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [condition] = args.constraints;
    try{
      return condition(value);
    }catch{}
    return false;
  }

  defaultMessage(args: ValidationArguments): string {
    return `Invalid value: ${args.value}`;
  }
}
