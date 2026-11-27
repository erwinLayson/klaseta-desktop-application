/** Data required to create a new classroom. */
export type Classroom = {
    name: string;
    code?: string | null;
    section?: string | null;
    gradeLevel?: string | null;
    description?: string | null;
    teacherId?: number | null;
    academicYear?: string | null;
    semester?: string | null;
};

/** Stored classroom record including database identifiers. */
export type ClassroomRecord = Classroom & {
    id: number;
};

/** Classroom fields returned to API clients. */
export type PublicClassroom = {
    id: number;
    name: string;
    code: string | null;
    section: string | null;
    gradeLevel: string | null;
    description: string | null;
    teacherId: number | null;
    academicYear: string | null;
    semester: string | null;
};

/** Partial set of classroom fields that may be updated. */
export type ClassroomUpdate = {
    name?: string;
    code?: string | null;
    section?: string | null;
    gradeLevel?: string | null;
    description?: string | null;
    teacherId?: number | null;
    academicYear?: string | null;
    semester?: string | null;
};
