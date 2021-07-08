const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')

//typeDef는 graphql에서 사용될 데이터, 요청의 타입 지정. gql로 생성
const typeDefs = gql`
  type Query {
    teams: [Team]
  }
  type Team {
    id: Int
    manager: String
    office: String
    extension_number: String
    mascot: String
    cleaning_duty: String
    project: String
  }
`
//resolver는 서비스의 액션들을 함수로 지정하고 요청에 따라 데이터를 반환,입력,수정,삭제함
const resolvers = {
  Query: {
    teams: () => database.teams
  }
}
//apollo server >>> typeDef와 resolver를 인자로 받아 서버를 생성.
const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})