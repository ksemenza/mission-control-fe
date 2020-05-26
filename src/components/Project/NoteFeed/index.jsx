import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useQuery } from 'urql';
import Note from './Note';

import { NOTE_FEED_QUERY as query } from '../Queries/index';

const NotesFeed = ({ projectId, privateBol }) => {
  const [state] = useQuery({
    query,
    variables: { id: projectId, privatePerm: privateBol },
    requestPolicy: 'cache-and-network',
  });

  const { data, fetching, error } = state;

  if (error) {
    return <p>Error</p>;
  }

  if (fetching) {
    return       <LinearProgress
    variant="determinate"
    value={0}
    valueBuffer={100}
    color="primary"
  />
  }

  if (data && data.project && data.project.notes) {
    return (
      <div>
        {data.project.notes.map(note => {
          return (
            <Note
              projectId={projectId}
              key={note.id}
              note={note}
              user={data.me}
              projectManagers={data.project.projectManagers}
            />
          );
        })}
      </div>
    );
  }

  return <p>There Are No Notes</p>;
};

export default NotesFeed;
