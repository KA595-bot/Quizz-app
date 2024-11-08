import React, { FC } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";

interface Question {
    QuestionNo: number;
    Question: string;
}

const Questions: FC<Question> = (props) => {
    return (
      <SafeAreaView>
          <View style={styles.questionContainer}>
              <Text style={styles.textStyle}>
                  {props.QuestionNo}
              </Text>
              <Text style={styles.QuestionStyle}>
                  {props.Question}
              </Text>
          </View>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    questionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        paddingRight: 16
    },
    textStyle: {
        padding: 15,
        fontSize: 15,
        color: 'blue'
    },
    QuestionStyle: {
        fontSize: 15,
        color: 'black',
        textAlign: 'left',
        marginRight: 7
    }
});

export default Questions