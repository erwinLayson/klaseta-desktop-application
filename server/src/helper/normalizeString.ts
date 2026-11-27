/**
 * Trims and lowercases a string, typically used to normalize emails before lookup.
 * @param input - Value to normalize.
 * @returns The trimmed, lowercase string.
 * @throws TypeError if the input is not a string.
 */
export function normalizeString(input: unknown): string {
    if (typeof input !== "string") {
        throw new TypeError("Input must be a string");
    }
    
    return input.trim().toLocaleLowerCase();
}
