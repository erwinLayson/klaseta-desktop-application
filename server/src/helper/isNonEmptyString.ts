/**
 * Checks that a value is a string containing at least one non-whitespace character.
 * Also narrows the value to `string` for TypeScript.
 */
export const isNonEmptyString = (value: unknown): value is string =>
    typeof value === "string" && value.trim().length > 0;
