// import db from "#db/client";
import db from "./client.js";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
await createEmployee({
  name: "Kendra Lee",
  birthday: "1990-04-12",
  salary: 72000
});

await createEmployee({
  name: "Kyle Brown",
  birthday: "1985-11-03",
  salary: 85000
});

await createEmployee({
  name: "Kamari Moss",
  birthday: "1998-02-27",
  salary: 54000
});

await createEmployee({
  name: "Kingston Wu",
  birthday: "1992-09-18",
  salary: 91000
});

await createEmployee({
  name: "Kaleigh Ray",
  birthday: "1996-06-05",
  salary: 63000
});

await createEmployee({
  name: "Keenan Price",
  birthday: "1988-01-14",
  salary: 78000
});

await createEmployee({
  name: "Kori Adams",
  birthday: "1994-12-22",
  salary: 60000
});

await createEmployee({
  name: "Khalil Johnson",
  birthday: "1991-03-09",
 salary: 87000
});

await createEmployee({
  name: "Kelsey Grant",
  birthday: "1999-07-30",
  salary: 52000
});

await createEmployee({
  name: "Knox Peters",
  birthday: "1983-10-25",
  salary: 97000
});

await createEmployee({
  name: "Kayden Flores",
  birthday: "2000-05-19",
  salary: 51000
});

console.log("✅ 11 Employees seeded!");

}
