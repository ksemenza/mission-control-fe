import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, refetchQueries } from 'urql';

import { GET_ALL_TAGS as query } from "../Queries/TagQueries";
import { GET_ALL_TAGS as getTagsQuery } from './Queries';
import { CREATE_TAG as createTagQuery } from "../Queries/TagQueries";

import { DISCONNECT_FROM_PROJECT as disconnect } from "../Queries/TagQueries";
import { CONNECT_TO_PROJECT as connectToProjectQuery } from "../Queries/TagQueries";

import { CONNECT_TO_TAG as connectToTagQuery } from "../Queries/TagQueries";
import { DISCONNECT_TO_TAG as disconnectToTagQuery } from "../Queries/TagQueries";
import { UPDATE_TAG as editTagQuery } from "../Queries/TagQueries";
import { DELETE_TAG as deleteTagQuery } from "../Queries/TagQueries";

import { TextField, Button, Card, makeStyles } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import LinearProgress from '@material-ui/core/LinearProgress';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
  root: {},
  container: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '50%',
  },
  icon: {
    '&:hover': {
      cursor: 'pointer',
    },
  },

  tags: {
    border: 'solid 1px pink',
    width: '30%',
    margin: '2% auto',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  tagInput: {
    margin: '3% 0',
  },
});

const Tags = ({ projectId, tagId }) => {
  const classes = useStyles();

  var idObj = { projectId: projectId };
  var idObj2 = { tagId: tagId };

  // Not using delete tag for the time being, just disconnecting tags from projects.

  const [tagName, setTagName] = useState('');

  const [state, reexecuteQuery] = useQuery({
    query,
    variables: idObj, 
  });
  const { data, fetching, error } = state;


  useEffect(() => {
    reexecuteQuery({ requestPolicy: 'network-only' });
  }, []);


  const [addTagResults, addTag] = useMutation(createTagQuery);
  const [connectTagResults, connectTag] = useMutation(connectToProjectQuery);
  const [disconnectTagResults, disconnectTag] = useMutation(disconnect);
  const [connectProjectResults, connectProject] = useMutation(connectToTagQuery);
  const [updateTagResults, updateTag] = useMutation(editTagQuery);
  const [tagQuery, executeGetTagQuery] = useQuery({ query: getTagsQuery });



  console.log(tagQuery.data)
  console.log(query)

  const [edit, setEdit] = useState({
    active: false,
    id: '',
    oldName: '',
    newName: '',
  });

  const editTag = element => {
    if (edit.active) {
      if (edit.id === element.id) {
        return (
          <>
            <CheckIcon
              className={classes.icon}
              color="secondary"
              onClick={submitUpdatedTag}
            />
            <input
              variant="outlined"
              color="secondary"
              className={classes.tagInput}
              onChange={handleEditTag}
              type="text"
              name="tagName"
              id="tagName"
              placeholder={element.name}
              value={edit.newName}
            />
          </>
        );
      }
      return (
        <>
          <EditIcon
            className={classes.icon}
            color="secondary"
            onClick={() => startEdit(element)}
          />
          {element.name}
        </>
      );
    }
    return (
      <>
        <EditIcon
          className={classes.icon}
          color="secondary"
          onClick={() => startEdit(element)}
        />
        {element.name}{' '}
      </>
    );
  };
  const startEdit = element => {
    setEdit({ ...edit, active: true, id: element.id, oldName: element.name });
  };

  const handleEditTag = e => {
    e.persist();
    setEdit({ ...edit, newName: e.target.value });
  };

  let submitUpdatedTag = e => {
e &&  e.preventDefault();
    if (edit.newName !== '') {
      updateTag({ tag: { id: edit.id }, data: { name: edit.newName } }).then(
        () => {
          reexecuteQuery({ requestPolicy: 'network-only' });
          setEdit({ id: '', active: false, oldName: '', newName: '' });
        }
      );
    }
  };

  // Handling adding new tag input field changes

  const handleChange = e => {
    e.persist();
    setTagName(e.target.value);
  }; // end handleChange

  // Handling submit of new tag input field
  const handleSubmit = e => {
    e.preventDefault();
    console.log({ projectId });
    if (tagName !== '') {
      console.log('send new or update query to BE');
      // Using create tag mutation
      addTag({ tag: { name: tagName } }).then(results => {
        // get results of add tag for tag id

        console.log(tagQuery.data)
//* <======= ADD TAG TO PROJECT BY CONNECT ID IN PROJECT TAG ELEMENT || ADD NEW AND MAKE NEW PROJECT TAG ELEMENT =====> */
        if (results.error) {
          console.log(results.error);
          
        } else if(results.data.createTag.name == tagQuery.data.tags.name) 
        { 

          connectProject({
            data: {
              project: {
                connect: {
                  id:projectId,
                },
              },
              tag: {
                connect: {
                  id: tagQuery.data.tags.id,
                }
              }
            }
          }) 
          reexecuteQuery({ requestPolicy: 'network-only' }); 
        } else {
          connectTag({
            data: {
              project: {
                connect: {
                  id: projectId,
                },
              },

              tag: {
                connect: {
                  id: results.data.createTag.id,
                  
                },
              },
            },
            
          })
          reexecuteQuery({ requestPolicy: 'network-only' });
        }
      });
    }    
    setTagName('')
  };

  const handleDelete = id => {
    // disconnectTag relates to ProjectTagElement and disconnects 
    //"deletes" tag from project obj but is still in tag obj
    disconnectTag({ id: id }).then(() => {
      reexecuteQuery({ requestPolicy: 'network-only' });
    });
  };
  
  if (fetching) {
    
    return (
      <p> Loading Tags...
        <span>
      <LinearProgress
        color="secondary"
      />
      </span>
      </p>
    );
    
  }

  if (!data) {
    return (
      <h2>
        <span role="img">Sorry Project Tag Not Found 🤷‍♂️</span>
      </h2>
    );
  } else if (data) {
    return (
      <>
        <TextField
          variant="outlined"
          color="secondary"
          className={classes.tagInput}
          onChange={handleChange}
          type="text"
          name="tagname"
          id="tagname"
          placeholder="Tag Name"
          value={tagName}
        />
        <br />
        <Button variant="outlined" color="secondary" onClick={handleSubmit}>
          Create tag
        </Button>

        <h3> Current Tags </h3>

        <div className={classes.container}>
          {data.project.tags.map(element => (
            <Card className={classes.tags}>
              {editTag(element.tag)}
              <DeleteIcon
                className={classes.icon}
                color="secondary"
                onClick={() => handleDelete(element.id)}
              />
            </Card>
          ))}
        </div>
      </>
    );
  }
};

export default Tags;
