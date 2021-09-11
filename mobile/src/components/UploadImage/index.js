import React, { useEffect } from "react";
import { Alert, View } from "react-native";

import { Box, Title } from "../../components";

import * as ImagePicker from "expo-image-picker";

const UploadImage = () => {
  useEffect(() => {
    requestAccessMedia();
  }, []);

  const requestAccessMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permissão negaga.',
        'Desculpe, mas precisamos acessar suas fotos.',
        [
          {
            text: 'Permitir Acesso',
            onPress: () => {
                requestAccessMedia();
            },
            style: 'cancel',
          },
          {
            text: 'Cancelar',
          },
        ]
      );
    }
  };

  return (
    <Box>
      <Title color="danger">Upload</Title>
    </Box>
  );
};

export default UploadImage;
