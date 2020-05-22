//LAB23-T1
import gql from 'graphql-tag';

export const TAG_LIST_VIEW = gql`
  query {
    tags {
      id
      name 
      isUsed
      projects {
        id
        
      }
    }    
  }
`;
export const GET_ALL_TAGS = gql`
  query {
    tags {
      id
      name
      projects {
        name
      }
    }
}
`;

export const GET_ALL_TAG_RELATIONS = gql`
  query getRelations($id: ID!) {
    projectTagElements(where: {tag : {id: $id}}) {
      name
      id
    }
  }`;