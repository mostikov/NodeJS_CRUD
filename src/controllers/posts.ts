import Posts from '../models/Posts'
import * as queues from './queue/queues'

export async function show (req, res, next){
  if(req.params.id){
    const posts: object = await Posts.query().findById(req.params.id)
    if(posts){
        res.status(200)
        res.send(posts)
    }else{
      res.status(400)
      res.send({error:400, reason:"Check you post id. Posts with your Id isn`t exist"})
    }
  }else{
    const posts: Array<object> = await Posts.query().orderBy('id', 'DESC').limit(10)
    res.status(200)
    res.send(posts)
  }
  next()
};

export async function create (req, res, next){
  
  const { id } = req.currentUser[0]
  const {content, title, delay} = req.body
  if(content && title){
    if(delay>0){
      queues.addPostWithDelay({content, title, delay, id})
      res.status(200)
      res.send({status:'success', description:`new post will be added after ${delay/1000}sec`}) 
    }else{
      const newPost: object = await Posts.query().insert({owner_id: id, content, title})
    }
  }else{
    res.status(400)
    res.send({error:400, reason:"Request must have content and title rows of new post"})
  }  
  next()
};

export async function update (req, res, next): Promise<void>{
  const { id } = req.currentUser[0]
  const {content, title, postId} = req.body
  if ((content || title) && postId){
    const targetPost = await Posts.query().findById(postId)
    if(targetPost){
        if(id === targetPost.owner_id){
            const newPost = await Posts.query().findById(postId).patch({content, title})
            res.status(200)
            res.send({status:'success'})       
        }else{
            res.status(400)
            res.send({error:400, reason:"Access denied. You are not owner of this post"})
        }
    }else{
        res.status(400)
        res.send({error:400, reason:"Check you post id. Posts with your Id isn`t exist"})
    }
  }else{
    res.status(400)
    res.send({error:400, reason:"Request must have id of target post (postId) and title or content or both rows to update"})
  }
  next()
};

export async function del (req, res, next): Promise<void>{
  const { id } = req.currentUser[0]
  const {postId} = req.body
  if (postId){
    const targetPost = await Posts.query().findById(postId)
    if(targetPost){
        if(id === targetPost.owner_id){
            const newPost = await Posts.query().deleteById(postId)
            res.status(200)
            res.send({status:'success'})       
        }else{
            res.status(400)
            res.send({error:400, reason:"Access denied. You are not owner of this post"})
        }
    }else{
        res.status(400)
        res.send({error:400, reason:"Check you post id. Posts with your Id isn`t exist"})
    }
  }else{
    res.status(400)
    res.send({error:400, reason:"Request must have id of target post to delete"})
  }
  next()
};

export async function userPosts (req, res, next): Promise<void>{
  const { id } = req.currentUser[0]
  const posts: Array<object> = await Posts.query().where('owner_id', id)
  res.status(200)
  res.send(posts) 
  next()
};