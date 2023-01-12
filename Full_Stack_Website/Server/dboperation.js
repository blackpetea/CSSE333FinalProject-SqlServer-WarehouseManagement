// TODO:
// 1. add a new function calling sp or exec a sql.query
// 2. remember to export that in the bottom of this page

var config = require('./dbconfig');
const sql = require('mssql');

// Employee Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________

async function getEmployee(){
    try{
        let pool = await sql.connect(config);
        let employee = await pool.request().execute('GetEmployee');
        return employee.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function searchEmployee(emp){
    try{
        let pool = await sql.connect(config);
        let empSearResult = await pool.request()
            .input('SSN', sql.Char(18), emp.SSN)
            .input('Name', sql.VarChar(30), emp.Name)
            .input('Province', sql.VarChar(24), emp.Province)
            .input('City', sql.VarChar(24), emp.City)
            .input('Position', sql.VarChar(30), emp.Position)
            .input('EmployedYearMax', sql.Int, emp.EmployedYearMax)
            .input('EmployedYearMin', sql.Int, emp.EmployedYearMin)
            .input('BirthYearMax', sql.Int, emp.BirthYearMax)
            .input('BirthYearMin', sql.Int, emp.BirthYearMin)
            .input('PhoneNumber', sql.Char(11), emp.PhoneNumber)
            .input('SalaryMax', sql.Money, emp.SalaryMax)
            .input('SalaryMin', sql.Money, emp.SalaryMin)
            .input('Manager', sql.VarChar(30), emp.Manager)

            .execute('SearchEmployee')

        return empSearResult.recordsets;

    }catch(err){
        console.log(err);
    }
}


// Employee Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// Company Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________

async function getCompany(){
    try{
        let pool = await sql.connect(config);

        let empResult = await pool.request().execute('GetCompany')
        return empResult.recordsets;

    }
    catch(error){
        console.log(error);

    }
}

async function deleteCompany(comp){
    try{
        let pool = await sql.connect(config);
        let empResult = await pool.request()
            .input('Name', sql.VarChar(30), comp.Name)
            .execute('DeleteCompany')
        return empResult.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function addCompany(emp){
    try{
        console.log(emp);
        let pool = await sql.connect(config);
        let empResult = await pool.request()
            .input('Name', sql.VarChar(30), emp.Name)
            .input('Field', sql.VarChar(30), emp.Field)
            .input('RepName',sql.VarChar(50), emp.RepName)
            .input('RepNumber',sql.VarChar(11), emp.RepNumber)
            .input('Province', sql.VarChar(24), emp.Province)
            .input('City', sql.VarChar(24), emp.City)
            .input('District', sql.VarChar(24), emp.District)
            .input('RegDate', sql.Date, emp.RegDate)
            .input('Type', sql.VarChar(30), emp.Type)
            .input('LevelOfInterest', sql.SmallInt, emp.LevelOfInterest)
            .input('Notes1', sql.VarChar(500), emp.Notes1)
            .input('Notes2', sql.VarChar(500), emp.Notes2)
            .input('Notes3', sql.VarChar(500), emp.Notes3)
            .execute('AddCompany')
        return empResult.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function updateCompany(emp){
    try{
        console.log(emp);
        let pool = await sql.connect(config);
        let empResult = await pool.request()
            .input('Name', sql.VarChar(30), emp.Name)
            .input('Field', sql.VarChar(30), emp.Field)
            .input('RepName',sql.VarChar(50), emp.RepName)
            .input('RepNumber',sql.VarChar(11), emp.RepNumber)
            .input('Province', sql.VarChar(24), emp.Province)
            .input('City', sql.VarChar(24), emp.City)
            .input('District', sql.VarChar(24), emp.District)
            .input('RegDate', sql.Date, emp.RegDate)
            .input('Type', sql.VarChar(30), emp.Type)
            .input('LevelOfInterest', sql.SmallInt, emp.LevelOfInterest)
            .input('Notes1', sql.VarChar(500), emp.Notes1)
            .input('Notes2', sql.VarChar(500), emp.Notes2)
            .input('Notes3', sql.VarChar(500), emp.Notes3)
            .execute('UpdateCompany')
        return empResult.recordsets;
    }catch(err){
        console.log(err);
    }
}

async function searchCompany(emp){
    try{
        let pool = await sql.connect(config);

        let empSearResult = await pool.request()
        .input('Name', sql.VarChar(30), emp.Name)
        .input('Field', sql.VarChar(30), emp.Field)
        .input('RepName',sql.VarChar(50), emp.RepName)
        .input('RepNumber',sql.VarChar(11), emp.RepNumber)
        .input('Province', sql.VarChar(24), emp.Province)
        .input('City', sql.VarChar(24), emp.City)
        .input('District', sql.VarChar(24), emp.District)
        .input('RegDateMax', sql.Date, emp.RegDateMax)
        .input('RegDateMin', sql.Date, emp.RegDateMin)
        .input('Type', sql.VarChar(30), emp.Type)
        .input('LOIMax', sql.SmallInt, emp.LOIMax)
        .input('LOIMin', sql.SmallInt, emp.LOIMin)
        .execute('SearchCompany')

        return empSearResult.recordsets;

    }catch(err){
        console.log(err);
    }
}



// Company Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// Address Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________



// Address Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// Product Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________


async function getProduct(){
    try{
        let pool = await sql.connect(config);
        let product = await pool.request().execute('GetProduct');
        return product.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function addProduct(product){
    try{
        let pool = await sql.connect(config);
        let productResult = await pool.request()
            .input('Name', sql.VarChar(50),product.Name)
            .input('BuyingCost', sql.Money, product.BuyingCost)
            .input('SellPrice', sql.Money, product.SellPrice)
            .input('Description', sql.VarChar(300), product.Description)
            .input('StockQuantity', sql.Int, product.StockQuantity)
            .input('MadeBy', sql.VarChar(60), product.MadeBy)
            .execute('AddProduct')
        return productResult.recordsets;
    }catch(err){
        console.log(err);
    }
}


async function deleteProduct(product){
    try{
        let pool = await sql.connect(config);
        let productResult = await pool.request()
            .input('Name', sql.VarChar(30), product.Name)
            .input('MadeBy', sql.VarChar(60), product.MadeBy)
            .execute('DeleteProduct')
        return productResult.recordsets;
    }catch(err){
        console.log(err);
    }
}
async function searchProduct(product){
    try{
        let pool = await sql.connect(config);

        let productResult = await pool.request()
            .input('Name', sql.VarChar(60),product.Name)
            .input('BuyingCost', sql.Money, product.BuyingCost)
            .input('SellPrice', sql.Money, product.SellPrice)
            .input('StockQuantity', sql.Int, product.StockQuantity)
            .input('MadeBy', sql.VarChar(60), product.MadeBy)
            .execute('SearchProduct');

        console.log("productResult.recordsets", productResult.recordsets);
        return productResult.recordsets;

    }catch(err){
        console.log(err);
    }
}

async function updateProduct(product){
    try{
        let pool = await sql.connect(config);
        let productResult = await pool.request()
            .input('Name', sql.VarChar(60),product.Name)
            .input('BuyingCost', sql.Money, product.BuyingCost)
            .input('SellPrice', sql.Money, product.SellPrice)
            .input('StockQuantity', sql.Int, product.StockQuantity)
            .input('MadeBy', sql.VarChar(60), product.MadeBy)
            .execute('UpdateProduct');
        console.log("productResult.recordsets", productResult.recordsets);
        return productResult.recordsets;
    }catch(err){
        console.log(err);
    }
}

// Product Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// Order Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________
async function getOrder(){
    try{
        let pool = await sql.connect(config);
        let order = await pool.request().execute('GetOrder');
        return order.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function searchOrder(emp){
    try{
        let pool = await sql.connect(config);
        let data = await pool.request()
        .input('ID', sql.Int, emp.ID)
        .input('Province', sql.VarChar(24), emp.Province)
        .input('City', sql.VarChar(24), emp.City)
        .input('SellTo', sql.VarChar(60), emp.SellTo)
        .input('ProductID', sql.Int, emp.ProductID)
        .input('QuantityMax', sql.Int, emp.QuantityMax)
        .input('QuantityMin', sql.Int, emp.QuantityMin)
        .input('OrderUnitPriceMax', sql.Money, emp.OrderUnitPriceMax)
        .input('OrderUnitPriceMin', sql.Money, emp.OrderUnitPriceMin)
        .input('Driver', sql.VarChar(30), emp.Driver)
        .input('DateOfOrderMax', sql.Date, emp.DateOfOrderMax)
        .input('DateOfOrderMin', sql.Date, emp.DateOfOrderMin)
        .input('ArriveDeadlineMax', sql.Date, emp.ArriveDeadlineMax)
        // .input('ArriveDeadlineMin', sql.Date, emp.ArriveDeadlineMin)
        .input('DateArrivedMax', sql.Date, emp.DateArrivedMax)
        .input('DateArrivedMin', sql.Date, emp.DateArrivedMin)
        .execute('SearchOrder');

        return data.recordsets;

    }catch(err){
        console.log(err);
    }
}


// Order Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// ContactWith Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________
async function getContactWith(){
    try{
        let pool = await sql.connect(config);
        let contactWith = await pool.request().execute('GetContactWith');
        return contactWith.recordsets;
    }
    catch(error){
        console.log(error);
    }
}

async function searchContactWith(emp){
    try{
        let pool = await sql.connect(config);
        let data = await pool.request()
            .input('Contacter', sql.VarChar(30), emp.Contacter)
            .input('Company', sql.VarChar(60), emp.Company)
            .input('LevelOfInterest', sql.VarChar(60), emp.LevelOfInterest)
            .execute('SearchContactWith')
        return data.recordsets;
    }catch(err){
        console.log(err);
    }
}

// ContactWith Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// ContactWith Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________

// ContactWith Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// ContactWith Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________

// ContactWith Operation Section End________________________________________________________________________________________________________________________________________________________________________________
// ContactWith Opertaion Section Start______________________________________________________________________________________________________________________________________________________________________________



// ContactWith Operation Section End________________________________________________________________________________________________________________________________________________________________________________





module.exports = {
    getEmployee:getEmployee,
    getProduct:getProduct,
    addProduct:addProduct,
    deleteProduct:deleteProduct,
    getProduct: getProduct,
    searchProduct: searchProduct,
    getCompany: getCompany,
    deleteCompany: deleteCompany,
    addCompany:addCompany,
    updateProduct:updateProduct,
    searchEmployee: searchEmployee,
    getContactWith: getContactWith,
    updateCompany: updateCompany,
    searchCompany:searchCompany,
    getOrder: getOrder,
    searchContactWith: searchContactWith,
    searchOrder: searchOrder
 }