const db = require('../db/koneksi');
const response = require('../src/response');

const getDokter = (res) => {
  const sql = `SELECT * FROM dokter`;
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, 'dokter get list', res);
  });
};

const getDokterById = (req, res) => {
  const id_dokter = req.params.id;
  const sql = 'SELECT * FROM dokter WHERE id_dokter = ?';

  db.query(sql, [id_dokter], (err, fields) => {
    if (err) throw err;
    response(200, fields, 'get detail dokter', res);
  });
};

const postDokter = (req, res) => {
  const { nama_dokter, deskripsi } = req.body;
  const sql = `INSERT INTO dokter (nama_dokter,deskripsi) VALUES ('${nama_dokter}','${deskripsi}')`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        table: {
          nama_dokter,
          deskripsi,
        },
        isSuccess: fields.affectedRows,
      };
      response(200, data, 'data added succes', res);
    }
  });
};

const putDokter = (req, res) => {
  const id_dokter = req.params.id;
  const { nama_dokter, deskripsi } = req.body;

  const sql = `UPDATE dokter SET nama_dokter = '${nama_dokter}',deskripsi = '${deskripsi}' WHERE id_dokter = ${id_dokter}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isSucccess: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, 'UPDATE DATA SUCCESS', res);
    } else {
      response(404, 'USER NOT FOUND', 'ERROR', res);
    }
  });
};

const deleteDokter = (req, res) => {
  const id_dokter = req.params.id;
  const sql = `DELETE FROM dokter WHERE id_dokter = ${id_dokter}`;

  db.query(sql, (err, fields) => {
    if (err) response(500, 'invalid', 'error', res);
    if (fields?.affectedRows) {
      const data = {
        isDelete: fields.affectedRows,
      };
      response(200, data, 'DELETE DATA SUCCESS', res);
    } else {
      response(404, 'USER NOT FOUND', 'ERROR', res);
    }
  });
};

module.exports = {
  getDokter,
  getDokterById,
  postDokter,
  putDokter,
  deleteDokter,
};
