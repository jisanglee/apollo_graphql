const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')

//typeDef는 graphql에서 사용될 데이터, 요청의 타입 지정. gql로 생성
//Query >> 조회하는것 Mutation >>데이터에 수정을 가함
const typeDefs = gql`
  type Query {
    teams: [Team]
    team(id:Int):Team
    equipments:[Equipment]
    supplies:[Supply]
  }
  type Mutation{
      insertEquipment(
          id:String,
          used_by:String,
          count:Int,
          new_or_used:String
      ):Equipment
      editEquipment(
          id:String,
          used_by:String,
          count:Int,
          new_or_used:String
      ):Equipment
      deleteEquipment(id:String):Equipment
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
    supplies: [Supply]
  }
  type Equipment{
      id:String
      used_by:String
      count:Int
      new_or_used:String
  }
  type Supply{
      id:String,
      team:Int
  }
`


//resolver는 서비스의 액션들을 함수로 지정. 요청에 따라 데이터를 반환,입력,수정,삭제함
const resolvers = {
  Query: {
        teams: () => database.teams
            .map((team) => {
            team.supplies = database.supplies
                .filter((supply) => {
                return supply.team === team.id
                })
                return team
        }),
        team: (parent, args, context, info) => database.teams
            .filter((team) => {
                return team.id === args.id 
        })[0],
        equipments: () => database.equipments,
        supplies: () => database.supplies
    },
    Mutation: {
        insertEquipment: (parent, args, context, info) => {
            database.equipments.push(args)
            return args
        },
        editEquipment: (parent, args, context, info) => {
            return database.equipments.filter((equipment) => {
                    return equipment.id === args.id
            }).map((equipment) => {
                Object.assign(equipment, args)
                return equipment
                })[0]
        },
        deleteEquipment: (parent, args, context, info) => {
            const deleted = database.equipments
                .filter((equipment) => {
                    return equipment.id === args.id
                })[0]
            database.equipments = database.equipments
                .filter((equipment) => {
                    return equipment.id !== args.id
                })
            return deleted
        }
    }
}
//apollo server >>> typeDef와 resolver를 인자로 받아 서버를 생성.
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})