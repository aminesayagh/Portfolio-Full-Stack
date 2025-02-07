import type { IsUnion } from "./is-union";

type DefaultIgnoredTypes =
  | (() => unknown)
  | number
  | string
  | Map<unknown, unknown>
  | Promise<unknown>
  | Date
  | RegExp;

export type KeysAsDotNotation<
  T,
  IgnoredTypes = never,
  Key extends keyof T = keyof T
> = T extends IgnoredTypes | DefaultIgnoredTypes
  ? never
  : T extends (infer ElementType)[]
    ? DistributeDotNotation<ElementType, IgnoredTypes>
    : T extends readonly (infer ElementType)[]
      ? DistributeDotNotation<ElementType, IgnoredTypes>
      : IsUnion<T> extends true
        ? DistributeDotNotation<T, IgnoredTypes>
        : Key extends string
          ?
              | Key
              | `${Key}.${KeysAsDotNotation<Exclude<T[Key], undefined>, IgnoredTypes>}`
          : never;

type DistributeDotNotation<T, IgnoredTypes> = T extends unknown
  ? KeysAsDotNotation<T, IgnoredTypes>
  : never;
