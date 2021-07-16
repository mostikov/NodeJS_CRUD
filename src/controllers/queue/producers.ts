import redis from 'redis'
import queue from 'bull'
import Posts from '../../models/Posts';

const redisConnectionOptions: object = {
    redis:{
        port: 6379,
        host: '127.0.0.1'
    }
 } //default connection to local redis

export const publishPostDelay: any = new queue('publishPostDelay',redisConnectionOptions);

/* publishPostDelay.process(async (job, jobDone)=>{
    const {content, title, id} = job.data;
    const newPost: object = await Posts.query().insert({owner_id: id, content, title})
    jobDone();
}) */

/* 
publishPostDelay.on("failed", (err)=>{console.log(err);
});   */