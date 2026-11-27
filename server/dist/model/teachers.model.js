import ServerError from "../types/server-error.js";
/** Maps a raw database row to the camelCase `PublicTeacher` shape used by the API. */
const toPublicTeacher = (row) => ({
    firstname: row.firstname,
    middlename: row.middlename,
    lastname: row.lastname,
    id: row.id,
    userId: row.user_id,
    department: row.department,
});
/** Data-access layer for the `teachers` table; each instance works on one pooled connection. */
class Teachers {
    connection;
    /** @param connection - Connection borrowed from the pool for this unit of work. */
    constructor(connection) {
        this.connection = connection;
    }
    /**
     * Inserts a teacher profile linked to an existing user.
     * @param teacher - Teacher name, generated user link, and optional department.
     * @returns The generated teacher id.
     */
    async createTeacher(teacher) {
        try {
            const { userId, department, firstname, middlename, lastname } = teacher;
            const query = `INSERT INTO teachers (user_id, department, firstname, middlename, lastname) VALUES (?, ?, ?, ?, ?)`;
            const values = [userId, department ?? null, firstname, middlename, lastname];
            const [result] = await this.connection.execute(query, values);
            return result.insertId;
        }
        catch (err) {
            throw new ServerError(err, "Internal Server Error");
        }
    }
    /** Returns every teacher, ordered by id. */
    async findAll() {
        try {
            const [rows] = await this.connection.execute(`SELECT id, user_id, department, firstname, middlename, lastname FROM teachers ORDER BY id`);
            return rows.map(toPublicTeacher);
        }
        catch (err) {
            throw new ServerError(err);
        }
    }
    /**
     * Finds a teacher by primary key.
     * @returns The teacher, or `null` when no row matches.
     */
    async findById(id) {
        try {
            const [rows] = await this.connection.execute(`SELECT id, user_id, department, firstname, middlename, lastname FROM teachers WHERE id = ?`, [id]);
            const row = rows[0];
            return row ? toPublicTeacher(row) : null;
        }
        catch (err) {
            throw new ServerError(err);
        }
    }
    /**
     * Finds the teacher profile associated with a user id.
     * @returns The teacher, or `null` when the user has no teacher profile.
     */
    async findByUserId(userId) {
        try {
            const [rows] = await this.connection.execute(`SELECT id, user_id, department, firstname, middlename, lastname FROM teachers WHERE user_id = ?`, [userId]);
            const row = rows[0];
            return row ? toPublicTeacher(row) : null;
        }
        catch (err) {
            throw new ServerError(err);
        }
    }
    /**
     * Updates only the provided fields of a teacher row.
     * @returns `true` when at least one row was affected.
     */
    async updateById(id, changes) {
        try {
            const sets = [];
            const values = [];
            if (changes.userId !== undefined) {
                sets.push("user_id = ?");
                values.push(changes.userId);
            }
            if (changes.department !== undefined) {
                sets.push("department = ?");
                values.push(changes.department ?? null);
            }
            if (changes.firstname !== undefined) {
                sets.push("firstname = ?");
                values.push(changes.firstname);
            }
            if (changes.middlename !== undefined) {
                sets.push("middlename = ?");
                values.push(changes.middlename);
            }
            if (changes.lastname !== undefined) {
                sets.push("lastname = ?");
                values.push(changes.lastname);
            }
            if (sets.length === 0) {
                return false;
            }
            const query = `UPDATE teachers SET ${sets.join(", ")} WHERE id = ?`;
            const [result] = await this.connection.execute(query, [...values, id]);
            return result.affectedRows > 0;
        }
        catch (err) {
            throw new ServerError(err);
        }
    }
    /**
     * Deletes a teacher row by primary key.
     * @returns `true` when a row was actually removed.
     */
    async deleteById(id) {
        try {
            const [result] = await this.connection.execute(`DELETE FROM teachers WHERE id = ?`, [id]);
            return result.affectedRows > 0;
        }
        catch (err) {
            throw new ServerError(err);
        }
    }
}
export default Teachers;
//# sourceMappingURL=teachers.model.js.map