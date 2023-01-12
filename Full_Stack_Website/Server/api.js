//TODO:
// 1. add a new router

const dboperation = require('./dboperation');
//var Customer = require('./Customer');
//var Address = require('./Address');
//var Employee = require('./Employee');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();
var config = require('./dbconfig');
const mssql = require('mssql');
const md5 = require('md5-node');
const {
    v4: uuidv4
} = require('uuid');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())
app.use('/api', router);
const globals = {
    db: null
}

mssql.connect(config, (err) => {
    if (err) console.log(err);
    globals.db = new mssql.Request();
});

// this router is for login stuff
router.use((req, res, next) => {
    // todo: test token for all the routers other than login and register, proceed if token is valid
    // if (req.url.includes("login") || req.url.contain("register") ){
    //     next();
    // }else{
    //     next();
    // }
    next();
})

router.route('/login').post(async (request, response) => {
    const {
        username,
        password
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Username', mssql.VarChar(50), username)
            .execute('GetUser')
        console.log(data.recordset)
        if (data && data["recordset"] && data["recordset"][0]) {
            const {
                PasswordSalt,
                PasswordHash
            } = data["recordset"][0]
            const inputHash = md5(PasswordSalt + md5(password))
            console.log(PasswordSalt, PasswordHash)
            if (PasswordHash === inputHash) {
                const token = uuidv4()
                response.json({
                    code: 0,
                    msg: 'Login successful',
                    token
                });
            } else {
                response.json({
                    code: -1,
                    msg: 'Login failed'
                    // ,token
                });
            }
        }
    } catch (err) {
        console.log(err)
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})

// router.route('/login').post((request, response)=>{   
//     const {username, password} = request.body
//     let sql=`exec [dbo].[GetUser] @username = '${username}'`
//     globals.db.query(sql, (err, data) => {
//         if (err)  {
//             console.log(err)
//             return response.json({
//                 code: -1,
//                 msg: err.message
//             });
//         }
//         console.log(data)
//         if (data && data["recordset"] && data["recordset"][0]) {
//             const {
//                 PasswordSalt,
//                 PasswordHash} = data["recordset"][0]
//             const inputHash = md5(PasswordSalt + md5(password))
//             console.log(PasswordSalt,PasswordHash)
//             if (PasswordHash === inputHash) {
//                 const token = uuidv4()
//                 response.json({
//                     code: 0,
//                     msg: 'Login successful',
//                     token
//                 });
//                 // const inserSql = `INSERT  INTO  UserInfo (
//                 //     Username,
//                 //     token
//                 // )
//                 // VALUES (
//                 //     '${username}',
//                 //     '${token}'
//                 // )`
//                 // globals.db.query(inserSql, (err, result)=>{
//                 //     console.log(result)
//                 //     if(err){
//                 //         console.log(err.message);
//                 //         response.json({
//                 //             code:-1,
//                 //             msg:err.message,

//                 //         });
//                 //     }else{
//                 //         response.json({
//                 //             code: 0,
//                 //             msg: 'login successful',
//                 //             token
//                 //         });
//                 //     }
//                 // })
//             } else {
//                 response.json({
//                     code: -1,
//                     msg: 'incorrect username or password'
//                 });
//             }
//         } else {
//             response.json({
//                 code: -1,
//                 msg: 'incorrect username or password'
//             });
//         }
//     })
// })

router.route('/register').post(async (request, response) => {
    const {
        username,
        password
    } = request.body;
    const PasswordSalt = uuidv4();
    const PasswordHash = md5(PasswordSalt + md5(password));
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Username', mssql.VarChar(50), username)
            .input('PasswordSalt', mssql.VarChar(50), PasswordSalt)
            .input('PasswordHash', mssql.VarChar(50), PasswordHash)
            .execute('AddUser');
        console.log(data)
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Register successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Register failed'
            });
        }
    } catch (err) {
        console.log(err)
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})

// Employee Router Section Start______________________________________________________________________________________________________________________________________________________________________________

router.route('/Employee').get((request, response) => {
    dboperation.getEmployee().then(result => {
        response.json(result[0]);
    })
})

router.route('/Employee/search').post(async (request, response) => {
    let emp = {
        ...request.body
    }
    let result = await dboperation.searchEmployee(emp);
    response.status(201).json(result);
})

