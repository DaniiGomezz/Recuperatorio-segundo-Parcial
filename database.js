const  {Sequelize, DataTypes} = require('sequelize');  


// creamos una instacia de conexion a la base de datos

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER,
    process.env.DB_PASSWORD, 
 {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  });

  const conexionDB = async () => {
    try {
     await sequelize.authenticate()
     console.log("Base de datos conetada correctamente")   
    } catch (error) {
        console.log("Error al conetar la base de datos: ", error)
    }

  
  } ;
  module.exports = {
    sequelize, 
    DataTypes,
    conexionDB
    
  }