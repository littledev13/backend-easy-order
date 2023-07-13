import fs from "fs";
import path from "path";
import {
  Menu,
  Akun,
  Kategori,
  Level,
  Nota,
  Pesanan,
  Toko,
} from "../models/models.js";

// * Toko
export const getToko = async (req, res) => {
  const toko = await Toko.findAll();
  try {
    res.send(toko);
  } catch (error) {
    res.status(400).send("Harap isi nama & deskripsi");
  }
};
export const addToko = async (req, res) => {
  try {
    await Toko.create({
      nama: req.body.nama,
      pemilik: req.body.pemilik,
      alamat: req.body.alamat,
      deskripsi: req.body.deskripsi,
    });

    res.status(201).send("Toko Berhasil ditambahkan");
  } catch (error) {
    res.status(400).send("Harap isi nama & deskripsi");
  }
};
export const editTokoByID = async (req, res) => {
  const { id, nama, deskripsi, pemilik, alamat } = req.body;

  try {
    await Toko.update(
      { nama, deskripsi, pemilik, alamat },
      {
        where: {
          id,
        },
      }
    );
    res.status(202).send("Toko Berhasil Di Edit");
  } catch (error) {
    res.status(400).send("Harap isi nama & deskripsi");
  }
};
export const delToko = async (req, res) => {
  const toko = await Toko.findOne({
    where: {
      id: req.body.id,
    },
  });
  if (!toko) return res.status(404).json({ msg: "Menut Not Found" });
  try {
    Toko.destroy({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json({ msg: "Toko Not Found!!" });
  } catch (err) {
    console.log(err.message);
  }
};
export const getTokoByID = async (req, res) => {
  try {
    const toko = await Toko.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (toko === null)
      res.status(404).json({ msg: "data tidak ada", status: false });
    if (toko !== null) res.status(200).send(toko);
  } catch (error) {
    res.status(504).json({ msg: "error" });
  }
};
export const getAllAkunToko = async (req, res) => {
  try {
    const akun = await Akun.findAll({
      where: {
        idToko: req.params.id,
      },
    });
    res.send(akun);
  } catch (error) {
    res.status(504).json({ msg: "error" });
  }
};

// * Akun

const addAkun = async (req, res) => {
  let idToko = req.body.idToko;
  if (typeof idToko === "string") {
    const toko = await Toko.findOne({
      where: {
        nama: req.body.idToko,
      },
    });
    // console.log(toko);
    if (toko === null) {
      idToko = req.body.idToko;
    } else idToko = await toko.id;
  }
  const nama = req.body.nama;
  const level = req.body.level;
  const noHp = req.body.noHp;
  const pass = req.body.pass;
  try {
    await Akun.create({
      nama,
      idToko,
      level,
      noHp,
      pass,
    });
    res.status(201).json({ msg: "Akun Created Successfully", status: true });
  } catch (error) {
    return res.status(400).json({ msg: "gagal membuat akun", status: false });
  }
};
const getAllAkun = async (req, res) => {
  const akun = await Akun.findAll();
  res.send(akun);
};
export const getAllAkunByToko = async (req, res) => {
  const akun = await Akun.findAll({
    where: {
      idToko: req.body.id,
    },
  });
  res.send(akun);
};
const getAkun = async (req, res) => {
  const nama = req.body;
  const akun = await Akun.findOne({
    where: nama,
  });
  if (akun == null) {
    res.status(204).send("Username/Password Salah");
  } else {
    res.send(akun);
  }
};
const delAkun = async (req, res) => {
  const akun = await Akun.findOne({
    where: {
      id: req.body.id,
    },
  });
  if (!akun) return res.status(404).json({ msg: "Akun Not Found" });
  try {
    Akun.destroy({
      where: {
        id: req.body.id,
      },
    });
    return res.status(200).json({ msg: "Akun has Deleted" });
  } catch (err) {
    console.log(err.message);
  }
};
const editAkunById = async (req, res) => {
  const { idToko, nama, level, noHp, pass, id } = req.body;
  try {
    await Akun.update(
      { nama, level, noHp, pass, idToko },
      {
        where: {
          id,
        },
      }
    );
    res.status(202).json({ msg: "Akun Berhasil Di Edit", status: true });
  } catch (error) {
    res.status(400).json({ msg: "Akun Gagal Di Edit", status: false });
  }
};

// Todo Menu
const getMenu = async (req, res) => {
  try {
    const menu = await Menu.findAll();
    res.send(menu);
  } catch (error) {
    console.log(error.message);
  }
};
const getMenuByJenis = async (req, res) => {
  // console.log(req.params);
  const { id, jenis } = req.params;
  try {
    const menu = await Menu.findAll({
      where: {
        jenis,
        idToko: id,
      },
    });
    res.send(menu);
  } catch (error) {
    console.log(error.message);
  }
};
export const getAllMenuByToko = async (req, res) => {
  const menu = await Menu.findAll({
    where: {
      idToko: req.body.id,
    },
  });
  res.send(menu);
};
const addMenu = async (req, res) => {
  if (req.files == null) return res.status(400).json({ msg: "Need Image" });
  console.log(req.body);
  let idToko = req.body.idToko;
  if (typeof idToko === "string") {
    const toko = await Toko.findOne({
      where: {
        nama: req.body.idToko,
      },
    });
    if (toko !== null) idToko = await toko.id;
  }
  console.log(idToko);
  const { nama, jenis, deskripsi, harga } = req.body;
  const file = req.files.file;
  console.log(file);
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
  const allowFile = [".png", ".jpg", ".jpeg"];
  if (!allowFile.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "invalid image" });
  if (fileSize > 5120000)
    return res.status(422).json({ msg: "image must be less than 5mb" });

  file.mv(`./public/image/${fileName}`, (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      Menu.create({
        nama: nama,
        idToko: idToko,
        jenis: jenis,
        deskripsi: deskripsi,
        image: fileName,
        url: url,
        harga: harga,
      });
      res.status(201).json({ msg: "sukses menambah menu" });
    } catch (e) {
      return res.status(400).json({ msg: "gagal menambah menu" });
    }
  });
};

