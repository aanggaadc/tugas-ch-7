const router = require('express').Router()
const uploadImage = require('../utils/uploadImage')
const {
    Home, 
    Portofolio,
    CreatePortofolio,
    EditPortofolio,
    EditPortofolioFunction,
    DeletePortofolio,
    ContacUs
} = require('../controller')


router.get('/', Home)
router.get('/create', Portofolio)
router.post('/create', uploadImage.single('image'), CreatePortofolio)
router.get('/edit/:id', EditPortofolio)
router.post('/edit/:id',uploadImage.single('image'), EditPortofolioFunction)
router.post('/delete/:id', DeletePortofolio)
router.post('/contactus', ContacUs)



module.exports = router