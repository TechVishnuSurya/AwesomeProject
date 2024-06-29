import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import DocumentDetails from './documentType/DocumentDetails';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SaleDeed from './documentType/SaleDeed';
import DocumentType from './pages/DocumentType';
import WriterOrAdvocateFees from './pages/WriterOrAdvocateFees';
import PDFprint from './pages/PDFprint';
import { MyProvider } from './context/MyContext';
import LandAreaCalculation from './pages/LandAreaCalculation';
import WriterOrAdvocateProfile from './pages/WriterOrAdvocateProfile';
import FirstPage from './pages/FirstPage';
import PublicProfile from './pages/PublicProfile';
import Profile from './pages/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="FirstPage">
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="FirstPage" component={FirstPage} />
          <Stack.Screen name="PublicProfile" component={PublicProfile} />
          <Stack.Screen name="WriterOrAdvocateProfile" component={WriterOrAdvocateProfile} />
          <Stack.Screen name="DocumentType" component={DocumentType} />
          <Stack.Screen name="Government Value" component={SaleDeed} />
          <Stack.Screen name="WriterOrAdvocateFees" component={WriterOrAdvocateFees} />
          <Stack.Screen name="PDFprint" component={PDFprint} />
          <Stack.Screen name="LandAreaCalculation" component={LandAreaCalculation} />

        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: "10%",
    justifyContent: 'center',
  },
  scrollViewContainer: {
    position: "sticky",
    top: "0",
    alignItems: 'center',
  },
});
