/* 
   MongoDB Assignment - Complete Solutions
   Database: CompanyDB | Collection: employees
*/

// --- Part A: Database & Collection ---
db = db.getSiblingDB("CompanyDB");
db.createCollection("employees");

// --- Part B: Insert Documents ---
// 3. Insert 5 employee documents
db.employees.insertMany([
  { empId: 101, name: "Arjun", department: "IT", salary: 65000, city: "Delhi", age: 28 },
  { empId: 102, name: "Sneha", department: "HR", salary: 45000, city: "Mumbai", age: 32 },
  { empId: 103, name: "Amit", department: "IT", salary: 55000, city: "Delhi", age: 25 },
  { empId: 104, name: "Vikram", department: "Sales", salary: 38000, city: "Bangalore", age: 29 },
  { empId: 105, name: "Rohan", department: "Finance", salary: 70000, city: "Mumbai", age: 40 }
]);

// 4. Insert one more employee
db.employees.insertOne({ empId: 106, name: "Ananya", department: "IT", salary: 52000, city: "Delhi", age: 24 });

// --- Part C: CRUD Operations ---
// Read Operations
// 5. Display all
db.employees.find().pretty();
// 6. Names and Salaries only
db.employees.find({}, { name: 1, salary: 1, _id: 0 });
// 7. From Delhi
db.employees.find({ city: "Delhi" });
// 8. Salary > 50000
db.employees.find({ salary: { $gt: 50000 } });
// 9. IT Department
db.employees.find({ department: "IT" });
// 10. Age < 30
db.employees.find({ age: { $lt: 30 } });

// Update Operations
// 11. Update salary of empId 101
db.employees.updateOne({ empId: 101 }, { $set: { salary: 68000 } });
// 12. Mumbai to Bangalore
db.employees.updateOne({ city: "Mumbai" }, { $set: { city: "Bangalore" } });
// 13. Increase salary by 5000 for IT
db.employees.updateMany({ department: "IT" }, { $inc: { salary: 5000 } });
// 14. Add bonus field
db.employees.updateMany({}, { $set: { bonus: 0 } });

// Delete Operations
// 15. Delete empId 105
db.employees.deleteOne({ empId: 105 });
// 16. Delete Sales dept
db.employees.deleteMany({ department: "Sales" });
// 17. Salary < 40000
db.employees.deleteMany({ salary: { $lt: 40000 } });

// --- Part D: Operators Practice ---
// 18. Salary >= 60000
db.employees.find({ salary: { $gte: 60000 } });
// 19. Age between 25 and 30
db.employees.find({ age: { $gte: 25, $lte: 30 } });
// 20. Salary != 45000
db.employees.find({ salary: { $ne: 45000 } });
// 21. Delhi AND Salary > 50000
db.employees.find({ $and: [{ city: "Delhi" }, { salary: { $gt: 50000 } }] });
// 22. Delhi OR Mumbai
db.employees.find({ city: { $in: ["Delhi", "Mumbai"] } });
// 23. NOT in HR
db.employees.find({ department: { $ne: "HR" } });
// 24. Start with 'A'
db.employees.find({ name: /^A/ });
// 25. End with 'n'
db.employees.find({ name: /n$/ });
// 26. Dept contains 'IT'
db.employees.find({ department: /IT/ });

// --- Part E: Sorting & Limiting ---
// 27. Ascending Salary
db.employees.find().sort({ salary: 1 });
// 28. Descending Salary
db.employees.find().sort({ salary: -1 });
// 29. Top 3 highest paid
db.employees.find().sort({ salary: -1 }).limit(3);
// 30. Skip first 2
db.employees.find().skip(2);

// --- Part F: Aggregation ---
// 31. Avg salary
db.employees.aggregate([{ $group: { _id: null, avgSalary: { $avg: "$salary" } } }]);
// 32. Max salary
db.employees.aggregate([{ $group: { _id: null, maxSalary: { $max: "$salary" } } }]);
// 33. Min salary
db.employees.aggregate([{ $group: { _id: null, minSalary: { $min: "$salary" } } }]);
// 34. Total salary dept-wise
db.employees.aggregate([{ $group: { _id: "$department", total: { $sum: "$salary" } } }]);
// 35. Count employees per dept
db.employees.aggregate([{ $group: { _id: "$department", count: { $sum: 1 } } }]);

// --- Part G: Indexing ---
// 36. Index on department
db.employees.createIndex({ department: 1 });
// 37. Compound index
db.employees.createIndex({ city: 1, salary: -1 });
// 38. Show indexes
db.employees.getIndexes();

// --- Part H: Advanced Queries ---
// 39. Unique cities
db.employees.distinct("city");
// 40. Count total
db.employees.countDocuments();
// 41. Second highest salary
db.employees.find().sort({ salary: -1 }).skip(1).limit(1);
// 42. Rename city to location
db.employees.updateMany({}, { $rename: { "city": "location" } });
// 43. Remove bonus field
db.employees.updateMany({}, { $unset: { bonus: "" } });

// --- Cleanup (Uncomment to use) ---
// 44. db.employees.drop();
// 45. db.dropDatabase();