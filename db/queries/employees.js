import express from "express";
import db from "../client.js";
// import pkg from "pg";
// const  {Pool} = pkg;
// const pool = new Pool ({connectionString: process.env.DATABASE_URL}) 

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  //TODO
  try {
    const sql =`
    INSERT INTO employees (name, birthday, salary)
    VALUES ($1, $2, $3)
    RETURNING *;    
    `;
    const values = [name, birthday, salary];
    const {rows} = await db.query(sql, values);
    console.log("New Employee Added", rows [0]);
    return rows [0];
  } catch (error) {
    console.error("Error Creating New Employee",error);
    throw error;
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  //TODO
  try {
    const result = await db.query("SELECT * FROM employees")
    return result.rows
  } catch (error) {
    console.error("Error",error)
  }
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */

// SQL statement is going to return all columns from employee where the id number equals the value we insert
//const values = [id] creates an array named values
//db.query sends the SQL statement and the values to PostgreSQL; { rows } is destructuring and extracts only the rows field
//rows[0] is the employee onject, if it exists; it will return undefined if the id doesn't match any of the employee ids
export async function getEmployee(id) {
  // TODO
  try {
    const sql =`
    SELECT *
    FROM employees 
    WHERE id = $1;
    `;
  
    const values = [id];
    const {rows} = await db.query(sql,values);
    return rows [0];
  } catch (error) {
    console.error('Error getting employee by id', error);
    throw error;
  }
  //do the id and understand that it comes back from the string--try & catch block with the db query
  //then you're going to use a selector with the db query SELECT * FROM employees WHERE id = $1 (**something like this)
  //then a comma and then id and that'll give you the result, and then you'll have to handle that result with that row
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ idNumber, name, birthday, salary }) {
  // TODO
  try {
    const sql = `
    UPDATE employees
    SET name = $1,
        birthday = $2,
        salary = $3
    WHERE id = $4
    RETURNING *;
    `;

    const values = [name, birthday, salary, idNumber];
    const { rows } = await db.query(sql, values)
    return rows[0]; //undefined if no employee is found
  } catch (error) {
    console.error(`Error updating employee with id {id}`, error)
  }
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  try {
    const sql = `
    DELETE FROM employees
    WHERE id = $1
    RETURNING *;  
    `;

    const values = [id];
    const {rows} = await db.query(sql,values);
    return rows [0];
  } catch (error) {
    console.error (`Error deleting employee with id ${id}`,error)
    throw error;
  }
}
