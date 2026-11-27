/** Data required to create a teacher profile linked to an existing user. */
export type Teacher = {
    firstname: string,
    middlename: string,
    lastname: string,
    userId: number;
    department?: string | null;
};

/** Teacher fields returned by the API. */
export type PublicTeacher = {
    firstname: string,
    middlename: string,
    lastname: string,
    id: number;
    userId: number;
    department: string | null;
};

/** Partial set of teacher fields that may be changed by an update request. */
export type TeacherUpdate = {
    firstname?: string,
    middlename?: string,
    lastname?: string,
    userId?: number,
    department?: string | null,
};
