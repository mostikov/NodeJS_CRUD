import * as queue from './producers'

export function addPostWithDelay(data){
    return queue.publishPostDelay.add(data,{
        delay: data.delay
      } )

}