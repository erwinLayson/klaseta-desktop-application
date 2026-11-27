import { describe, it, expect } from "vitest";
import { isNonEmptyString } from "../helper/isNonEmptyString.js";
import { normalizeString } from "../helper/normalizeString.js";
import isValidEnv from "../helper/isValidEnv.js";

describe("Helper Functions", () => {
    describe("isNonEmptyString", () => {
        it("should return true for valid non-empty strings", () => {
            expect(isNonEmptyString("hello")).toBe(true);
            expect(isNonEmptyString("  hello  ")).toBe(true);
            expect(isNonEmptyString("a")).toBe(true);
        });

        it("should return false for empty or whitespace-only strings", () => {
            expect(isNonEmptyString("")).toBe(false);
            expect(isNonEmptyString("   ")).toBe(false);
            expect(isNonEmptyString("\t\n")).toBe(false);
        });

        it("should return false for non-string values", () => {
            expect(isNonEmptyString(null)).toBe(false);
            expect(isNonEmptyString(undefined)).toBe(false);
            expect(isNonEmptyString(123)).toBe(false);
            expect(isNonEmptyString(true)).toBe(false);
            expect(isNonEmptyString({})).toBe(false);
            expect(isNonEmptyString([])).toBe(false);
        });
    });

    describe("normalizeString", () => {
        it("should trim and lowercase the string", () => {
            expect(normalizeString("  HELLO@Example.Com  ")).toBe("hello@example.com");
            expect(normalizeString("TEST")).toBe("test");
            expect(normalizeString("  already lowercase  ")).toBe("already lowercase");
        });

        it("should throw a TypeError if input is not a string", () => {
            expect(() => normalizeString(null)).toThrow(TypeError);
            expect(() => normalizeString(null)).toThrow("Input must be a string");
            expect(() => normalizeString(undefined)).toThrow(TypeError);
            expect(() => normalizeString(123)).toThrow(TypeError);
            expect(() => normalizeString({})).toThrow(TypeError);
        });
    });

    describe("isValidEnv", () => {
        const testKey = "TEST_ENV_VAR_UNIT_TEST";

        it("should return the environment variable value when defined", () => {
            process.env[testKey] = "secret_value_123";
            const result = isValidEnv(testKey);
            expect(result).toBe("secret_value_123");
            delete process.env[testKey];
        });

        it("should throw an error when the environment variable is not defined", () => {
            delete process.env[testKey];
            expect(() => isValidEnv(testKey)).toThrow(
                `Environment variable ${testKey} is not set or is empty.`
            );
        });
    });
});