router.route('/Employee/add').post(async (request, response) => {
    const {
        Name,
        SSN,
        Position,
        PhoneNumber,
        Salary,
        Province,
        City,
        District,
        Street,
        ZipCode,
        EmployedYear,
        EmployedMonth,
        BirthYear,
        BirthMonth,
        CreditCardNumber,
        Manager
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Name', mssql.VarChar(30), Name)
            .input('SSN', mssql.Char(18), SSN)
            .input('Position', mssql.VarChar(30), Position)
            .input('PhoneNumber', mssql.Char(11), PhoneNumber)
            .input('Salary', mssql.Money, Salary)
            .input('Province', mssql.VarChar(24), Province)
            .input('City', mssql.VarChar(24), City)
            .input('District', mssql.VarChar(24), District)
            .input('Street', mssql.VarChar(24), Street)
            .input('ZipCode', mssql.VarChar(24), ZipCode)
            .input('EmployedYear', mssql.Int, EmployedYear)
            .input('EmployedMonth', mssql.SmallInt, EmployedMonth)
            .input('BirthYear', mssql.Int, BirthYear)
            .input('BirthMonth', mssql.SmallInt, BirthMonth)
            .input('CreditCardNumber', mssql.VarChar(19), CreditCardNumber)
            .input('Manager', mssql.VarChar(30), Manager)
            .execute('AddEmployee');
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Add successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Add failed'
            });
        }
    } catch (err) {
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }

})






router.route('/Employee/delete').post(async (request, response) => {

    const {
        SSN
    } = request.body

    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('SSN', mssql.Char(18), SSN)
            .execute('DeleteEmployee');
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Delete successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Delete failed'
            });
        }
    } catch (err) {
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }

})



router.route('/Employee/update').post(async (request, response) => {
    const {
        SSN,
        Name,
        Position,
        PhoneNumber,
        Salary,
        Province,
        City,
        District,
        Street,
        ZipCode,
        EmployedYear,
        EmployedMonth,
        BirthYear,
        BirthMonth,
        CreditCardNumber,
        Manager
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('SSN', mssql.Char(18), SSN)
            .input('Name', mssql.VarChar(30), Name)
            .input('Position', mssql.VarChar(30), Position)
            .input('PhoneNumber', mssql.Char(11), PhoneNumber)
            .input('Salary', mssql.Money, Salary)
            .input('Province', mssql.VarChar(24), Province)
            .input('City', mssql.VarChar(24), City)
            .input('District', mssql.VarChar(24), District)
            .input('Street', mssql.VarChar(24), Street)
            .input('ZipCode', mssql.VarChar(24), ZipCode)
            .input('EmployedYear', mssql.Int, EmployedYear)
            .input('EmployedMonth', mssql.SmallInt, EmployedMonth)
            .input('BirthYear', mssql.Int, BirthYear)
            .input('BirthMonth', mssql.SmallInt, BirthMonth)
            .input('CreditCardNumber', mssql.VarChar(19), CreditCardNumber)
            .input('Manager', mssql.VarChar(30), Manager)
            .execute('UpdateEmployee');
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Update successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Update failed'
            });
        }
    } catch (err) {
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }

})

// router.route('/Employee/update').post(async (request, response) => {
//     let emp = {
//         ...request.body
//     }
//     let result = await dboperation.UpdateEmployee(emp);
//     response.status(201).json(result);
// })

// Employee Router Section End________________________________________________________________________________________________________________________________________________________________________________
// Company Router Section Start______________________________________________________________________________________________________________________________________________________________________________

router.route('/Company').get((request, response) => {
    dboperation.getCompany().then(result => {
        response.json(result[0]);
    })
})

