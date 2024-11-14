import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { createConnection } from 'mysql';

const port = 3003;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
};

const connection = createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

@Controller()
class AppController {
  @Get('/')
  getHello(): string {
    return 'hello world';
  }

  @Post('/post10data')
  async create10data(): Promise<{ message: string }> {
    try {
      for (let i = 1; i <= 10; i++) {
        const data = {
          id: i,
          name: "luffy",
          age: Math.floor(Math.random() * 80),
        };

        const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

        connection.query(sql, [data.id, data.name, data.age], (err) => {
          if (err) throw err;
        });
      }

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Post('/post100data')
  async createHundred(): Promise<{ message: string }> {
    try {
      for (let i = 1; i <= 100; i++) {
        const data = {
          id: i,
          name: "luffy",
          age: Math.floor(Math.random() * 80),
        };

        const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

        connection.query(sql, [data.id, data.name, data.age], (err) => {
          if (err) throw err;
        });
      }

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Post('/post500data')
  async createFiveHundred(): Promise<{ message: string }> {
    try {
      for (let i = 1; i <= 500; i++) {
        const data = {
          id: i,
          name: "luffy",
          age: Math.floor(Math.random() * 80),
        };

        const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

        connection.query(sql, [data.id, data.name, data.age], (err) => {
          if (err) throw err;
        });
      }

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Post('/post1000data')
  async createOneThousands(): Promise<{ message: string }> {
    try {
      for (let i = 1; i <= 1000; i++) {
        const data = {
          id: i,
          name: "luffy",
          age: Math.floor(Math.random() * 80),
        };

        const sql = `INSERT IGNORE INTO users (id, name, age) VALUES (?,?,?)`;

        connection.query(sql, [data.id, data.name, data.age], (err) => {
          if (err) throw err;
        });
      }

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  @Get('/get10data')
  async getTen() {
    const sql = "SELECT * FROM users LIMIT 10";

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          resolve(results);
        }
      });
    });
  }

  @Get('/get100data')
  async getHundred() {
    const sql = "SELECT * FROM users LIMIT 100";

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          resolve(results);
        }
      });
    });
  }

  @Get('/get500data')
  async getFiveHundred() {
    const sql = "SELECT * FROM users LIMIT 500";

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          resolve(results);
        }
      });
    });
  }

  @Get('/get1000data')
  async getOneThousand() {
    const sql = "SELECT * FROM users LIMIT 1000";

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          resolve(results);
        }
      });
    });
  }

  @Get('/getdata')
  async getAll() {
    const sql = "SELECT * FROM users";

    return new Promise((resolve, reject) => {
      connection.query(sql, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          resolve(results);
        }
      });
    });
  }

  @Put('/put10data')
  async updateTen() {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 10";
    return new Promise((resolve, reject) => {
      connection.query(sqlSelect, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          const ids = results.map(result => result.id);
          if (ids.length === 0) {
            reject({
              statusCode: HttpStatus.NOT_FOUND,
              message: "No users found",
            });
          }

          const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
          connection.query(sqlUpdate, [newName, newAge], (err) => {
            if (err) {
              console.error(err);
              reject({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Error updating data",
              });
            } else {
              resolve({ message: "Data updated successfully" });
            }
          });
        }
      });
    });
  }

  @Put('/put100data')
  async updateHundred() {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 100";
    return new Promise((resolve, reject) => {
      connection.query(sqlSelect, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          const ids = results.map(result => result.id);
          if (ids.length === 0) {
            reject({
              statusCode: HttpStatus.NOT_FOUND,
              message: "No users found",
            });
          }

          const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
          connection.query(sqlUpdate, [newName, newAge], (err) => {
            if (err) {
              console.error(err);
              reject({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Error updating data",
              });
            } else {
              resolve({ message: "Data updated successfully" });
            }
          });
        }
      });
    });
  }

  @Put('/put500data')
  async updateFiveHundred() {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 500";
    return new Promise((resolve, reject) => {
      connection.query(sqlSelect, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          const ids = results.map(result => result.id);
          if (ids.length === 0) {
            reject({
              statusCode: HttpStatus.NOT_FOUND,
              message: "No users found",
            });
          }

          const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
          connection.query(sqlUpdate, [newName, newAge], (err) => {
            if (err) {
              console.error(err);
              reject({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Error updating data",
              });
            } else {
              resolve({ message: "Data updated successfully" });
            }
          });
        }
      });
    });
  }

  @Put('/put1000data')
  async updateOneThousand() {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 1000";
    return new Promise((resolve, reject) => {
      connection.query(sqlSelect, (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error fetching data",
          });
        } else {
          const ids = results.map(result => result.id);
          if (ids.length === 0) {
            reject({
              statusCode: HttpStatus.NOT_FOUND,
              message: "No users found",
            });
          }

          const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (${ids.join(',')})`;
          connection.query(sqlUpdate, [newName, newAge], (err) => {
            if (err) {
              console.error(err);
              reject({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: "Error updating data",
              });
            } else {
              resolve({ message: "Data updated successfully" });
            }
          });
        }
      });
    });
  }

  @Put('/:id')
  async updateOne(@Param('id') id: number) {
    const name = 'zorro';
    const age = 24;

    const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;

    return new Promise((resolve, reject) => {
      connection.query(sql, [name, age, id], (err, results) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error updating data",
          });
        } else if (results.affectedRows === 0) {
          reject({
            statusCode: HttpStatus.NOT_FOUND,
            message: "User not found",
          });
        } else {
          resolve({ message: "Data updated successfully" });
        }
      });
    });
  }

  @Delete('/delete1000data')
  async delete1000data() {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (err) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error deleting data",
          });
        } else {
          resolve({ message: "Data deleted successfully" });
        }
      });
    });
  }

  @Delete('/delete500data')
  async delete500data() {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (err) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error deleting data",
          });
        } else {
          resolve({ message: "Data deleted successfully" });
        }
      });
    });
  }

  @Delete('/delete100data')
  async deleteAll() {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (err) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error deleting data",
          });
        } else {
          resolve({ message: "Data deleted successfully" });
        }
      });
    });
  }

  @Delete('/delete10data')
  async deleteTen() {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (err) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error deleting data",
          });
        } else {
          resolve({ message: "Data deleted successfully" });
        }
      });
    });
  }

  @Delete('/')
  async deleteAllAgain() {
    const sql = `DELETE FROM users`;

    return new Promise((resolve, reject) => {
      connection.query(sql, (err) => {
        if (err) {
          console.error(err);
          reject({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: "Error deleting data",
          });
        } else {
          resolve({ message: "Data deleted successfully" });
        }
      });
    });
  }
}

@Module({
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();
