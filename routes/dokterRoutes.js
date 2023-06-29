const express = require('express');
const { getDokter, getDokterById, postDokter, putDokter, deleteDokter } = require('../controller/dokterController');
const router = express.Router();

router.get('/dokter', (req, res) => {
  getDokter(res);
});

router.get('/dokter/:id', getDokterById);

router.post('/dokter', postDokter);

router.put('/dokter/:id', putDokter);

router.delete('/dokter/:id', deleteDokter);

module.exports = router;
