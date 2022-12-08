import User from "../models/employeeModel.js";

export const getemployee = async (req, res) => {
    try {
        const response = await User.findAll();
        let resp = {};
        resp.error = false
        resp.data = response;
        resp.msg = "Employee list data";
        resp.status = 200;
        // res.status(200).json(resp);
        res.json(resp);
    } catch (error) {
        console.log(error.message);
    }
}

export const getemployeeById = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        let resp = {};
        resp.data = response;
        resp.msg = "Employee Id data";
        resp.status = 200;
        res.status(200).json(resp);
    } catch (error) {
        console.log(error.message);
    }
}

export const create_employee = async (req, res) => {
    try {
        await User.create(req.body);
        let resp = {};
        resp.status = 201;
        resp.msg = "New Employee Created";
        res.status(201).json(resp);
    } catch (error) {
        console.log(error.message);
    }
}


export const update_employee = async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        let resp = {};
        resp.status = 200;
        resp.msg = "Employee data update successfully";
        res.status(200).json(resp);
        // res.json(resp);
    } catch (error) {
        console.log(error.message);
    }
}

export const delete_employee = async (req, res) => {
    try {
        let toBeDeleted = await User.findAll({
            where: {
                id: req.params.id
            }
            
          });
          const response = await toBeDeleted.destroy({
            })
        await toBeDeleted.destroy()
        res.status(200).json({ msg: "employee detail Deleted" })
    
    } catch (error) {
        console.log(error.message);
    }
}


// const codes = [200, 201, 400, 401, 404, 403, 422, 500];
// const findCode = codes.find((code) => code == statusCode);
// if (!findCode) statusCode = 500;
// else statusCode = findCode;

// return {
//   message,
//   code: statusCode,
//   error: true
// };
// };
// 