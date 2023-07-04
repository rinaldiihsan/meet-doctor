const db = require('../db/koneksi');
const response = require('../src/response');

const getAkun = (res) => {
  const sql = 'SELECT * FROM akun';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, res);
  });
};

const getAkunById = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM akun WHERE id = ?';
  db.query(sql, [id], (err, fields) => {
    if (err) throw err;
    response(200, fields, res);
  });
};

const postAkun = (req, res) => {
  const { username, password, email, tanggal_lahir, tinggi, berat, jenis_kelamin, golongan_darah, alergi, kondisi_medis } = req.body;
  const sql = `INSERT INTO akun (username, password, email, tanggal_lahir,tinggi,berat, jenis_kelamin, golongan_darah, alergi, kondisi_medis) VALUES ('${username}','${password}','${email}','${tanggal_lahir}',${tinggi},${berat},'${jenis_kelamin}','${golongan_darah}','${alergi}','${kondisi_medis}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        id: fields.insertId,
      };
      response(200, data, res);
    }
  });
};

const loginAkun = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM akun WHERE email = '${email}' AND password = '${password}'`;

  db.query(sql, (err, results) => {
    if (err) response(500, 'invalid login', 'error', res);
    if (results.length > 0) {
      const data = {
        isSuccess: true,
        user: results[0],
      };
      response(200, data, res);
    } else {
      response(401, 'invalid', res);
    }
  });
};

const putAkun = (req, res) => {
  const id = req.params.id;
  const { username, password, email, tanggal_lahir, tinggi, berat, jenis_kelamin, golongan_darah, alergi, kondisi_medis } = req.body;

  const sql = `UPDATE akun SET username = '${username}',password = '${password}',email = '${email}',tanggal_lahir = '${tanggal_lahir}',tinggi = ${tinggi}, berat = ${berat}, jenis_kelamin = '${jenis_kelamin}', golongan_darah = '${golongan_darah}',alergi = '${alergi}',kondisi_medis = '${kondisi_medis}' WHERE id = ${id}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', res);
    if (fields?.affectedRows) {
      const data = {
        isSuccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, res);
    } else {
      response(404, 'User not found', res);
    }
  });
};

const deleteAkun = (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM akun WHERE id = ${id}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, res);
    } else {
      response(404, 'USER NOT FOUND', res);
    }
  });
};

module.exports = {
  getAkun,
  getAkunById,
  postAkun,
  loginAkun,
  putAkun,
  deleteAkun,
};
