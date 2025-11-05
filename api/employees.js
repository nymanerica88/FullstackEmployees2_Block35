import express from "express";
const router = express.Router();

// TODO: this file!
import { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } from "../db/queries/employees.js";

// GET /employees router
router.get("/", async (request, response, next) => {
    try {
        const employees = await getEmployees()
        response.status(200).json(employees);
    } catch (error) {
    console.error("Error Fetching Employees",error)
    next(error);
    }
});

//GET/employees/:id router
//id number has to be converted to a number, and not a string because the prompt indivates that it must be a positive integer
router.get("/:id", async (request, response, next) => {
    try {
        const {id} = request.params

        const idNumber = Number(id);
        if (!Number.isInteger(idNumber) || idNumber <= 0) {
            return response.status(400).json({error:"ID must be a positive integer"});
        }

        const employee = await getEmployee(idNumber);
        if (!employee) {
            return response.status(404).json({error:"Employee does not exist"});
        }

        response.status(200).json(employee);
    } catch (error) {
        console.error(`Error fetching employee with ID ${request.params.id}:`,error);
        next(error);
    }
});

//POST /employees
router.post("/", async (request, response, next) => {
    try {
        const { name, birthday, salary } = request.body;

        if (!request.body) {
            return response.status(400).json({error: "Request body is missing and is required"});
        }

        if (!name || !birthday || !salary) {
            return response.status(400).json ({error: "Missing required fields"});
        }

        const newEmployee = await createEmployee({name, birthday, salary});
        
        response.status(201).json(newEmployee);

    } catch (error) {
        console.error("Error creating new employee:",error);
        next(error);
    }
});

//DELETE employees/:id
//difference between response.status and response.sendStatus is that response.status doesn't send the response automatically,but response.sendStatus does
router.delete("/:id", async(request, response, next) => {
    try {
        const {id} = request.params

        const idNumber = Number(id);
        if(!Number.isInteger(idNumber) || idNumber <= 0) {
            return response.status(400).json({error:"ID must be a positive integer"});
        }

        const deletedEmployee = await deleteEmployee(idNumber);
        if (!deletedEmployee) {
            return response.status(404).json({error:"Employee does not exist"});
        }

        response.sendStatus(204);
    } catch (error) {
        console.error(`Error deleting employee ${request.params.id}`, error);
        next(error);
    }
});



//**PUT /employees/:id router
router.put("/:id", async (request, response, next) => {
    try {
        const {id} = request.params
        const {name, birthday, salary} = request.body

        const idNumber = Number(id);
        if(!Number.isInteger(idNumber) || idNumber <= 0) {
            return response.status(400).json({error:"ID must be a positive integer"});
        }
        
        if (!request.body) {
            return response.status(400).json({error:"Request body was not provided and is required"});
        }

        if (!name || !birthday || !salary) {
            return response.status(400).json ({error: "Missing required fields"});
        }

        const updatedEmployee = await updateEmployee({
            idNumber,
            name,
            birthday,
            salary,
        });

        if (!updatedEmployee) {
            return response.status(404).json({error:"Employee does not exist"});
        }
        response.status(200).json({updatedEmployee});
    } catch (error) {
      console.error(`Error updating employee ${request.params.id}`,error)
      next(error);  
    }
});


export default router;