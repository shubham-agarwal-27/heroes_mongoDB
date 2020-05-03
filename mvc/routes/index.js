var express = require('express');
var router = express.Router();
const ctrlIndex = require('../controllers/index');

router.get('/', ctrlIndex.getIndex);
router.get('/heroes', ctrlIndex.getHeroesIndex);
router.get('/create-hero', ctrlIndex.getHeroesForm);
router.get('/update-hero/:heroid', ctrlIndex.getUpdateForm);
router.post('/create-hero', ctrlIndex.createNewHero);
router.post('/delete-hero/:heroid', ctrlIndex.deleteHero);
router.post('/update-hero/:heroid', ctrlIndex.updateHero);
router.get('/reset', ctrlIndex.reset);


module.exports = router;
