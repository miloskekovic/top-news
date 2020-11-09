import React, {useState, useEffect} from 'react';
import { Text, View, TextInput, Dimensions, StyleSheet, Image, Button } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import SwitchSelector from 'react-native-switch-selector';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import * as parameters from '../utils/parameters'
import { Article, ArticleTitle, ArticleImage, ArticleDescription, ArticleButton, ArticleButtonText } from '../utils/components';

const screenWidth = Dimensions.get('window').width;


const mainPartOfURL = parameters.mainPartOfURL;
const apiKey = parameters.apiKey;

const Search = () => {
  const [selectedCountry, setSelectedCountry] = useState('gb');
  const [news, setNews] = useState({});
  const [term, setTerm] = useState('');
  const [newsByCountryAndCriteria, setNewsByCountryAndCriteria] = useState([]);
  const navigation = useNavigation();

  const searchByTerm = () => {
    let result = [];
    if(term != ''){
      news[selectedCountry].map(article => {
        let title = article.title;
        let urlToImage = article.urlToImage;
        let description = article.description;
        let content = article.content;
        if(title.includes(term) || (description != null && description.includes(term)) || (content != null && content.includes(term))){
          result.push({
            'title': title,
            'urlToImage': urlToImage,
            'description': description,
            'content': content,
          })
        }      
      })
    }
    setNewsByCountryAndCriteria(result);
  }

  const fetchDataFromURL = () => {
    const result = {};
    //console.log('WWWWWWWWWWWWWWWWWWWwwww',parameters.availableCountries.values[0])
    for(let abc of parameters.availableCountries){
      let ct = abc.value
      result[ct] = [];
      let secondPartOfUrl = 'country='.concat(ct).concat('&').concat('apiKey=').concat(apiKey);
      let newUrl = mainPartOfURL.concat(secondPartOfUrl)
      fetch(newUrl, {
            method: 'GET'
          })
          .then((response) => response.json())
          .then((responseJson) => responseJson.articles)
          .then((articles) => {
            articles.map(article => {
              result[ct].push({
                title: article.title,
                urlToImage: article.urlToImage,
                description: article.description,
                content: article.content,
              })
            })
          })
          .catch((error) => {
            console.error(error);
          });
    }
    setNews(result)
  }
    

  useEffect(() => {
    console.log('Effect triggered')
    fetchDataFromURL()
  }, [])

  useEffect(() => {
    console.log('Effect 2 and 3 triggered', 'Selected country: ', selectedCountry)
    searchByTerm();
  }, [selectedCountry, term])

  return (
    <View style={{ flex: 1, padding: '5%' }}>
      <SwitchSelector style={styles.switchSelector} options={parameters.availableCountries} initial={0} buttonColor='#45ADA8' onPress={ value => setSelectedCountry(value)} />
      <Text style={{fontSize: 16, marginTop: '2.5%'}}>{'\u2022'} Search top news from {selectedCountry.toUpperCase()} by term:</Text>
      <TextInput
        style={{ width: screenWidth * 0.8, height: 40, borderColor: 'black', alignSelf: "center", marginTop: '2.5%', borderWidth: 1, backgroundColor: 'lightgrey' }}
        placeholder="Search term..."
        onChangeText={text => setTerm(text)}
        //value={value}
      />
      <FlatGrid
        itemDimension={screenWidth * 0.33}
        data={newsByCountryAndCriteria}
        style={styles.gridView}
        // staticDimension={300}
        // fixed
        // spacing={20}
        renderItem={({ item, index }) => (
          <Article>
            <ArticleTitle>{item.title}</ArticleTitle>
            <ArticleImage source={{uri: item.urlToImage}} />
            <ArticleDescription>{item.description}</ArticleDescription>
            <ArticleButton onPress={() => navigation.navigate('OneNews', {selectedCountry: selectedCountry, openedNews: item})}>
              <ArticleButtonText>{'More >>'}</ArticleButtonText>
            </ArticleButton>
          </Article>
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
    fontWeight: '100',
  },
  itemImage: {
    width: '80%',
    height: '30%',
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  itemDescription: {
    fontWeight: '100',
    fontSize: 12,
    color: '#fff',
  },
  more: {
    fontWeight: '200',
    fontSize: 12,
    color: '#000',
    alignSelf: "flex-end"
  },
});

export default Search;