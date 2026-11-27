export type Teacher = {
    firstname: string,
    middlename: string,
    lastname: string,
    userId: number;
    department?: string | null;
};

export type PublicTeacher = {
    firstname: string,
    middlename: string,
    lastname: string,
    id: number;
    userId: number;
    department: string | null;
};

export type TeacherUpdate = {
    firstname?: string,
    middlename?: string,
    lastname?: string,
    userId?: number,
    department?: string | null,
};
