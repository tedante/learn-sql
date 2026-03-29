const pool = require('./config');
const { fakerID_ID: faker } = require('@faker-js/faker');

async function setup() {
  try {
    await pool.query(`DROP TABLE IF EXISTS responden;`)
    console.log(`drop table if exists`);

    await pool.query(`CREATE TABLE responden (
                id SERIAL PRIMARY KEY,
                nama VARCHAR(100),
                email VARCHAR(100),
                pekerjaan VARCHAR(100),
                wilayah VARCHAR(50),
                umur INTEGER,
                pendapatan NUMERIC(15, 2),
                status_pernikahan BOOLEAN,
                tanggal_survey DATE
            );`);

    console.log('Table "responden" created successfully!');

    const queryInsert = `
            INSERT INTO responden (nama, email, pekerjaan, wilayah, umur, pendapatan, status_pernikahan, tanggal_survey)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

    for (let i = 0; i < 10000; i++) {
      const values = [
        faker.person.fullName(),
        faker.internet.email().toLowerCase(),
        faker.person.jobTitle(),
        faker.location.city(),
        faker.number.int({ min: 18, max: 65 }),
        faker.finance.amount({ min: 3000000, max: 25000000, dec: 0 }),
        faker.datatype.boolean(),
        faker.date.past({ years: 1 })
      ];

      await pool.query(queryInsert, values);
    }

    console.log("responden table seeded successfully!");
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

setup();