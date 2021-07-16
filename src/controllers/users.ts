import Users from '../models/Users'

export async function myProfile (req, res, next): Promise<void>{
    const { id } = req.currentUser[0]
    const user: object = await Users.query().select('id','first_name', 'last_name', 'email', 'nickname').findById(id)
    res.status(200)
    res.send(user) 
    next()
  };

  export async function usersProfile (req, res, next): Promise<void>{
    if(req.params.id){
        const user: object = await Users.query().select('id','first_name', 'last_name', 'email', 'nickname').findById(req.params.id)
        if(user){
            res.status(200)
            res.send(user)
        }else{
          res.status(400)
          res.send({error:400, reason:"Check you user id. User with your Id isn`t exist"})
        }
      }else{
        const users: Array<object> = await Users.query().orderBy('id', 'DESC').limit(10)
        res.status(200)
        res.send(users)
      }
      next()
  };

  export async function updateMyProfile (req, res, next): Promise<void>{
    const { id } = req.currentUser[0]
    const {first_name, last_name, nickname, password, email} = req.body
    if ((first_name || last_name || nickname || password || email) && id){
      await Users.query().findById(id).patch({first_name, last_name, nickname, password, email})
      res.status(200)
      res.send({status:'success'})       
    }else{
      res.status(400)
      res.send({error:400, reason:"Request must have at least of one row to update"})
    }
    next()
  };