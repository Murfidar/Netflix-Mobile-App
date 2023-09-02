import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE_BY_ID = gql`
  query Movie($movieId: ID) {
    movie(id: $movieId) {
      id
      title
      synopsis
      imgUrl
      rating
      trailerUrl
      Casts {
        name
        profilePict
      }
    }
  }
`;

export default function Detail({ route }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, {
    variables: { movieId: id },
  });

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>Loading assets....</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={{ width: 200, height: 500, resizeMode: "contain" }}
            source={{ uri: data.movie.imgUrl }}
          />
          <Text>{data.movie.title}</Text>
          <Text>{data.movie.synopsis}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
});
