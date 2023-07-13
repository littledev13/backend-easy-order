import { Sequelize } from "sequelize";
import db from "../config/database.js";
import moment from "moment";

const { DataTypes } = Sequelize;
const currentDate = new Date();
// todo | Modeling entity

const Menu = db.define(
  "menu",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idToko: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 99 },
    nama: { type: DataTypes.CHAR(50), allowNull: false, unique: true },
    jenis: { type: DataTypes.CHAR(50), allowNull: false }, // makanan || minuman || desert
    deskripsi: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    harga: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);
const Toko = db.define(
  "toko",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    nama: { type: DataTypes.CHAR(50), allowNull: false, unique: true },
    pemilik: { type: DataTypes.CHAR(50), allowNull: false },
    deskripsi: { type: DataTypes.STRING, allowNull: false },
    alamat: { type: DataTypes.STRING, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);
const Kategori = db.define(
  "kategori",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idToko: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 99 },
    nama: { type: DataTypes.CHAR(25), allowNull: false },
  },
  {
    freezeTableName: true,
  }
);
const Level = db.define(
  "level",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idToko: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 99 },
    nama: { type: DataTypes.CHAR(25), allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

const Akun = db.define(
  "akun",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idToko: { type: DataTypes.INTEGER, allowNull: false },
    nama: { type: DataTypes.CHAR(50), allowNull: false, unique: true },
    level: { type: DataTypes.CHAR(15), allowNull: false },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
      timezone: "+07:00",
    },

    updatedAt: {
      type: DataTypes.DATE,
    },
    pass: { type: DataTypes.CHAR(25), allowNull: false },
    noHp: { type: DataTypes.CHAR(13), allowNull: false },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

const Nota = db.define(
  "nota",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idToko: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 99 },
    namaPembeli: { type: DataTypes.CHAR(20), allowNull: false },
    namaKasir: { type: DataTypes.CHAR(20), defaultValue: "" },
    totalHarga: { type: DataTypes.INTEGER, allowNull: false },
    createAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    // Dibayar || Terbayar || Clear & Unclear || Lunas && Belum Lunas
    statusPembayaran: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: "Unclear",
    },
    statusOrder: {
      type: DataTypes.CHAR(10),
      allowNull: false,
      defaultValue: "SELESAI  ",
    },
  },
  {
    freezeTableName: true,
  }
);

const Pesanan = db.define(
  "pesanan",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idToko: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 99 },
    noNota: { type: DataTypes.INTEGER, allowNull: false },
    namaMenu: { type: DataTypes.CHAR(50), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    harga: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    freezeTableName: true,
  }
);

await db.sync({ force: true });
const toko = await Toko.create({
  nama: "Easy Order",
  pemilik: "irvan azwardi",
  alamat: "jl. adisucipto",
  deskripsi: "Default untuk administrator",
});

const akun = await Akun.create({
  idToko: 1,
  nama: "administrator",
  level: "administrator",
  pass: "admin981",
  noHp: "082374095590",
});
console.log(toko.dataValues, "\ndan\n", akun.dataValues);
console.log(new Date().getTimezoneOffset());
export { Menu, Nota, Akun, Pesanan, Kategori, Level, Toko };
