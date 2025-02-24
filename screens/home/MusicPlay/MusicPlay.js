import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Audio } from 'expo-av';
import MusicPlayerModal from './MusicPlayerModal';

const MusicPlayerCard = ({ songDetails, selectedIndex , setSelectedIndex}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(0);
  const [soundPosition, setSoundPosition] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(selectedIndex);
  const [isLoading , setIsLoading] = useState(false);

  // Load the current song based on `currentSongIndex`
  useEffect(() => {
    let isMounted = true;
    if(isLoading) return; 
    const loadSound = async () => {
      if(isLoading) return; 
      setIsLoading(true);
      if (!isMounted) return;
      try {
        if (sound) {
          await sound.stopAsync() ;
          await sound.unloadAsync();
          setSound(null);
        }
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: `https://localsongsdata.onrender.com/${songDetails[currentSongIndex]?.url}` },
          { shouldPlay: true },
          (status) => {
            if (status.isLoaded) {
              setDuration(status.durationMillis || 0);
              setSoundPosition(status.positionMillis || 0);
              setProgress((status.positionMillis || 0) / (status.durationMillis || 1));
              setIsBuffering(status.isBuffering);
              
            }
          }
        );
        setSound(newSound);
        setIsLoading(false)
        setIsPlaying(true);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadSound();

    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [currentSongIndex, songDetails]);

  // Update `currentSongIndex` when `selectedIndex` changes
  useEffect(() => {
    setCurrentSongIndex(selectedIndex);
  }, [selectedIndex]);

  // Play/Pause functionality
  const pauseResumeSound = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  // Seek functionality
  const handleSeek = async (value) => {
    console.log("value :" , value);
    const newPosition = value ;
    console.log("new postion :", newPosition);
    if (sound) {
      await sound.setPositionAsync(newPosition);
      setSoundPosition(newPosition);
      setProgress(value);
    }
  };

  // Update progress based on sound position
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(async () => {
        if (sound) {
          const status = await sound.getStatusAsync();
          if (status.isLoaded) {
            setSoundPosition(status.positionMillis || 0);
            setProgress((status.positionMillis || 0) / (status.durationMillis || 1));
          }
        }
      }, 10000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  // Play next song
  const playNext = () => {
    if (currentSongIndex < songDetails.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
    setSelectedIndex(currentSongIndex+1);
  };

  // Play previous song
  const playPrevious = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    }
    setSelectedIndex(currentSongIndex-1);
  };

  // Format time
  const formatTime = (timeMillis) => {
    const minutes = Math.floor(timeMillis / 60000);
    const seconds = ((timeMillis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
    console.log("progress", formatTime(soundPosition), formatTime(duration));  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.musicCardTouchable}>
        <View style={styles.iconContainer}>
          <Icon name="signal" size={18} color="#A020F0" />
        </View>

        <View style={styles.contentContainer}>
          <Image
            source={
              songDetails[currentSongIndex]?.img && {
                uri: `https://localsongsdata.onrender.com/${songDetails[currentSongIndex]?.img}`,
              }
            }
            style={styles.albumArt}
          />
          <View style={styles.textContainer}>
            <Text style={styles.songText} numberOfLines={1}>
              {songDetails[currentSongIndex]?.name}
            </Text>
            <Text style={styles.artistText} numberOfLines={1}>
              {songDetails[currentSongIndex]?.artist.join(', ')}
            </Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={playPrevious}
            disabled={currentSongIndex === 0}
          >
            <Icon name="skip-previous" size={24} color={currentSongIndex === 0 ? '#555' : 'white'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.pauseButton} onPress={pauseResumeSound}>
            {isBuffering ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Icon name={isPlaying ? 'pause' : 'play'} size={20} color="white" />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navButton}
            onPress={playNext}
            disabled={currentSongIndex === songDetails.length - 1}
          >
            <Icon
              name="skip-next"
              size={24}
              color={currentSongIndex === songDetails.length - 1 ? '#555' : 'white'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <MusicPlayerModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        isPlaying={isPlaying}
        handlePlayPause={pauseResumeSound}
        progress={progress}
        handleSeek={handleSeek}
        duration={duration}
        soundPosition={soundPosition}
        isBuffering={isBuffering}
        songDetails={songDetails[currentSongIndex]}
        playNext={playNext}
        playPrevious={playPrevious}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10, 54, 39, 0.8)',
    borderRadius: 50,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    height: 100,
    position: 'absolute',
    left: '5%',
    bottom: 6,
    zIndex: 10,
    backdropFilter: 'blur(0px)',
  },
  musicCardTouchable: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  albumArt: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    justifyContent: 'center',
    width: '70%',
  },
  artistText: {
    color: '#D3D3D3',
    fontSize: 12,
  },
  songText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#FF8C00',
    borderRadius: 15,
    padding: 8,
    marginHorizontal: 8,
  },
  navButton: {
    padding: 8,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    width: '100%',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  timeText: {
    color: 'white',
    fontSize: 12,
  },
});

export default MusicPlayerCard;