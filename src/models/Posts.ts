import { Model } from 'objection'
import Users from './Users'


export default class Posts extends Model {
  static tableName = 'posts';
  id: number
  owner_id: number
  content: string
  title: string 

  
      static get idColumn() {
          return 'id';
        }
  
      static get relationMappings() {
          return {
              posts: {
                  relation: Model.HasManyRelation,
                  modelClass: Users,
                  join: {
                      from: 'posts.owner_id',
                      to: 'users.id'
                        }
                     }
                 };
      }
      static get jsonSchema() {
        return {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            owner_id: { type: 'integer' },
            content: { type: 'string'},
            title: { type: 'string'}           
          }
        };
      }  
}