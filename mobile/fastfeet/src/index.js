import React from 'react';
import { SafeAreaView, ScrollView, Text, StatusBar } from 'react-native';
import './config/ReactotronConfig';

const App: () => React$Node = () => {
    console.tron.log('fastfeet');
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView contentInsetAdjustmentBehavior="automatic">
                    <Text>Fastfeet</Text>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default App;
