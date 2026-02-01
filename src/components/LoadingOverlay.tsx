import React from 'react';
import { StyleSheet, View, ActivityIndicator, Modal } from 'react-native';

type LoadingOverlayProps = {
  visible: boolean;
};

export default function LoadingOverlay({ visible }: LoadingOverlayProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});