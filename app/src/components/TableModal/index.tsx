import { Text } from "../Text";
import { Modal, TouchableOpacity, Platform } from "react-native";
import { ModalBody, Overlay, Header, Form, Input } from "./styles";
import { Close } from "../Icons/Close";
import { Button } from "../Button/index";
import { useState } from "react";

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {

  const [ table, setTable ] = useState('');

  function handleSave() {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              value={table}
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}//armazena o valor do n da mesa
            />

            <Button onPress={handleSave} disabled={table.length === 0}>Salvar</Button>
          </Form>
        </ModalBody>
      </Overlay>

    </Modal>
  );
}
