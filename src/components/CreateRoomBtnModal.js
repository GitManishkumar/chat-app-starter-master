import React, { useCallback, useState, useRef } from 'react';
import {
  Modal,
  Icon,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Schema,
  Alert,
} from 'rsuite';
import { useModalState } from '../misc/custom-hooks';
import {database} from '../misc/firebase'
import firebase from 'firebase/app';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chat name is requried'),
  description: StringType().isRequired('Description is required'),
});

const INITIAL_FORM = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const [formValue, setFormVlaue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState();
  const formRef=useRef()

  const onFormChange = useCallback(value => {
    setFormVlaue(value);
  },[]);

  const onSubmit=async ()=>{
if(!formRef.current.check()){
  return
}

setIsLoading(true)

const newRoomdata={
  ...formValue,
  createdAt:firebase.database.ServerValue.TIMESTAMP
}

try {
  
  await database.ref('rooms').push(newRoomdata)

  Alert.info(`${formValue.name} has been created`,4000)

  setIsLoading(false)
  setFormVlaue(INITIAL_FORM)
  close()
} catch (err) {
  setIsLoading(false)
  Alert.error(err.message,4000)
}


  }

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create new chat room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button block appearance="primary" onClick={onSubmit} disabled={isLoading}>
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
