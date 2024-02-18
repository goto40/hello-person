import type { ValidationChecks } from 'langium';
import type { HelloAstType } from './generated/ast.js';
import type { HelloServices } from './hello-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: HelloServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.HelloValidator;
    const checks: ValidationChecks<HelloAstType> = {
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class HelloValidator {


}
