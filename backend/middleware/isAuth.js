import jwt from 'jsonwebtoken'

const isAuth = async (req, res, next) => {
      try{
         const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message: "User's token not found"
            })
        }

        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET)
        req.userId = verifiedToken.userId;

        next();
      }catch(error){
            console.log(error);
            return res.status(401).json({
                message: "Invalid or expired token"
            })
      }
}

export default isAuth