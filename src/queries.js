import gql from 'graphql-tag';

export const getSignIns  = gql`
query getSignIns{
  signIns {
    id
    worker
    remote
  }
}`

export const getSingleCast = gql`
query getSingleCast($id: String){
    singleCast(id: $id) {
        id
        firstName
        lastName
        sessions {
          slug
          show
          active
          hours {
            id
            worker
            comment
            datestamp
            timeIn
            timeOut
            castId
            remote
          }
        }
    }
}
`

export const getActiveCast = gql`
query {
  activeCast {
    id
    firstName
    lastName
    sessions {
      slug
    }
  }
}`

