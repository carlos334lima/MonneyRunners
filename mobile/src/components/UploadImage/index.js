import React, { useEffect, useState } from "react";
import { Alert, View, TouchableOpacity, Image } from "react-native";

import { Box, Title, Text, Cover } from "../../components";

import * as ImagePicker from "expo-image-picker";

import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const UploadImage = ({ image = null, callback = () => {} }) => {
  const [imageSelected, setImageSelected] = useState("");

  useEffect(() => {
    requestAccessMedia();
  }, []);

  const requestAccessMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negaga.",
        "Desculpe, mas precisamos acessar suas fotos.",
        [
          {
            text: "Permitir Acesso",
            onPress: () => {
              requestAccessMedia();
            },
            style: "cancel",
          },
          {
            text: "Cancelar",
          },
        ]
      );
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    setImageSelected(result.uri);
    callback(result);
  };

  return (
    <Box
      background="danger"
      height="230px"
      width="100%"
      justify="center"
      alignItems="center"
      style={{ borderRadius: 5 }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => pickImage()}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        {imageSelected ? (
          <>
            <Image
              source={{ uri: imageSelected }}
              style={{ height: 230, width: 335, borderRadius: 5 }}
            />
          </>
        ) : (
          <>
            <Icon
              name="image-search-outline"
              color="#FFF"
              size={100}
              style={{ marginLeft: 110 }}
            />
            <Text color="light" style={{ marginLeft: 75 }}>
              Adicione uma Imagem
            </Text>
          </>
        )}
      </TouchableOpacity>
    </Box>
  );
};

export default UploadImage;
