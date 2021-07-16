import express from 'express';
const router = express.Router();
import * as posts from '../controllers/posts'
import * as users from '../controllers/users'
import auth from '../controllers/auth'



router.get('/', posts.show);  

router.get('/my', auth, posts.userPosts);

router.get('/show/:id', auth, posts.show); 

router.post('/auth', auth); 

router.post('/posts/create', auth, posts.create); 

router.patch('/posts/update', auth, (req, res, next) => posts.update(req, res, next).catch(e => next(e)));

router.delete('/posts/delete', auth, posts.del);

router.get('/profile', auth, users.myProfile); 

router.get('/user/:id', auth, users.usersProfile); 

router.get('/users', auth, users.usersProfile); 

router.post('/profile', auth, users.updateMyProfile); 


export default router