import React, { useState, useCallback, useContext } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import {
  modalStyle,
  buttonStyle,
  basicInput,
  form,
  addColumnButton,
  headerDiv,
  closeButton,
  modalCont,
  button,
} from './CreateColumn.module.scss';
import { useMutation } from 'urql';
import { CREATE_STATUS as createStatus } from '../../Project/Queries/index';

import { ColumnContext } from '../../../contexts/ColumnContext';

const CreateColumn = ({ programId, statuses }) => {
  // Context is not really being used to max potential
  // Might want to rework to use it or scrap it
  const { column, setColumn } = useContext(ColumnContext);
  const [open, setOpen] = useState(false);
  const [, executeCreate] = useMutation(createStatus);

  let displayFiltered = statuses.filter(function(e) {
    return e.display === true;
  });

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const toggle = useCallback(() => {
    handleClose();
    setColumn({ name: '' });
  }, [setColumn]);

  const handleChanges = e => {
    e.preventDefault();
    setColumn({
      ...column,
      [e.target.name]: e.target.value,
      id: programId,
    });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      // If there are 4 statuses that are toggled with display value true
      // Created statuses will be created with a default value of false
      if (displayFiltered.length >= 4) {
        executeCreate({ id: programId, name: column.name, display: false });
      } else {
        executeCreate(column);
      }
      toggle();
    },
    [executeCreate, column, toggle, programId, displayFiltered.length]
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={toggle}
        trigger={
          <button className={addColumnButton} onClick={handleOpen}>
            Add Column
          </button>
        }
        className={modalStyle}
      >
        <Modal.Header className={headerDiv}>
          {' '}
          <button className={closeButton} onClick={toggle}>
            x
          </button>
          Add Column
        </Modal.Header>
        <Modal.Content className={modalCont}>
          <form className={form}>
            <label> Column Name </label>
            <input
              value={column.name}
              name="name"
              onChange={handleChanges}
              placeholder="Status"
              className={basicInput}
            />
          </form>
        </Modal.Content>
        <Modal.Actions className={buttonStyle}>
          <Button className={button} onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CreateColumn;
