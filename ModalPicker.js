import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';

export const ModalPicker = ({
  buttonText,
  openButtonStyle,
  openButtonTextStyle,
  modalContainerStyle,
  modalContentStyle,
  buttons,
  pickButtonStyle,
  pickButtonTextStyle,
  buttonCancelText,
  asButton,
}) => {
  const [modal, setModal] = useState(false);
  return (
    <View>
      {asButton ? (
        <Button
          accessibilityLabel={buttonText ? buttonText : 'Pick the files'}
          color={openButtonStyle && openButtonStyle.backgroundColor}
          title={buttonText ? buttonText : 'Pick the files'}
          onPress={() => setModal(true)}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setModal(true)}
          style={[styles.openButtonStyle, openButtonStyle]}>
          <Text style={[styles.openButtonTextStyle, openButtonTextStyle]}>
            {buttonText ? buttonText : 'Pick the files'}
          </Text>
        </TouchableOpacity>
      )}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <View style={[styles.modalContainerStyle, modalContainerStyle]}>
            <View style={[styles.modalContentStyle, modalContentStyle]}>
              {buttons &&
                Array.isArray(buttons) &&
                buttons.map((button, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={async () => {
                        await button.onPress();
                        setModal(false);
                      }}
                      style={[styles.pickButtonStyle, pickButtonStyle]}>
                      <Text
                        style={[
                          styles.pickButtonTextStyle,
                          pickButtonTextStyle,
                        ]}>
                        {button.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={[styles.pickButtonStyle, pickButtonStyle]}>
                <Text style={[styles.pickButtonTextStyle, pickButtonTextStyle]}>
                  {buttonCancelText ? buttonCancelText : 'cancel'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  openButtonStyle: {
    backgroundColor: '#000',
    padding: 10,
  },
  openButtonTextStyle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  modalContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentStyle: {
    backgroundColor: '#fff',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  pickButtonStyle: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cacaca',
    width: '100%',
  },
  pickButtonTextStyle: {
    textAlign: 'center',
  },
});

export default ModalPicker;

ModalPicker.propTypes = {
  buttonText: PropTypes.string,
  openButtonStyle: PropTypes.object,
  openButtonTextStyle: PropTypes.object,
  modalContainerStyle: PropTypes.object,
  modalContentStyle: PropTypes.object,
  buttons: PropTypes.array,
  pickButtonStyle: PropTypes.object,
  pickButtonTextStyle: PropTypes.object,
  buttonCancelText: PropTypes.string,
  asButton: PropTypes.bool,
}