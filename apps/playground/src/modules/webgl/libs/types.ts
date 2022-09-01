export type TControllerType = "keyboard" | "mouse";
export type TInputType = "analog" | "digital";

/** User defined input configuration. can have optionals */
export type UserInputConfiguration<
  C extends TControllerType,
  T extends TInputType,
  A extends Readonly<string>
> = {
  readonly controller: C;
  readonly inputs: string[];
  readonly scale?: number;
  readonly name?: string;
  readonly type?: T;
  readonly axis?: A;
};

/** shape of a typed configuration for axis control.
 * coded and finalized are different due to possible changes
 * in API that would require doing changes in code.
 * Also allows to have optional values too and fill them later
 */
export type TConfigurationSource<
  CT extends TControllerType = TControllerType,
  IT extends TInputType = TInputType,
  A extends Readonly<string> = Readonly<string>,
  Config extends UserInputConfiguration<CT, IT, A> = UserInputConfiguration<
    CT,
    IT,
    A
  >
> = Readonly<{ [key in A]: readonly Config[] }>;

/** Finalized configuration types, after parsing */
export type InputConfiguration<
  A extends Readonly<string> = Readonly<string>,
  CT extends TControllerType = TControllerType,
  IT extends TInputType = TInputType,
  Source extends UserInputConfiguration<CT, IT, A> = UserInputConfiguration<CT, IT, A>
> = { [Key in keyof Source]-?: Source[Key] };

/** finalized configuration object for axis controls */
export type TConfiguration<
  A extends Readonly<string> = Readonly<string>,
  CT extends TControllerType = TControllerType,
  IT extends TInputType = TInputType,
  Source extends UserInputConfiguration<CT, IT, A> = UserInputConfiguration<
    CT,
    IT,
    A
  >,
  Config extends InputConfiguration<A, CT, IT, Source> = InputConfiguration<
    A,
    CT,
    IT,
    Source
  >
> = Readonly<{ [key in A]: readonly Config[] }>;
