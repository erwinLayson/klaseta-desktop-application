CREATE TABLE IF NOT EXISTS classrooms (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE,
    section VARCHAR(100),
    grade_level VARCHAR(50),
    description TEXT,
    teacher_id BIGINT,
    academic_year VARCHAR(50),
    semester VARCHAR(50),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT unique_class_teacher_year_semester 
    UNIQUE (code, teacher_id, academic_year, semester),

    CONSTRAINT fk_classrooms_teacher_id 
    FOREIGN KEY (teacher_id) REFERENCES teachers (id) 
    ON DELETE SET NULL ON UPDATE CASCADE
);
