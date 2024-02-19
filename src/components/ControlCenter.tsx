import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'


import Icon from 'react-native-vector-icons/MaterialIcons'

import { playbackService } from '../../musicPlayerService'

const ControlCenter = () => {

    const playbackState = usePlaybackState();
    // next button
    const skipToNext = async () => {
        await TrackPlayer.skipToNext()
    }
    // Previous button
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious()
    }

    const togglePlayback = async () => {
      try {
        const currentTrack = await TrackPlayer.getActiveTrackIndex();
        console.log(currentTrack)
        if (currentTrack !== null) {
            if (playbackState.state === State.Paused || playbackState.state === State.Ready) {
                console.log("Control Center: Play")
                await TrackPlayer.play();
            } else {
              console.log("Control Center: Pause")
                await TrackPlayer.pause();
            }
        }
      } catch (error) {
        console.log("TOGGLE PLAY BACK: " + error)
      }

    }

  return (
    <View style={styles.container}>
    <Pressable onPress={skipToPrevious}>
        <Icon style={styles.icon} name="skip-previous" size={40} />
    </Pressable>
    <Pressable onPress={() => togglePlayback()}>
        <Icon
            style={styles.icon}
            name={playbackState.state === State.Playing ? "pause" : "play-arrow"}
            size={75}
        />
    </Pressable>
    <Pressable onPress={skipToNext}>
        <Icon style={styles.icon} name="skip-next" size={40} />
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 56,
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#FFFFFF',
    },
    playButton: {
      marginHorizontal: 24,
    },
  });

export default ControlCenter