const delMenu = async (req, res) => {
  const { id } = req.body;
  const menu = await Menu.findOne({
    where: {
      id,
    },
  });
  if (!menu) return res.status(404).json({ msg: "Menut Not Found" });
  try {
    Menu.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({ msg: "Menu has Deleted" });
  } catch (err) {
    console.log(err.message);
  }
};
const editMenuById = async (req, res) => {
  console.log("DB : ", req.body);
  const { nama, idToko, jenis, deskripsi, harga, id } = req.body;
  const menu = await Menu.findOne({
    where: {
      id,
    },
  });
  if (!menu) return res.status(404).json({ msg: "No Data Found" });
  let fileName;
  if (req.files == null) {
    try {
      await Menu.update(
        { nama, harga, deskripsi, jenis },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ msg: "menu Updated Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowFile = [".png", ".jpg", ".jpeg"];
    if (!allowFile.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "invalid image" });
    if (fileSize > 5120000)
      return res.status(422).json({ msg: "image must be less than 5mb" });

    const filepath = `./public/image/${menu.image}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/image/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;

    try {
      await Menu.update(
        { nama, image: fileName, url, harga, deskripsi, jenis },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ msg: "menu Updated Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  }
};

// Todo Pesanan

const addPesanan = async (req, res) => {
  const temp = req.body;
  const idToko = req.body.idToko;
  const namaPemesan = req.body.namaPemesan;
  let saveState = [];
  let totalHarga = 0;
  for (const e in temp) {
    if (e !== "namaPemesan") {
      if (e !== "idToko") {
        const state = JSON.parse(temp[e]);
        // const idToko2 = `"idToko" : ${req.body.idToko}`;
        totalHarga += state.harga * state.quantity;
        saveState.push(state);
      }
    }
  }
  try {
    const nota = await Nota.create({
      namaPembeli: namaPemesan,
      idToko,
      totalHarga,
    });
    for (const key in saveState) {
      saveState[key]["noNota"] = nota.id;
    }
    await Pesanan.bulkCreate(saveState, { validate: true });

    res.status(201).json({ msg: "Sukses membuat pesanan", noNota: nota.id });
  } catch (err) {
    console.log("eer : ", err);
  }
};
export const delNotaByID = async (req, res) => {
  const { id } = req.params;
  try {
    await Nota.destroy({
      where: {
        id,
      },
    });
    await Pesanan.destroy({
      where: {
        noNota: id,
      },
    });
    res.status(202).send("Deleted");
  } catch (error) {
    res.send(error);
  }
};
const delPesanan = async (req, res) => {
  const { id } = req.params;
  await Pesanan.destroy({
    where: {
      id,
    },
  });
};
export const editPesananById = async (req, res) => {
  const { idPesanan, quantity } = req.body;
  try {
    await Pesanan.update(
      { quantity: quantity },
      {
        where: {
          id: idPesanan,
        },
      }
    );
    console.log(idPesanan, " : ", quantity);
    res.status(202).send("updated");
  } catch (error) {
    res.send(error);
  }
};
export const getNotaByToko = async (req, res) => {
  const { idToko } = req.body;
  const nota = await Nota.findAll({
    where: {
      idToko,
    },
  });
  res.status(200).send(nota);
};
const getPesananById = async (req, res) => {
  const { id } = req.params;
  try {
    const pesanan = await Pesanan.findAll({
      where: {
        noNota: id,
      },
    });
    if (typeof res !== "undefined") res.status(200).send(pesanan);
    if (typeof res === "undefined") res.status(404).send("Data Tidak Ada");
  } catch (error) {
    res.send(err);
  }
};
const getNota = async (req, res) => {
  try {
    const nota = await Nota.findAll();
    req.send(nota);
  } catch (error) {
    console.log(error.message);
  }
};
const getNotaById = (req, res) => {
  try {
    const nota = Nota.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.send(nota);
  } catch (error) {
    console.log(error.message);
  }
};

export {
  getMenu,
  getMenuByJenis,
  addMenu,
  addPesanan,
  addAkun,
  delAkun,
  delMenu,
  delPesanan,
  editAkunById,
  editMenuById,
  getAkun,
  getAllAkun,
  getNota,
  getNotaById,
  getPesananById,
};
