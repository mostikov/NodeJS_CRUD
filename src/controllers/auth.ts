import Users from '../models/Users'
import jwt from 'jsonwebtoken'

export default async function auth (req, res, next): Promise<void>{
    
    if(req.headers['authorization']){
        const headers: string = req.headers['authorization']
        const token: string = headers.split(' ')[1];
        const verifyUser: any = await jwt.verify(token, process.env.SECRET_KEY, (err, success)=>{
            if (err){
                res.status(401)   
                res.json({error: 401, reason: "invalid token"})
            }else{
                return success;
            }
        })
        const {nickname ,password, iat} = verifyUser
        const expiredAfter: number = (iat+(Number(process.env.JWT_TOKEN_EXIRES)*86400))-Math.round(Date.now()/1000);
        if(expiredAfter>0){ 
        req.currentUser = await Users.query().where({nickname:nickname,password:password});
        next()
        }else{
        res.status(401)
        res.json({error:401, reason:"Please, authorize. Token expired"})
        }
    }

    if (req.body.nickname && req.body.password && !req.headers['authorization']){
        const userData: object = req.body;
        const getUser = await Users.query().where(userData);
        if(getUser.length){
            const token: any = jwt.sign(userData, process.env.SECRET_KEY)
            res.status(200)
            res.json({status:'success',token})
        }else{
            res.status(401)
            res.json({error:401, reason:"Incorrect login or password"})
        }
    }
    if(!req.headers['authorization'] && !req.body.nickname && !req.body.password){
    res.status(401)
    res.json({error:401, reason:"Please, authorize"})
    }
  };