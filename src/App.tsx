import React, {useState, useEffect} from "react"

import type {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import MusicPlayer from "./screens/MusicPlayer";
import { addTrack, setupPlayer } from "../musicPlayerService";


function App(): JSX.Element {
  const [isPlayerReady, setIsPaylerReady] = useState(false)

  async function setup(){
    try {
      let isSetup = await setupPlayer()

      if (isSetup) {
        await addTrack()
      }
  
      setIsPaylerReady(isSetup)  
    } catch (error) {
      console.log("ERRO MALDITO: " + error)
    }
    
  }

  useEffect(() => {
    setup()
  }, [])
  
  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <MusicPlayer />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});

export default App;