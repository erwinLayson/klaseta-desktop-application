/** Data required to create a teacher profile and its linked user account. */
export type Teacher = {
    firstname: string,
    middlename: string,
    lastname: string,
    email: string,
    username: string,
    password?: string,
    department?: string | null,
};

/** Teacher row data including the generated user link, used by the data layer. */
export type TeacherRecord = Teacher & {
    userId: number;
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
