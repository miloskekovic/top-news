import * as React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, Dimensions } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import { useNavigation } from '@react-navigation/native';
import * as parameters from '../utils/parameters'
import { OpenedArticle, OpenedArticleTitle, OpenedArticlePublishedAt, OpenedArticleImage, OpenedArticleContent, OpenedArticleButton, OpenedArticleButtonText } from '../utils/components';

const screenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(screenWidth * 0.7);
const screenHeight = Dimensions.get('window').height;
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);



function OneNews({ navigation, route }) {
    const dateToStr = (date) => {
        var d = new Date(date);
        return d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear() + " " +
        d.getHours() + ":" + d.getMinutes();
    };
    return (
        <View style={{flex: 1}}>
            <SwitchSelector style={{width: '33%', alignSelf: "center", marginTop: '5%'}} options={parameters.availableCountries} initial={0} disabled={true} buttonColor='#45ADA8' onPress={ (value) => {console.log(value); setCountry(value), fetchDataFromURL(value)}} />
            <OpenedArticle>
                <OpenedArticleTitle>{route.params.openedNews.title}</OpenedArticleTitle>
                <OpenedArticlePublishedAt>{dateToStr(route.params.openedNews.publishedAt)}</OpenedArticlePublishedAt>
                <OpenedArticleImage source={{uri: route.params.openedNews.urlToImage}} />
                <OpenedArticleContent>{route.params.openedNews.content}</OpenedArticleContent>
                <OpenedArticleButton onPress={() => navigation.navigate('Top News')}>
                <OpenedArticleButtonText>{'<< Back to list'}</OpenedArticleButtonText>
                </OpenedArticleButton>
            </OpenedArticle>
        </View>
    )
}

const styles = StyleSheet.create({
    switchSelector: {
        marginTop: 10,
        marginBottom: 10,
        width: screenWidth * 0.5,
        alignSelf: "center"
    },
    itemTitle: {
        flex: 1,
        width: screenWidth * 0.9,
        color: '#000',
        fontSize: parameters.fontSizer(screenWidth) * 3,
        alignSelf: 'center',
    },
    itemImage: {
        flex: 1,
        width: screenWidth * 0.9,
        height: screenHeight/3,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    itemContent: {
        flex: 1,
        width: screenWidth * 0.9,
        fontSize: 15,
        color: '#000',
        alignSelf: 'center'
    },
    backToList: {
        flex: 1,
        width: screenWidth * 0.9,
        backgroundColor: 'orange',
        marginTop: 15,
        marginBottom: 15,
        alignSelf: 'center'
    },
});

export default OneNews;