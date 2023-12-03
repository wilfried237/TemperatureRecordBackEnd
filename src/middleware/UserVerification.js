import jwt from "jsonwebtoken";

export const verificationToken = (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token,'secret',(error)=>{
                if(error){
                    return res.json.sendStatus(400);
                }
                next();
            });
        }
        else{
            res.sendStatus(401).json({message: "you need to signIn or signUp"});
        }
    }
    catch{
        res.sendStatus(401).json({message:{
            error: "in valid request"
        } });
    }
}