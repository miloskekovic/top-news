import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const mainPartOfURL = 'https://newsapi.org/v2/top-headlines?'
export const apiKey = 'fc436c186efa4228a7d7a6e3a4dc4072';

export const availableCountries = [
  { label: 'GB', value: 'gb' },
  { label: 'US', value: 'us' },
];

export function fontSizer(windowWidth) {
  if (screenWidth > 400) {
    return 18;
  } else if (screenWidth > 250) {
    return 14;
  } else {
    return 12;
  }
}

export function articleHeight(windowHeight) {
  if (screenWidth > 400) {
    return 18;
  } else if (screenWidth > 250) {
    return 14;
  } else {
    return 12;
  }
}

