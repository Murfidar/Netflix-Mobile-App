import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Card({ movie }) {
  const navigation = useNavigation();
  const onPress = () => navigation.navigate("Detail", { id: movie.id });
  return (
    <View key={movie.id} style={styles.container}>
      <TouchableHighlight onPress={onPress}>
        <Image
          style={{ width: 120, height: 180, resizeMode: "contain" }}
          source={{ uri: movie.imgUrl }}
        />
      </TouchableHighlight>
      <Text>{movie.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
