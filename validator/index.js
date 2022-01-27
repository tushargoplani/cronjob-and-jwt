exports.createPostValidator = (req,res,next)=> {
    // username
    req.check('username',"Write a username").notEmpty()
    req.check('username',"userName must be between 2 to 30 characters").isLength({
        min: 2,
        max: 30
    });
    
    // password
    req.check('password',"Write a password").notEmpty()
    req.check('password',"Password must be between 6 to 20 characters").isLength({
        min: 6,
        max: 20
    });

    // Check for errors
    const errors = req.validationErrors()
    // if error show the first one as they happen
    if(errors){
        const firstError = errors.map((error) => error.msg)[0]
        return res.status(400).json({error: firstError});
    }

    //Proceed to next middleware
    next();
};