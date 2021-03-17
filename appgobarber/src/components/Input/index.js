import React, { useEffect, useRef,useImperativeHandle,forwardRef } from 'react';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

const Input = ({ name, icon, ...rest },ref) => {
  const inputValueRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useImperativeHandle(ref, () => ({
    focus(){
      inputValueRef.current.focus()
    }
  }))
  

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,

      getValue() {
        return inputValueRef.current.value || '';
      },
      setValue(ref, value) {
        inputValueRef.current.setNativeProps({ text: value });
        inputValueRef.current.value = value;
      },
      clearValue() {
        if (inputValueRef.current) {
          inputValueRef.current.setNativeProps({ text: '' });
          inputValueRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);
  

  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        ref={inputValueRef}
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={(value) => (inputValueRef.current.value = value)}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
