const express = require('express');
const { getAkun, getAkunById, postAkun, loginAkun, putAkun, deleteAkun } = require('../controller/akunController');
const router = express.Router();

router.get('/akun', (req, res) => {
  getAkun(res);
});

router.get('/akun/:id', getAkunById);

router.post('/akun', postAkun);

router.post('/akun/login', loginAkun);

router.put('/akun/:id', putAkun);

router.delete('/akun', deleteAkun);

module.exports = router;
