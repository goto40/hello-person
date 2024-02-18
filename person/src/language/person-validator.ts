import type { ValidationAcceptor, ValidationChecks } from 'langium';
import type { PersonAstType, Person } from './generated/ast.js';
import type { PersonServices } from './person-module.js';

/**
 * Register custom validation checks.
 */
export function registerValidationChecks(services: PersonServices) {
    const registry = services.validation.ValidationRegistry;
    const validator = services.validation.PersonValidator;
    const checks: ValidationChecks<PersonAstType> = {
        Person: validator.checkPersonStartsWithCapital
    };
    registry.register(checks, validator);
}

/**
 * Implementation of custom validations.
 */
export class PersonValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
