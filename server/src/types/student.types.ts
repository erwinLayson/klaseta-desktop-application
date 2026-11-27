/** Data required to create a student profile and its linked user account. */
export type Student = {
    firstname: string;
    middlename: string;
    lastname: string;
    email: string;
    username: string;
    password?: string;
    gradeLevel?: string | null;
    section?: string | null;
    lrn?: string | null;
};

/** Student row data including the generated user link, used by the data layer. */
export type StudentRecord = Student & {
    userId: number;
};

/** Student fields returned by the API. */
export type PublicStudent = {
    id: number;
    userId: number;
    firstname: string;
    middlename: string;
    lastname: string;
    gradeLevel: string | null;
    section: string | null;
    lrn: string | null;
};

/** Partial set of student fields that may be changed by an update request. */
export type StudentUpdate = {
    firstname?: string;
    middlename?: string;
    lastname?: string;
    userId?: number;
    gradeLevel?: string | null;
    section?: string | null;
    lrn?: string | null;
};
