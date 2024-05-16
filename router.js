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
        message: 'Restricted area'
    })
}

const authMiddleware = (req, res, next) => {
    // Here you would typically check if the user is authenticated
    // For example, by checking if a token exists in the headers or cookies
    const isAuthenticated = true; // Replace this with your authentication logic

    if (isAuthenticated) {
        next();
    } else {
        res.status(401).json({
            success: 0,
            message: 'Unauthorized'
        })
    }
}

function route(app){
    app.get('/', homeRoute)

    app.use('/get-auth', getAuthRoute)

    app.get('/restricted', authMiddleware, restrictedRoute)

    app.use('*', errorPageRoute)
}

module.exports = route;