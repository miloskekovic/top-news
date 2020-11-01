import * as React from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView  } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

const options = [
    { label: 'GB', value: 'gb' },
    { label: 'US', value: 'us' },
];

function OneNews({ navigation, route }) {
    console.log(route.params.openedNews.title)
    return (
        <ScrollView>
            <SwitchSelector style={styles.switchSelector} options={options} initial={route.params.selectedLanguage == 'gb' ? 0 : 1} disabled='true' buttonColor='#ff0000' backgroundColor='#ff4c4c' onPress={value => fetchDataLocal(value)} />
            <Text style={styles.itemTitle}>{route.params.openedNews.title}</Text>
            <Image style={styles.itemImage}
                source={{ uri: route.params.openedNews.urlToImage }}
            />
            <Text style={styles.itemContent}>{route.params.openedNews.content}</Text>
            <View style={styles.backToList}>
                <Button
                style={{flex: 1}}
                title='< Back to list'
                onPress={() => navigation.navigate('TopNews')}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    scrollView: {
      backgroundColor: '#2F9599',
      marginHorizontal: '5%',   
    },
    switchSelector: {
        marginTop: 10,
        marginBottom: 10,
        width: '50%',
        alignSelf: "center"
    },
    itemTitle: {
        flex: 1,
        width: '90%',
        color: '#000',
        fontSize: 20,
        alignSelf: 'center',
    },
    itemImage: {
        flex: 1,
        width: '90%',
        height: 200,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    itemContent: {
        flex: 1,
        width: '90%',
        fontSize: 15,
        color: '#000',
        alignSelf: 'center'
    },
    backToList: {
        flex: 1,
        width: '90%',
        backgroundColor: 'orange',
        marginTop: '5%',
        marginBottom: '5%',
        alignSelf: 'center'
    },
});

export default OneNews;