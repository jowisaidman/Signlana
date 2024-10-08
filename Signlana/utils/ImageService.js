import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Camera } from 'expo-camera';

export async function getRandomDataFromImage() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const { statusCamera } = await Camera.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('Please provide camera roll permissions');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (!result.cancelled) {
    const imageData = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

    return imageData;
  }
}