import React, { useState } from 'react';
import { useMutation } from 'urql';
import { Modal, Button } from 'semantic-ui-react';
import { DELETE_STATUS as deleteColumn } from '../../Project/Queries/index';
import { FaTrashAlt } from 'react-icons/fa';
import { hover } from '../StatusLabel/StatusLabel.module.scss';
import { deleteColumnModal } from './DeleteColumn.module.scss';

const DeleteColumn = ({ column }) => {
  const [open, setOpen] = useState(false);
  const [, executeDelete] = useMutation(deleteColumn);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = e => {
    e.preventDefault();
    executeDelete(column);
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className={deleteColumnModal}
      trigger={<FaTrashAlt className={hover} onClick={handleOpen} />}
      size={'tiny'}
    >
      <Modal.Header>Delete Status "{column.name}"?</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <h3>WARNING</h3>{' '}
          <p>Deleting this column will also delete all coresponding labels</p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          positive
          icon="checkmark"
          labelPosition="right"
          content="Confirm"
          onClick={handleSubmit}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteColumn;
