import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigations/MainStack";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
