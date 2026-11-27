/**
 * Checks that a value is a string containing at least one non-whitespace character.
 * Also narrows the value to `string` for TypeScript.
 */
export const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
//# sourceMappingURL=isNonEmptyString.js.map