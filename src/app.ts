import express from 'express'
import bodyParser from 'body-parser'
import moment from 'moment'
import { sequelize } from './database/database';
import './models/models'
require('dotenv').config();

const app = express()

async function main() {
  try {
    await sequelize.sync();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    const PORT = process.env.PORT

    app.get('/', (_, res) => {
      res.send({
        date: moment().format('YYYY-MM-DD[T]HH:mm:ss.SSSZ')
      });
    });

    app.use('/api', require('./routes/index'));

    app.listen(PORT, () => {
      console.log(`escuchando el puerto ${PORT}`);
    })
  } catch (e) {
    console.log("Unable to connect to the database", e)
  }
}

main()