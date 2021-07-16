import { Model } from 'objection'
import Posts from './Posts'

export default class Users extends Model {
        static tableName = 'users';
        id: number
        first_name: string
        last_name: string
        email: string
        token: string
        password: string
        nickname: string 
     
        static get idColumn() {
            return 'id';
        }
   
        static get relationMappings() {
            return {
                posts: {
                    relation: Model.HasManyRelation,
                    modelClass: Posts,
                    join: {
                        from: 'users.id',
                        to: 'posts.owner_id'
                          }
                       }
                   };
        }
        static get jsonSchema() {
          return {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              first_name: { type: 'string', minLength: 1, maxLength: 255 },
              last_name: { type: 'string', minLength: 1, maxLength: 255 },
              email: { type: 'string', minLength: 1, maxLength: 255 },
              token: { type: 'string', minLength: 1, maxLength: 255 },
              password: { type: 'string', minLength: 1, maxLength: 255 },
              nickname: { type: 'string', minLength: 1, maxLength: 255 }             
            }
          };
        }  
            
}