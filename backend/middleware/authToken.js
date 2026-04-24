
const jwt = require('jsonwebtoken')

async function authToken(req,res,next){
    try{
        const authHeader = req.headers?.authorization || ''
        const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''
        const cookieToken = req.cookies?.token
        const token = bearerToken || cookieToken

            console.log("token",token)
        if(!token){
            return res.status(401).json({
                message : "Please Login...!",
                error : true,
                success : false
            })
        }

            // verify a token symmetric
            jwt.verify(token,  process.env.TOKEN_SECRET_KEY, function(err, decoded) 
            {
                if(err){
                    console.log("error auth", err)
                    return res.status(401).json({
                        message : "Unauthorized",
                        error : true,
                        success : false
                    })
                }

                console.log("decocded", decoded)
                req.userId = decoded?._id
                req.userEmail = decoded?.email

                next()


            });
  

    }catch(err){
            res.status(400).json({
                message :  err.message || err,
                data : [],
                error : true,
                success : false
            })
    }
}

module.exports = authToken


