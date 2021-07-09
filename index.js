const { ApolloServer, gql } = require('apollo-server')

const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const equipments = require('./typedefs-resolvers/equipments')
const supplies = require('./typedefs-resolvers/supplies')
const enums = require('./typedefs-resolvers/_enums')
//typeDef는 graphql에서 사용될 데이터, 요청의 타입 지정. gql로 생성
//Query >> 조회하는것 Mutation >>데이터에 수정을 가함
const typeDefs = [
    queries,
    enums,
    mutations,
    equipments.typeDefs,
    supplies.typeDefs
]


//resolver는 서비스의 액션들을 함수로 지정. 요청에 따라 데이터를 반환,입력,수정,삭제함
const resolvers = [
    equipments.resolvers,
    supplies.resolvers
]
//apollo server >>> typeDef와 resolver를 인자로 받아 서버를 생성.
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})