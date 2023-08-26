import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from "./components/Game"
import Header from './components/Header';
import Footer from './components/Footer';
export default function App() {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Game />
      </View>
      <Footer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
