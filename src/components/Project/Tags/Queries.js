import gql from 'graphql-tag';

export const GET_ALL_TAGS = gql`
  query {
    tags {
      id
      name
      projects {
        id
        project {
          id
          name
        }
      }
    }
  }
`;
export const CREATE_TAG = gql`
  mutation createTag($tag: TagCreateInput!) {
    createTag(data: $tag) {
      id
      name
    }
  }
`;
export const DELETE_TAG = gql`
  mutation deleteThisTag($tag: TagWhereUniqueInput!) {
    deleteTag(where: $tag) {
      name
    }
  }
`;

export const UPDATE_TAG = gql`
  mutation updateThisTag($tag: TagWhereUniqueInput!, $data: TagUpdateInput!) {
    updateTag(where: $tag, data: $data) {
      name
    }
  }
`;

export const VIEW_ALL_TAGS = gql`
  query getTags($tagId: ID!) {
    tags(where: { id: $tagId }) {
      tags {
        id
        tag {
          name
          id
        }
      }
    }
  }
`;