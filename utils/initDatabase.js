const mysql = require("mysql2");
const fs = require("fs");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySqlServer",
    multipleStatements: true,
});

const db = connection.promise();

const schemaFile = fs.readFileSync("./utils/schema.sql", "utf-8");
const seedFile = fs.readFileSync("./utils/seed.sql", "utf-8");

const seedDb = async () => {
    try {
        const schema = await schemaFile.toString();
        const seed = await seedFile.toString();
        await db.query(schema);
        console.log("Creating MyCompany Database...");
        await db.query(seed);
        console.log("Seeding Tables...");
        connection.end();
        console.log("Database ready.");
    } catch (err) {
        throw err;
    }
};

seedDb();
