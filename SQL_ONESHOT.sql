Use MaterialStore
go

-- Use those to show results
Select * from Company
Select * From EmployeeMainView
Select * From CompanyMainView
Select * From [Address]
Select * From Product
Select * From Import_MadeView
Select * From Import_DriverView
Select * From Import_ContacterView
Select * From Import_ManageView
Select * From Import_OrderView
Select * From Import_ContactWithView

Select * From [Order]
Select * From Contacter
Select * From Driver
Select * From Manage
Select * From ContactWith


--Execute below code altogether to remove everything from our database
Delete From ContactWith
Delete From Manage
Delete From Made
Delete From Contacter
Delete From [Order]
Delete From Product
Delete From Driver
Delete From Employee
Delete From Company 
Delete From [Address]

DBCC CHECKIDENT ([Address], RESEED, 0)
DBCC CHECKIDENT ([Company], RESEED, 0)
DBCC CHECKIDENT ([Product], RESEED, 0)
DBCC CHECKIDENT ([Order], RESEED, 0)
  
