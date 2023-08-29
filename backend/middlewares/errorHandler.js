const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let message = err.message


    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 400
        message = 'Resource not found!'
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}


module.exports = errorHandler