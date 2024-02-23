import { DefaultScopeProvider, ReferenceInfo, Scope } from "langium";
import { HelloServices } from "./hello-module.js";
//import { isGreeting, isPersonFromOtherModel } from "./generated/ast.js";
//import { isModel as isPersonModel } from "person";

export class HelloScopeProvider extends DefaultScopeProvider {

  services: HelloServices;

  constructor(services: HelloServices) {
    super(services);
    this.services = services;
  }

  override getScope(context: ReferenceInfo): Scope {
    // target element of member calls
    /*
   if (context.property === 'person' && isGreeting(context.container)) {
      console.log('scope:greeting... %o',this.services.shared.workspace.LangiumDocuments.all.map(d=>d.parseResult.value).filter(isPersonModel).flatMap(m=>m.persons).filter(isPersonFromOtherModel).map(p=>p.name).toArray());
      const allPersons = this.services.shared.workspace.LangiumDocuments.all.map(d=>d.parseResult.value).filter(isPersonModel).flatMap(m=>m.persons).filter(isPersonFromOtherModel).toArray();
      return this.createScopeForNodes(allPersons);
    }
    */
    return super.getScope(context);
}
}