import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const renderMore = () => {

  const MainDataUrl = 'https://184d-2409-40f0-104d-89ed-b44c-185c-8a72-d231.ngrok-free.app/get-data';

  const fetchData = async () => {
    try {
      const response = await fetch(MainDataUrl);
      const fetchedData = await response.json();

      const validData = fetchedData.map((item) => ({
        id: item.id || '',
        name: item.name || 'Unknown name',
        artist: item.artist || 'Unknown Artist',
        img: item.img || '',
        url: item.url || '',
        duration: item.duration || '',
        movie: item.movie || '',
        theme: item.movie || '',
        heroine: item.heroine || '',
      }));
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  )
}

export default renderMore;

const styles = StyleSheet.create({

})