router.route('/Company/add').post(async (request, response) => {
    const {
        Name,
        Field,
        RepName,
        RepNumber,
        Province,
        City,
        District,
        RegDate,
        Type,
        LevelOfInterest,
        Notes1,
        Notes2,
        Notes3,
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Name', mssql.VarChar(30), Name)
            .input('Field', mssql.VarChar(30), Field)
            .input('RepName', mssql.VarChar(50), RepName)
            .input('RepNumber', mssql.VarChar(11), RepNumber)
            .input('Province', mssql.VarChar(24), Province)
            .input('City', mssql.VarChar(24), City)
            .input('District', mssql.VarChar(24), District)
            .input('RegDate', mssql.Date, RegDate)
            .input('Type', mssql.VarChar(30), Type)
            .input('LevelOfInterest', mssql.SmallInt, LevelOfInterest)
            .input('Notes1', mssql.VarChar(500), Notes1)
            .input('Notes2', mssql.VarChar(500), Notes2)
            .input('Notes3', mssql.VarChar(500), Notes3)
            .execute('AddCompany')
        if (data.returnValue === 0) {
            response.json({
                code: 0,
                msg: 'Add successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Add failed'
            });
        }
    } catch (err) {


        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})

router.route('/Company/delete').post(async (request, response) => {
    const {
        Name
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Name', mssql.VarChar(30), Name)
            .execute('DeleteCompany');
        console.log(data)
        if (data.returnValue === 0) {
            response.json({
                code: 0,
                msg: 'Delete successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Delete failed'
            });
        }
    } catch (err) {
        console.log(err)
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})

router.route('/Company/search').post(async (request, response) => {
    let company = {
        ...request.body
    }
    let result = await dboperation.searchCompany(company);
    response.status(201).json(result[0]);
})

router.route('/Company/update').post(async (request, response) => {

    const {
        Name,
        Field,
        RepName,
        RepNumber,
        Province,
        City,
        District,
        RegDate,
        Type,
        LevelOfInterest,
        Notes1,
        Notes2,
        Notes3,
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Name', mssql.VarChar(30), Name)
            .input('Field', mssql.VarChar(30), Field)
            .input('RepName', mssql.VarChar(50), RepName)
            .input('RepNumber', mssql.VarChar(11), RepNumber)
            .input('Province', mssql.VarChar(24), Province)
            .input('City', mssql.VarChar(24), City)
            .input('District', mssql.VarChar(24), District)
            .input('RegDate', mssql.Date, RegDate)
            .input('Type', mssql.VarChar(30), Type)
            .input('LevelOfInterest', mssql.SmallInt, LevelOfInterest)
            .input('Notes1', mssql.VarChar(500), Notes1)
            .input('Notes2', mssql.VarChar(500), Notes2)
            .input('Notes3', mssql.VarChar(500), Notes3)
            .execute('UpdateCompany')
        if (data.returnValue === 0) {
            response.json({
                code: 0,
                msg: 'Update successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Update failed'
            });
        }
    } catch (err) {
        console.log(err);
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }

})


// Company Router Section End________________________________________________________________________________________________________________________________________________________________________________
// Address Router Section Start______________________________________________________________________________________________________________________________________________________________________________

router.route('/Address').get((request, response) => {
    dboperation.getAddress().then(result => {
        response.json(result[0]);
    })
})


// Address Router Section End________________________________________________________________________________________________________________________________________________________________________________
// Product Router Section Start______________________________________________________________________________________________________________________________________________________________________________

router.route('/Product').get((request, response) => {
    dboperation.getProduct().then(result => {
        response.json(result[0]);
    })
})

router.route('/Product/add').post(async (request, response) => {
    let product = {
        ...request.body
    }
    let result = await dboperation.addProduct(product);
    response.status(201).json(result);
})

router.route('/Product/delete').post(async (request, response) => {
    // let product = {
    //     ...request.body
    // }
    // let result = await dboperation.deleteProduct(product);
    // response.status(201).json(result);
    const {
        Name,
        MadeBy
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Name', mssql.VarChar(30), Name)
            .input('MadeBy', mssql.VarChar(60), MadeBy)
            .execute('DeleteProduct');
        console.log(data)
        if (data.returnValue === 0) {
            response.json({
                code: 0,
                msg: 'Delete successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Delete failed'
            });
        }
    } catch (err) {
        console.log(err)
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})

router.route('/Product/search').post(async (request, response) => {
    let product = {
        ...request.body
    }
    let result = await dboperation.searchProduct(product);
    response.status(201).json(result[0]);
})

// Product Router Section End________________________________________________________________________________________________________________________________________________________________________________
// Order Router Section Start______________________________________________________________________________________________________________________________________________________________________________
router.route('/Order').get((request, response) => {
    dboperation.getOrder().then(result => {
        try {
            response.json(result[0]);
        } catch (e) {
            response.json({
                code: -1,
                msg: JSON.status()
            });
        }

    })
})

router.route('/Order/add').post(async (request, response) => {
    const {
        ProductID,
        Quantity,
        OrderUnitPrice,
        DateOfOrder,
        Driver,
        Company,
        Province,
        City,
        District,
        Street,
        ZipCode,
        ArriveDeadline,
        DateArrived
    } = request.body;
    try {
        console.log("sending this request to db: " + request.body);
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('ProductID', mssql.Int, ProductID)
            .input('Quantity', mssql.Int, Quantity)
            .input('OrderUnitPrice', mssql.Money, OrderUnitPrice)
            .input('DateOfOrder', mssql.Date, DateOfOrder)
            .input('Driver', mssql.VarChar(30), Driver)
            .input('Company', mssql.VarChar(60), Company)
            .input('Province', mssql.VarChar(24), Province)
            .input('City', mssql.VarChar(24), City)
            .input('District', mssql.VarChar(24), District)
            .input('Street', mssql.VarChar(24), Street)
            .input('ZipCode', mssql.Char(6), ZipCode)
            .input('ArriveDeadline', mssql.Date, ArriveDeadline)
            .input('DateArrived', mssql.Date, DateArrived)
            .execute('AddOrder');
        console.log(data)
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Add successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Add failed'
            });
        }
    } catch (err) {
        console.log(err);
        console.log("error code = " + err.code);
        var errorMessage = err;
        if (err.code = 'EPARAM') {
            errorMessage = err.originalError.message;
        } else {
            errorMessage = err.originalError.info.message;
        }
        response.json({
            code: -1,
            msg: errorMessage
        });
    }
})

