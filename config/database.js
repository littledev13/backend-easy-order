import { Sequelize } from "sequelize";
import moment from "moment-timezone";

const db = new Sequelize("easy_order", "root", "", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    useUTC: false, //for reading from database
    dateStrings: true,
    typeCast: function (field, next) {
      if (field.type === "DATETIME") {
        return moment(field.string()).tz("Your_Timezone").toDate();
      }
      return next();
    },
  },
  timezone: "+07:00",
});

export default db;
