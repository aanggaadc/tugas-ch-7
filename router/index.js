const router = require('express').Router()
const uploadImage = require('../utils/uploadImage')
const uploadIcon = require('../utils/uploadIcon')
const {
    Home, 
    Portofolio,
    CreatePortofolio,
    EditPortofolio,
    EditPortofolioFunction,
    DeletePortofolio,
    ContacUs,
    Services,
    CreateServices,
    EditServices,
    EditServicesFunction,
    DeleteServices
} = require('../controller')


router.get('/', Home)
router.get('/create', Portofolio)
router.post('/create', uploadImage.single('image'), CreatePortofolio)
router.get('/edit/:id', EditPortofolio)
router.post('/edit/:id',uploadImage.single('image'), EditPortofolioFunction)
router.post('/delete/:id', DeletePortofolio)
router.post('/contactus', ContacUs)
router.get('/createServices', Services)
router.post('/createServices', uploadIcon.single('icon'), CreateServices)
router.get('/editServices/:id', EditServices)
router.post('/editServices/:id', uploadIcon.single('icon'), EditServicesFunction)
router.post('/deleteServices/:id', DeleteServices)


module.exports = router