router.route('/Order/delete').post(async (request, response) => {
    const {
        ID
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('ID', mssql.Int, ID)
            .execute('DeleteOrder');
        console.log(data)
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Delete successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Delete failed'
            });
        }
    } catch (err) {
        console.log(err)
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})

router.route('/Order/update').post(async (request, response) => {
    const {
        ID,
        ProductID,
        Quantity,
        OrderUnitPrice,
        DateOfOrder,
        Driver,
        SellTo,
        AddressID,
        Province,
        City,
        District,
        Street,
        ZipCode,
        ArriveDeadline,
        DateArrived
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('ID', mssql.Int, ID)
            .input('ProductID', mssql.Int, ProductID)
            .input('Quantity', mssql.Int, Quantity)
            .input('OrderUnitPrice', mssql.Money, OrderUnitPrice)
            .input('DateOfOrder', mssql.Date, DateOfOrder)
            .input('Driver', mssql.VarChar(30), Driver)
            .input('SellTo', mssql.VarChar(60), SellTo)
            .input('AddressID', mssql.Int, AddressID)
            .input('Province', mssql.VarChar(24), Province)
            .input('City', mssql.VarChar(24), City)
            .input('District', mssql.VarChar(24), District)
            .input('Street', mssql.VarChar(24), Street)
            .input('ZipCode', mssql.Char(6), ZipCode)
            .input('ArriveDeadline', mssql.Date, ArriveDeadline)
            .input('DateArrived', mssql.Date, DateArrived)
            .execute('UpdateOrder');
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Update successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Update failed'
            });
        }
    } catch (err) {
        console.log(err);
        console.log("error code = " + err.code);
        var errorMessage = err;
        if (err.code = 'EPARAM') {
            errorMessage = err.originalError.message;
        } else {
            errorMessage = err.originalError.info.message;
        }
        response.json({
            code: -1,
            msg: errorMessage
        });
    }

})

// router.route('/Order/search').post(async (request, response) => {


//     let data = {
//         ...request.body
//     }

//     let result = await dboperation.searchOrder(data);
//     response.status(201).json(result);
// })

router.route('/Order/search').post(async (request, response) => {
    let data = {
        ...request.body
    }
    let result = await dboperation.searchOrder(data);
    response.status(201).json(result[0]);
})


// Order Router Section End________________________________________________________________________________________________________________________________________________________________________________
// ContactWith Router Section Start______________________________________________________________________________________________________________________________________________________________________________

router.route('/ContactWith').get((request, response) => {
    dboperation.getContactWith().then(result => {
        try {
            response.json(result[0]);
        } catch (e) {
            response.json({
                code: -1,
                msg: JSON.status()
            });
        }

    })
})

router.route('/ContactWith/add').post(async (request, response) => {
    const {
        Contacter,
        Company
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('Contacter', mssql.VarChar(30), Contacter)
            .input('Company', mssql.VarChar(60), Company)
            .execute('AddContactWith');
        console.log(data)
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Add successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Add failed'
            });
        }
    } catch (err) {
        console.log(err)
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})


router.route('/ContactWith/delete').post(async (request, response) => {
    const {
        Contacter,
        Company
    } = request.body;
    try {
        let pool = await mssql.connect(config);
        let data = await pool.request()
            .input('ContacterName', mssql.VarChar(30), Contacter)
            .input('CompanyName', mssql.VarChar(60), Company)
            .execute('deleteContactWith');
        console.log(data)
        if (data.returnValue == 0) {
            response.json({
                code: 0,
                msg: 'Delete successful'
            });
        } else {
            response.json({
                code: -1,
                msg: 'Delete failed'
            });
        }
    } catch (err) {
        console.log(err)
        response.json({
            code: -1,
            msg: err.originalError.info.message
        });
    }
})

router.route('/ContactWith/search').post(async (request, response) => {
    let data = {
        ...request.body
    }
    let result = await dboperation.searchContactWith(data);
    response.status(201).json(result[0]);
})

// ContactWith Router Section End________________________________________________________________________________________________________________________________________________________________________________


var port = process.env.PORT || 8090;
app.listen(port);
console.log('MaterialStore API is running at ' + port);