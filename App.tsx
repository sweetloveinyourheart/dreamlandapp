import "./ignoreWarning"
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Tabs } from './tabs/bottom-navigation';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, ApolloLink, fromPromise } from '@apollo/client';
import { AppRegistry } from 'react-native';
import { ApolloUri } from './constants/apollo';
import { createStackNavigator } from '@react-navigation/stack';
import AddressProvider from './contexts/address';
import RSPostScreen from './screens/post-screen';
import ProjectScreen from "./screens/project-screen";
import UploadScreen from "./screens/upload-screen";
import { AuthProvider } from "./contexts/auth";
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onError } from "@apollo/client/link/error";
import { REFRESH_TOKEN } from "./graphql/queries/auth";
import ViewHistoryProvider from "./contexts/view-history";
import FlashMessage from "react-native-flash-message";
import SearchScreen from "./screens/search-screen";
import { NotificationProvider } from "./contexts/notification";
import UploadedInfoScreen from "./screens/uploaded-info-screen";
import AuthScreen from "./screens/auth-screen";

let client: ApolloClient<any>

const getNewToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken')

  const { data, error } = await client.query({ query: REFRESH_TOKEN, variables: { refreshToken } })

  if (!data && error) {
    await AsyncStorage.removeItem('refreshToken')
    throw new Error()
  }

  const { accessToken } = data.refreshToken
  await AsyncStorage.setItem('accessToken', accessToken)

  return accessToken;
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions }) => {
      switch (extensions.code) {
        case "UNAUTHENTICATED":
          return fromPromise(
            getNewToken()
              .then((accessToken) => {
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${accessToken}`,
                  },
                });
                return forward(operation);
              })
              .catch(err => { })
          );
      }
    }
    );

});

const httpLink = createHttpLink({
  uri: ApolloUri,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem('accessToken')
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

// Initialize Apollo Client
client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache()
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <NotificationProvider>
          <AuthProvider>
            <ViewHistoryProvider>
              <AddressProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name='screen' component={Tabs} />
                  <Stack.Screen name='post-screen' component={RSPostScreen} />
                  <Stack.Screen name='project-screen' component={ProjectScreen} />
                  <Stack.Screen name='upload-screen' component={UploadScreen} />
                  <Stack.Screen name='uploaded-screen' component={UploadedInfoScreen} />
                  <Stack.Screen name='search-screen' component={SearchScreen} />
                  <Stack.Screen name='auth-screen' component={AuthScreen} />
                </Stack.Navigator>
                <FlashMessage position="center" />
              </AddressProvider>
            </ViewHistoryProvider>
          </AuthProvider>
        </NotificationProvider>
      </ApolloProvider>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
