import express from "express";
import {
  addAkun,
  addMenu,
  addPesanan,
  addToko,
  delAkun,
  delMenu,
  delToko,
  editAkunById,
  editMenuById,
  editTokoByID,
  getAkun,
  getAllAkun,
  getAllAkunByToko,
  getAllAkunToko,
  getAllMenuByToko,
  getMenu,
  getMenuByJenis,
  getPesananById,
  getNotaByToko,
  getToko,
  getTokoByID,
  delNotaByID,
  delPesanan,
  editPesananById,
} from "../controller/controller.js";

const Routerr = express.Router();
// * TOKO
Routerr.post("/toko/", addToko);
Routerr.post("/toko/edit/", editTokoByID);
Routerr.post("/toko/del/", delToko);
Routerr.get("/toko/", getToko);
Routerr.get("/toko/:id", getTokoByID);
Routerr.get("/auth/toko/:id", getAllAkunToko);
// TODO AKUN
Routerr.post("/auth/login/", getAkun);
Routerr.get("/auth/", getAllAkun);
Routerr.post("/auth/toko", getAllAkunByToko);
Routerr.post("/auth/edit", editAkunById);
Routerr.post("/auth/", addAkun);
Routerr.post("/auth/del/", delAkun);
// todo Menu
Routerr.get("/menu", getMenu);
Routerr.post("/menu/toko", getAllMenuByToko);
Routerr.post("/menu/edit", editMenuById);
Routerr.get("/menu/:id/:jenis", getMenuByJenis);
Routerr.post("/menu", addMenu);
Routerr.post("/menu/del", delMenu);

// todo Pesanan
Routerr.post("/pesanan/", addPesanan);
Routerr.post("/nota/toko", getNotaByToko);
Routerr.get("/nota/del/:id", delNotaByID);
Routerr.get("/pesanan/nota/:id", getPesananById);
Routerr.get("/pesanan/del/:id", delPesanan);
Routerr.post("/pesanan/edit/", editPesananById);

export default Routerr;
