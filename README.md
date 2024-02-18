# Example combining two languages from separate langium projects

This is an example to support [this discussion](https://github.com/eclipse-langium/langium/discussions/1375)

What did I do?

* Created a workspace to hold my langium projects (in order to make them find each other w/o installing them)
* Created 2x a "Hello World" example with `yo langium` (v3.0.0 preview):
  * one named "Hello" in folder `hello`
  * one named "Person" in folder `person`.
  * **Goal**: make `hello` reference persons from `person`.
* Removed parts of the grammars (`Person` form "Hello", and `Greeting` from "Person")
* Added a Placeholder Ast Node `PersonFromOtherModel` to allow defining a reference:

  ```
  interface PersonFromOtherModel {
      name: string
  }
  ```

* Separated the project `person` into a lib `person` and the vscode extension, since I was not able to define a lib (`"main"`-entry in `package.json`) *and* a vscode extension.
* Included the `person` lib in the `hello` package.
* Modified the [`hello-module.ts`](./hello/src/language/hello-module.ts) in order to include the person services, as depited in the discussion.
* There, I added a `CommonAstReflection` **w/o merging anything** - here, I need to put some more work!
* Added [scope provider](./hello/src/language/hello-scope.ts) to allow extracting the `Persons` for a `Greeting`.
  * **I do not think that is the preferred way...**
  * The scope provider works "after a while" - it seems to require that the "Person" model is parsed...
