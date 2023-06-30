import React, { useCallback, useState } from 'react';
import { Input, InputGroup,Icon, Alert } from 'rsuite';

const EditableInput = ({
  initialVlaue,
  onSave,
  label = null,
  placeholder = 'write your value',
  emptyMsg = 'Input is empty',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialVlaue);
  const [isEditable, setIsEditable] = useState(false)

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick=useCallback(()=>{
    setIsEditable(p=>!p)
    setInput(initialVlaue)
  },[initialVlaue])

const onSaveClick=async()=>{
  const trimmed =input.trim()
  if(trimmed===''){
    Alert.info(emptyMsg,4000)
  }
  if(trimmed!==initialVlaue){
    await onSave(trimmed)
  }

  setIsEditable(false)
}


  return (
   <div>
    {label}
    <InputGroup>
    <Input
    {...inputProps }
    disabled={!isEditable}
    placeholder={placeholder}
    value={input}
    onChange={onInputChange}
    />
    <InputGroup.Button onClick={onEditClick}>
      <Icon icon={isEditable?'close':'edit2'}/>
    </InputGroup.Button>
    {
      isEditable &&
      <InputGroup.Button onClick={onSaveClick}>
      <Icon icon="check"/>
    </InputGroup.Button>
    }
    </InputGroup>
   </div> 
  )
}
export default EditableInput