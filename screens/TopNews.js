import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, Dimensions } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import WebView from 'react-native-webview';
import { FlatGrid } from 'react-native-super-grid';
import { useNavigation } from '@react-navigation/native';
import * as parameters from '../utils/parameters'

const mainPartOfURL = parameters.mainPartOfURL;
const apiKey = parameters.apiKey;
const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(screenWidth * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);


function TopNews (){
  const navigation = useNavigation();
  const [country, setCountry] = useState('gb');
  const [items, setItems] = useState([]);

  const fetchDataFromURL = (value) => {
    const news = [];
      console.log(`You choosed ${value}`);
      let searchCriteria = 'country='.concat(value).concat('&').concat('apiKey=').concat(apiKey);
      let newUrl = mainPartOfURL.concat(searchCriteria)
      fetch(newUrl, {
             method: 'GET'
          })
          .then((response) => response.json())
          .then((responseJson) => responseJson.articles)
          .then((articles) => {
            articles.map(article => {
              news.push({
                title: article.title,
                urlToImage: article.urlToImage,
                description: article.description == null ? '' : article.description,
                content: article.content == null ? '' : article.content,
              })
            })
          })
          .then(()=>{
            setItems(news)
          })
          .catch((error) => {
             console.error(error);
          });
  }
  useEffect(() => {
    console.log('Effect triggered')
    fetchDataFromURL(country)
  }, [])
  return (
    <View style={styles.container}>
      <SwitchSelector style={styles.switchSelector} options={parameters.availableCountries} initial={0} buttonColor='#45ADA8' onPress={ (value) => {console.log(value); setCountry(value), fetchDataFromURL(value)}} />
      <FlatGrid
        itemDimension={parameters.fontSizer(screenWidth) * 9}
        data={items}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <View style={[parameters.styles.itemContainer, { backgroundColor: '#547980' }]}>
            <WebView 
              scrollEnabled={false}
              bounces={false}
              style={parameters.styles.itemTitle}
              source={{ html: `<p style='text-align: justify; color: #9DE0AD; font-size: 52'>${item.title}</p>` }}
            />            
            <Image style={parameters.styles.itemImage}
              source={{uri: item.urlToImage }}
            />
            <WebView 
              scrollEnabled={false}
              bounces={false}
              style={parameters.styles.itemDescription}
              source={{ html: `<p style='text-align: justify; color: white; font-size: 46'>${item.description}</p>` }}
            />
            <View>
              <Button
                style={parameters.styles.more}
                title='More >'
                onPress={() => navigation.navigate('OneNews', {selectedLanguage: country, openedNews: item})}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      flex: 1,
    },
    switchSelector: {
      width: '50%',
      alignSelf: "center"
    },
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-start',
      borderRadius: 5,
      padding: 10,
      height: 300,
    },
    itemTitle: {
      color: '#fff',
      fontSize: 12,
      height: '20%',
      textAlign: "justify" ,
    },
    itemImage: {
      width: '100%',
      height: '40%',
      resizeMode: 'stretch',
      alignSelf: 'center'
    },
    itemDescription: {
      fontWeight: '100',
      fontSize: 12,
      color: '#fff',
      height: '30%',
    },
    more: {
      fontSize: 12,
      color: '#000',
      alignSelf: "flex-end",
    },
  });

  export default TopNews;