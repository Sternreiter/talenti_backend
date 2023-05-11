import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import moment from 'moment'
import path from 'path'
import { sequelize } from './database/database';
import './models/models'
require('dotenv').config();

const app = express()

async function main() {
  try {
    await sequelize.sync();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const swaggerUI = require("swagger-ui-express");
    const swaggerJsDoc = require("swagger-jsdoc");
    const swagerSpec = {
      definition: {
        openapi: "3.0.0",
        info: {
          tittle: "Uzza API",
          version: "1.0.0"
        },
        servers: [
          {
            url: `${process.env.URL}`
          }
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT"
            }
          }
        },
        security: [
          {
            bearerAuth: [],
          }
        ]
      },
      apis: [`${path.join(__dirname, "./routes/*.js")}`]
    }

    app.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type', 'Authorization'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false,
    }));

    const PORT = process.env.PORT

    app.get('/', (_, res) => {
      res.send({
        date: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
      });
    });

    app.use('/api', require('./routes/index'));
    app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swagerSpec)))

    app.listen(PORT, () => {
      console.log(`escuchando el puerto ${PORT}`);
    })
  } catch (e) {
    console.log("Unable to connect to the database", e)
  }
}

main()