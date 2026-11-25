class Users {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async createUser(user) {
        const { email, password, username } = user;
        const query = `INSERT INTO users (email, password, username) VALUES (?, ?, ?)`;
        const [result] = await this.connection.execute(query, [email, password, username]);
        return result.insertId;
    }
    async findAll() {
        const [rows] = await this.connection.execute(`SELECT id, email, username FROM users ORDER BY id`);
        return rows;
    }
    async findById(id) {
        const [rows] = await this.connection.execute(`SELECT id, email, username FROM users WHERE id = ?`, [id]);
        return rows[0] ?? null;
    }
    async findByEmail(email) {
        const [rows] = await this.connection.execute(`SELECT id, email, username, password FROM users WHERE email = ?`, [email]);
        return rows[0] ?? null;
    }
    async findByUsername(username) {
        const [rows] = await this.connection.execute(`SELECT id, email, username, password FROM users WHERE username = ?`, [username]);
        return rows[0] ?? null;
    }
    async updateById(id, changes) {
        const sets = [];
        const values = [];
        if (changes.email !== undefined) {
            sets.push("email = ?");
            values.push(changes.email);
        }
        if (changes.username !== undefined) {
            sets.push("username = ?");
            values.push(changes.username);
        }
        if (changes.password !== undefined) {
            sets.push("password = ?");
            values.push(changes.password);
        }
        if (sets.length === 0) {
            return false;
        }
        const query = `UPDATE users SET ${sets.join(", ")} WHERE id = ?`;
        const [result] = await this.connection.execute(query, [...values, id]);
        return result.affectedRows > 0;
    }
    async deleteById(id) {
        const [result] = await this.connection.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return result.affectedRows > 0;
    }
}
export default Users;
//# sourceMappingURL=users.model.js.map