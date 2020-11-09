import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, Button, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SwitchSelector from 'react-native-switch-selector';
import { useNavigation } from '@react-navigation/native';
import * as parameters from '../utils/parameters'
import { Article, ArticleTitle, ArticleImage, ArticleDescription, ArticleButton, ArticleButtonText } from '../utils/components';

const url = parameters.mainPartOfURL
const apiKey = parameters.apiKey

const categories = ['entertainment', 'general', 'health', 'science', 'sports', 'technology']
let countries = ['gb', 'us']

const screenWidth = Dimensions.get('window').width;

async function fetchFunction (categoryUrl)  {
  try {
    let response = await fetch(categoryUrl)
    let data = await response.json(); 
    let newArray = [];
    data.articles.map(article => {
      newArray.push({
        'title': article.title,
        'urlToImage': article.urlToImage,
        'description': article.description == null ? '' : article.description,
        'content': article.content == null ? '' : article.content,
      });
    });
    return newArray;
  } catch (error) {
      console.error(error) // from creation or business logic
  }
}

const Categories = () => {
  const [selectedCountry, setSelectedCountry] = useState('gb');
  const [newsByCountries, setNewsByCountries] = useState({});
  //const [categoryIndex, setEntertainmentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [carousel1, setCarousel1] = useState();
  const [carouselVisibilities, setCarouselVisibilities] = useState({
		'entertainment': false,
		'general': false,
		'health': false,
		'science': false,
		'sports': false,
		'technology': false,
  });
  const navigation = useNavigation();
  
  async function fetchDataFromURL ()  {
    let mainPartOfURL = url.substring(0, url.indexOf('?') + 1)
    var allArticles = {};
    for(let country of countries){
      allArticles[country] = {}
      for(let category of categories){
        allArticles[country][category] = [];
        let categoryUrl = mainPartOfURL + 'country=' + country + '&category=' + category + '&apiKey=' + apiKey;
        let result = await fetchFunction(categoryUrl);
        allArticles[country][category].push(result);  
      }
    } 
    setNewsByCountries(allArticles)
    setLoading(false)
  }

  function showCarouselForCategory(category){ 
    if (carouselVisibilities[category] == true) {
      return (
        <Carousel
            //ref={(c) => setCarousel1(c)}
            data={newsByCountries[selectedCountry][category][0]}
            renderItem={_renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.33}
            containerCustomStyle={styles.carouselContainer}
            inactiveSlideShift={0}
            //onSnapToItem={(index) => setEntertainmentIndex({ index })}
            useScrollView={true}  
          />
      );
    } else {
        return null;
    }
  }

  function _renderItem({ item, index }) {
    //console.log(newsByCountries[selectedCountry]['entertainment'])
    return (
      <View style={[styles.itemContainer, { backgroundColor: '#547980' }]}>
        <Article>
            <ArticleTitle>{item.title}</ArticleTitle>
            <ArticleImage source={{uri: item.urlToImage}} />
            <ArticleDescription>{item.description}</ArticleDescription>
            <ArticleButton onPress={() => navigation.navigate('OneNews', {selectedCountry: selectedCountry, openedNews: item})}>
              <ArticleButtonText>{'More >>'}</ArticleButtonText>
            </ArticleButton>
          </Article>
      </View>
    );
  }

  function onCategoryClick(category) {
    let modifiedVisibilities = carouselVisibilities;
    if(carouselVisibilities[category] === false){
      modifiedVisibilities[category] = true
      setCarousel1('abcde'+true)
    }else{
      modifiedVisibilities[category] = false
      setCarousel1('abcde'+false)
    }
    setCarouselVisibilities(modifiedVisibilities)
  }

  useEffect(() => {
    console.log('--------------------- Effect triggered ----------------------')
    fetchDataFromURL();
  }, [])

  if (loading) {
    return(      
      <View style={styles.container}>
        <Image
          style={{width: screenWidth/3, height: screenWidth/3,}}
          source={{uri: 'https://i.gifer.com/YCZH.gif'}} />
      </View>
    ) 
  }else{ 
    return (
      //<View style={{ flex: 1, padding: '5%' }}>
        <ScrollView style={{ padding: '5%' }}>
          <SwitchSelector style={styles.switchSelector} options={parameters.availableCountries} initial={0} buttonColor='#45ADA8' onPress={value => setSelectedCountry(value)} />
          <Text style={{fontSize: 16}}>{'\u2022'} Top 5 news by categories from {selectedCountry == 'us' ? 'US' : 'GB'}</Text>
          <TouchableOpacity style={styles.button} onPress={ () => onCategoryClick(categories[0]) }>
            <Text style={styles.underline}>{'\u2022'} Entertainment</Text>
          </TouchableOpacity>
          {showCarouselForCategory(categories[0])}
          <TouchableOpacity style={styles.button} onPress={ () => onCategoryClick(categories[1]) }>
            <Text style={styles.underline}>{'\u2022'} General</Text>
          </TouchableOpacity>
          {showCarouselForCategory(categories[1])}
          <TouchableOpacity style={styles.button} onPress={ () => onCategoryClick(categories[2]) }>
            <Text style={styles.underline}>{'\u2022'} Health</Text>
          </TouchableOpacity>
          {showCarouselForCategory(categories[2])}
          <TouchableOpacity style={styles.button} onPress={ () => onCategoryClick(categories[3]) }>
            <Text style={styles.underline}>{'\u2022'} Science</Text>
          </TouchableOpacity>
          {showCarouselForCategory(categories[3])}
          <TouchableOpacity style={styles.button} onPress={ () => onCategoryClick(categories[4]) }>
            <Text style={styles.underline}>{'\u2022'} Sport</Text>
          </TouchableOpacity>
          {showCarouselForCategory(categories[4])}
          <TouchableOpacity style={styles.button} onPress={ () => onCategoryClick(categories[5]) }>
            <Text style={styles.underline}>{'\u2022'} Technology</Text>
          </TouchableOpacity>
          {showCarouselForCategory(categories[5])}
        </ScrollView>
    );

  }
}

const styles = StyleSheet.create({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { fontSize:16, textDecorationLine: 'underline' },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  switchSelector: {
      marginBottom: 10,
      width: '50%',
      alignSelf: "center"
  },
  carouselContainer: {
    marginTop: '5%',
    marginBottom: '5%'
  },
});

export default Categories;