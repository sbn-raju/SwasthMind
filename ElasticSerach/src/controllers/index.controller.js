import pool from '../db/index.db.js';
const indexController = async(req,res)=>{
  let Stdid = 11;
  const client = await pool.connect();
  try {
      await client.query('BEGIN'); // Start a transaction
      const deleteQuery = 'DELETE FROM student_performance WHERE student_id = $1 RETURNING *';
      const deleteValue = [Stdid];
      const result = await client.query(deleteQuery, deleteValue);
      if(result.rowCount === 0){
            throw new Error("Student not Found");
      }
      let state = 'No';
      if(state == 'Yes'){
      await client.query('COMMIT'); // Commit the transaction if everything is successful
      res.status(200).json({ message: 'Commited succefully', data: result.rows[0] });
      }
      else if(state == 'No'){
       await client.query('ROLLBACK'); // Rollback the transaction if there's an error
       res.status(200).json({ message: 'Rolled Back succefully', data: result.rows[0] });
      }
      
     
  } catch (error) {
    await client.query('ROLLBACK');
      console.error(error);
      res.status(500).json({ message: 'Operation rolled back due to an error' });
  } finally {
      client.release();
  }
}
export default indexController 