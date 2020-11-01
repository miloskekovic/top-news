import * as React from 'react';
import { Text, View, TextInput } from 'react-native';

const Search = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        //value={value}
      />
      </View>
    );
  }

  export default Search;