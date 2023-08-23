const app = require('express')
const router = app.Router()
const { placeOrder, allOrders, trackOrder } = require('./controller')

router.post('/place-order', placeOrder)
router.get('/get-all-orders', allOrders)
router.get('/track-order/:_id', trackOrder)


module.exports = router