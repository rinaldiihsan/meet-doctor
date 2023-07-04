const db = require('../db/koneksi');
const response = require('../src/response');

const getPertemuan = (res) => {
  const sql = 'SELECT * FROM pertemuan';
  db.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields, res);
  });
};

const getPertemuanById = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM pertemuan WHERE id = ?';
  db.query(sql, [id], (err, fields) => {
    if (err) throw err;
    response(200, fields, res);
  });
};

const postPertemuan = (req, res) => {
  const { id_dokter, waktu_pertemuan } = req.body;

  // Mengimpor data dokter berdasarkan id_dokter dari tabel dokter
  const sql = 'SELECT nama_dokter FROM dokter WHERE id_dokter = ?';
  db.query(sql, [id_dokter], (err, results) => {
    if (err) {
      console.error(err);
      response(500, 'invalid', res);
    } else {
      if (results.length === 0) {
        response(404, 'invalid', res);
      } else {
        const nama_dokter = results[0].nama_dokter;

        // Menyimpan data pertemuan ke dalam tabel pertemuan
        const insertSql = 'INSERT INTO pertemuan (id_dokter, nama_dokter, waktu_pertemuan) VALUES (?, ?, ?)';
        db.query(insertSql, [id_dokter, nama_dokter, waktu_pertemuan], (err, result) => {
          if (err) {
            console.error(err);
            response(500, 'invalid', res);
          } else {
            const insertedPertemuan = {
              id_dokter,
              nama_dokter,
              waktu_pertemuan,
            };
            response(200, insertedPertemuan, res);
          }
        });
      }
    }
  });
};

const putPertemuan = (req, res) => {
  const id = req.params.id;
  const { waktu_pertemuan } = req.body;

  const sql = 'UPDATE pertemuan SET waktu_pertemuan = ? WHERE id = ?';
  db.query(sql, [waktu_pertemuan, id], (err, fields) => {
    if (err) {
      response(500, 'invalid', res);
    }
    if (fields?.affectedRows) {
      const data = {
        isSuccess: {
          waktu_pertemuan,
        },
        Success: fields.affectedRows,
        message: fields.message,
      };
      response(200, data, res);
    } else {
      response(404, 'User Not Founds', res);
    }
  });
};

const deletePertemuan = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM pertemuan WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      response(500, 'invalid', res);
    } else {
      if (result.affectedRows > 0) {
        const data = {
          isDelete: result.affectedRows,
        };
        response(200, data, res);
      } else {
        response(404, 'invalid', res);
      }
    }
  });
};

module.exports = {
  getPertemuan,
  getPertemuanById,
  postPertemuan,
  putPertemuan,
  deletePertemuan,
};
