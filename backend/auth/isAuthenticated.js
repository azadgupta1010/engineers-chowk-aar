/*
import jwt from "jsonwebtoken";
const isAuthenticated = async (req,res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            })
        };
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            });
        }
        req.id = decode.userId;
        next();
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;

*/
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        req.id = decode.userId; // Attach user ID to the request object
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Token has expired",
                success: false
            });
        }
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default isAuthenticated;
