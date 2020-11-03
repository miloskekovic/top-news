import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const color1 = '#594F4F';
const color2 = '#547980';
const color3 = '#45ADA8';
const color4 = '#9DE0AD';

export const mainPartOfURL = 'https://newsapi.org/v2/top-headlines?'
export const apiKey = '368ff13b1a4445e7a86205f4b0538391';

export const availableCountries = [
    { label: 'GB', value: 'gb' },
    { label: 'US', value: 'us' },
  ];

  export function fontSizer (screenWidth) {
    if(screenWidth > 400){
      return 18;
    }else if(screenWidth > 250){
      return 14;
    }else { 
      return 12;
    }
  }

export const styles = StyleSheet.create({
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
      padding: '3%',
      height: windowHeight/2,
    },
    itemTitle: {
        backgroundColor: color2,
        color: color4,
        fontSize: 12,
        height: '20%',
        justifyContent: "center" ,
    },
    itemImage: {
      width: '100%',
      height: '40%',
      resizeMode: 'stretch',
      alignSelf: 'center',
      marginTop: '2.5%',
      marginBottom: '2.5%',
    },
    itemDescription: {
        backgroundColor: color2,
        color: color4,
        fontSize: 32,
        height: '20%',
    },
    buttonMore: {
        height: '10%',
        fontSize: 12,
        color: '#000',
        alignSelf: "flex-end",
        marginTop: '2.5%%',
        marginBottom: '2.5%%',
    },
  });