import { type Module, inject } from 'langium';
import { createDefaultModule, createDefaultSharedModule, type DefaultSharedModuleContext, type LangiumServices, type LangiumSharedServices, type PartialLangiumServices } from 'langium/lsp';
import { HelloGeneratedModule, HelloGeneratedSharedModule } from './generated/module.js';
import { HelloValidator, registerValidationChecks } from './hello-validator.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type HelloAddedServices = {
    validation: {
        HelloValidator: HelloValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type HelloServices = LangiumServices & HelloAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const HelloModule: Module<HelloServices, PartialLangiumServices & HelloAddedServices> = {
    validation: {
        HelloValidator: () => new HelloValidator()
    }
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createHelloServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    Hello: HelloServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        HelloGeneratedSharedModule
    );
    const Hello = inject(
        createDefaultModule({ shared }),
        HelloGeneratedModule,
        HelloModule
    );
    shared.ServiceRegistry.register(Hello);
    registerValidationChecks(Hello);
    return { shared, Hello };
}