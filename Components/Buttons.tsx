import React, { FC, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface Title {
    key: number;
    answer: string;
    onPress: () => void;
    correct: boolean;
    disabled: boolean;
}

const Buttons : FC<Title> = (props) =>{
    useEffect(() => {

    }, []);
    return(
        <SafeAreaView>
            <TouchableOpacity
              onPress={() => props.onPress()}
              style={[
                  styles.button,
                  {backgroundColor: !props.disabled ? '#F5F5DC': '#F5DEB3'}
              ]}
            >
                <Text style={[
                    styles.textStyle,
                    {color: props.correct ? 'brown' : 'black'}
                ]}>
                    {props.answer}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textStyle : {
        textAlign: 'left',
        fontSize: 17,
        marginLeft: 8
    },
    button: {
        width: '80%',
        elevation: 5,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 27,
        height: 38,
        marginTop: 10
    }
})

export default Buttons;
