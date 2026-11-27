CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL UNIQUE,
    firstname VARCHAR(100),
    middlename VARCHAR(100),
    lastname VARCHAR(100),
    email VARCHAR(100),
    grade_level VARCHAR(50),
    section VARCHAR(100),
    lrn VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_students_user_id 
    FOREIGN KEY (user_id) REFERENCES users (id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);
