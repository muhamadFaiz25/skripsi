import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Post, Put, Delete, Param, Body, HttpStatus } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';  // Use mysql2/promise for better async support

const port = 3003;

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "testing",
};

@Controller()
class AppController {
  private connection;

  constructor() {
    // Establish a persistent connection using mysql2's promise API
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    try {
      this.connection = await createConnection(dbConfig);
      console.log("Connected to MySQL database!");
    } catch (err) {
      console.error("Error connecting to MySQL database:", err);
      throw err;
    }
  }

  @Get('/')
  getHello(): string {
    return 'hello world';
  }

  @Post('/post10data')
  async createData(@Body() body: any): Promise<{ message: string }> {
    try {
      const data = Array.from({ length: 10 }, (_, i) => [
        i + 1,
        'luffy',
        Math.floor(Math.random() * 80),
      ]);
      
      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES ?`;
      await this.connection.query(sql, [data]);

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Error creating data" };
    }
  }

  @Post('/post100data')
  async createHundred(): Promise<{ message: string }> {
    try {
      const data = Array.from({ length: 100 }, (_, i) => [
        i + 1,
        'luffy',
        Math.floor(Math.random() * 80),
      ]);
      
      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES ?`;
      await this.connection.query(sql, [data]);

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Error creating data" };
    }
  }

  @Post('/post500data')
  async createFiveHundred(): Promise<{ message: string }> {
    try {
      const data = Array.from({ length: 500 }, (_, i) => [
        i + 1,
        'luffy',
        Math.floor(Math.random() * 80),
      ]);
      
      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES ?`;
      await this.connection.query(sql, [data]);

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Error creating data" };
    }
  }

  @Post('/post1000data')
  async createOneThousand(): Promise<{ message: string }> {
    try {
      const data = Array.from({ length: 1000 }, (_, i) => [
        i + 1,
        'luffy',
        Math.floor(Math.random() * 80),
      ]);
      
      const sql = `INSERT IGNORE INTO users (id, name, age) VALUES ?`;
      await this.connection.query(sql, [data]);

      return { message: "Data created successfully" };
    } catch (err) {
      console.error(err);
      throw { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: "Error creating data" };
    }
  }

  @Get('/get10data')
  async getTen() {
    const sql = "SELECT * FROM users LIMIT 10";
    const [rows] = await this.connection.query(sql);
    return rows;
  }

  @Get('/get100data')
  async getHundred() {
    const sql = "SELECT * FROM users LIMIT 100";
    const [rows] = await this.connection.query(sql);
    return rows;
  }

  @Get('/get500data')
  async getFiveHundred() {
    const sql = "SELECT * FROM users LIMIT 500";
    const [rows] = await this.connection.query(sql);
    return rows;
  }

  @Get('/get1000data')
  async getOneThousand() {
    const sql = "SELECT * FROM users LIMIT 1000";
    const [rows] = await this.connection.query(sql);
    return rows;
  }

  @Get('/getdata')
  async getAll() {
    const sql = "SELECT * FROM users";
    const [rows] = await this.connection.query(sql);
    return rows;
  }

  @Put('/put10data')
  async updateTen(): Promise<{ message: string }> {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 10";
    const [results] = await this.connection.query(sqlSelect);

    if (results.length === 0) {
      throw { statusCode: HttpStatus.NOT_FOUND, message: "No users found" };
    }

    const ids = results.map(result => result.id);
    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (?)`;
    await this.connection.query(sqlUpdate, [newName, newAge, ids]);

    return { message: "Data updated successfully" };
  }

  @Put('/put100data')
  async updateHundred(): Promise<{ message: string }> {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 100";
    const [results] = await this.connection.query(sqlSelect);

    if (results.length === 0) {
      throw { statusCode: HttpStatus.NOT_FOUND, message: "No users found" };
    }

    const ids = results.map(result => result.id);
    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (?)`;
    await this.connection.query(sqlUpdate, [newName, newAge, ids]);

    return { message: "Data updated successfully" };
  }

  @Put('/put500data')
  async updateFiveHundred(): Promise<{ message: string }> {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 500";
    const [results] = await this.connection.query(sqlSelect);

    if (results.length === 0) {
      throw { statusCode: HttpStatus.NOT_FOUND, message: "No users found" };
    }

    const ids = results.map(result => result.id);
    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (?)`;
    await this.connection.query(sqlUpdate, [newName, newAge, ids]);

    return { message: "Data updated successfully" };
  }

  @Put('/put1000data')
  async updateOneThousand(): Promise<{ message: string }> {
    const newName = 'zorro';
    const newAge = 24;

    const sqlSelect = "SELECT id FROM users LIMIT 1000";
    const [results] = await this.connection.query(sqlSelect);

    if (results.length === 0) {
      throw { statusCode: HttpStatus.NOT_FOUND, message: "No users found" };
    }

    const ids = results.map(result => result.id);
    const sqlUpdate = `UPDATE users SET name = ?, age = ? WHERE id IN (?)`;
    await this.connection.query(sqlUpdate, [newName, newAge, ids]);

    return { message: "Data updated successfully" };
  }

  @Put('/:id')
  async updateOne(@Param('id') id: number): Promise<{ message: string }> {
    const name = 'zorro';
    const age = 24;

    const sql = `UPDATE users SET name = ?, age = ? WHERE id = ?`;
    const [result] = await this.connection.query(sql, [name, age, id]);

    if (result.affectedRows === 0) {
      throw { statusCode: HttpStatus.NOT_FOUND, message: "User not found" };
    }

    return { message: "Data updated successfully" };
  }

  @Delete('/delete1000data')
  async delete1000data(): Promise<{ message: string }> {
    const sql = `DELETE FROM users`;
    await this.connection.query(sql);
    return { message: "Data deleted successfully" };
  }

  @Delete('/delete500data')
  async delete500data(): Promise<{ message: string }> {
    const sql = `DELETE FROM users`;
    await this.connection.query(sql);
    return { message: "Data deleted successfully" };
  }

  @Delete('/delete100data')
  async deleteAll(): Promise<{ message: string }> {
    const sql = `DELETE FROM users`;
    await this.connection.query(sql);
    return { message: "Data deleted successfully" };
  }

  @Delete('/delete10data')
  async delete10data(): Promise<{ message: string }> {
    const sql = `DELETE FROM users LIMIT 10`;
    await this.connection.query(sql);
    return { message: "Data deleted successfully" };
  }
}

@Module({
  imports: [],
  controllers: [AppController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`App listening on port ${port}`));
}

bootstrap();
