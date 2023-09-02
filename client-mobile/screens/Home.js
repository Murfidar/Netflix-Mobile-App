import { Button, View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../components/Card";

import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query movies {
    movies {
      id
      title
      imgUrl
      Genre {
        name
      }
    }
  }
`;

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_MOVIES);
  const genres = useQuery(GET_MOVIES).data;

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 4,
            gap: 10,
            padding: 10,
          }}
        >
          <Text>Loading assets....</Text>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flex: 4,
            gap: 10,
            padding: 10,
          }}
        >
          <FlatList
            horizontal
            style={{ flex: 1 }}
            data={data.movies}
            renderItem={({ item }) => {
              return <Card movie={item} />;
            }}
            keyExtractor={(item) => item.id}
          />
          <FlatList
            horizontal
            style={{ flex: 1 }}
            data={data.movies}
            renderItem={({ item }) => {
              return <Card movie={item} />;
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  movieContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
});
