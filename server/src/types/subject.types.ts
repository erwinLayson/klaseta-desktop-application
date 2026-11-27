/** Data required to create a new subject. */
export type Subject = {
    name: string;
    code: string;
    description?: string | null;
    units?: number | null;
    department?: string | null;
    teacherId?: number | null;
    classroomId?: number | null;
};

/** Stored subject record including database identifiers. */
export type SubjectRecord = Subject & {
    id: number;
};

/** Subject fields returned to API clients. */
export type PublicSubject = {
    id: number;
    name: string;
    code: string;
    description: string | null;
    units: number | null;
    department: string | null;
    teacherId: number | null;
    classroomId: number | null;
};

/** Partial set of subject fields that may be updated. */
export type SubjectUpdate = {
    name?: string;
    code?: string;
    description?: string | null;
    units?: number | null;
    department?: string | null;
    teacherId?: number | null;
    classroomId?: number | null;
};
