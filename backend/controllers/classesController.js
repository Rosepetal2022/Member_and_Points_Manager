const pool = require('../db');

exports.createClass = async (request, response) => {
    try {
        const { show_id, division_id, class_name } = request.body;
        const newClass = await pool.query(
            "INSERT INTO classes (show_id, division_id, class_name) VALUES ($1, $2, $3) RETURNING *",
            [show_id, division_id, class_name]
        );
        return response.status(201).json({ message: 'Class created', class: newClass.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error creating class' });
    }
};

exports.getClass = async (request, response) => {
    try {
        const { id } = request.params;
        const classInfo = await pool.query("SELECT * FROM classes WHERE class_id = $1", [id]);
        if (classInfo.rows.length === 0) {
            return response.status(404).json({ message: 'Class not found' });
        }
        return response.json(classInfo.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching class' });
    }
};

exports.updateClass = async (request, response) => {
    try {
        const { id } = request.params;
        const { show_id, division_id, class_name } = request.body;
        const updatedClass = await pool.query(
            "UPDATE classes SET show_id = $1, division_id = $2, class_name = $3 WHERE class_id = $4 RETURNING *",
            [show_id, division_id, class_name, id]
        );
        if (updatedClass.rows.length === 0) {
            return response.status(404).json({ message: 'Class not found' });
        }
        return response.json(updatedClass.rows[0]);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error updating class' });
    }
};

exports.deleteClass = async (request, response) => {
    try {
        const { id } = request.params;
        const deletedClass = await pool.query("DELETE FROM classes WHERE class_id = $1 RETURNING *", [id]);
        if (deletedClass.rows.length === 0) {
            return response.status(404).json({ message: 'Class not found' });
        }
        return response.json({ message: 'Class deleted', class: deletedClass.rows[0] });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error deleting class' });
    }
};

exports.getHorseRecord = async (request, response) => {
    try {
        const { horseId } = request.params;
        console.log(horseId)
        const classInfo = await pool.query(
            `SELECT H.Horse_Name, C.Class_Name, S.Show_Name, S.Show_Start_Date, S.Show_End_Date, CR.Place, CR.Points_Earned, CR.Money_Awarded
       FROM Horses H
       LEFT JOIN Class_Entries CE ON H.Horse_Id = CE.Horse_Id
       LEFT JOIN Classes C ON CE.Class_Id = C.Class_id
       LEFT JOIN Shows S On C.Show_Id = S.Show_Id
       LEFT JOIN Class_Results CR ON CE.Entry_Id = CR.Entry_Id
       

       WHERE H.Horse_Id = $1`, [horseId]
        );

        return response.json(classInfo.rows);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching class' });
    }
};

exports.getAllClasses = async (request, response) => {
    try {
        const classInfo = await pool.query("SELECT * FROM Classes");
        return response.json(classInfo.rows);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'Error fetching classes' });
    }
};