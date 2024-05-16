const authMiddleware = require('./middleware/auth');
const getAuthRoute = require('./routes/getAuth');

const homeRoute = (req, res) => {
    res.json({
        success: 1,
        message: 'Connection successful'
    })
}

const errorPageRoute = (req, res) => {
    res.status(404).json({
        success: 0,
        message: 'Resource not found'
    })
}

const restrictedRoute = (req, res) => {
    res.json({
        success: 1,
        message: 'Restricted area',
        user: req.user
    })
}

function route(app){
    app.get('/', homeRoute)

    app.use('/get-auth', getAuthRoute)

    app.get('/restricted', authMiddleware, restrictedRoute)

    app.use('*', errorPageRoute)
}

module.exports = route;