import React, { FC } from 'react';
import { SafeAreaView, StyleSheet, View } from "react-native";
import Buttons from "../Components/Buttons";
import { AnswerObject } from '@/Views/Quizz';

interface Answers {
    useranswer: AnswerObject | undefined;
    answers: string[];
    setcorrectanswer: any;
    checkanswer: () => void;
}

const Answers: FC<Answers> = (props) => {
    return (
      <SafeAreaView>
          <View style={styles.viewStyle}>
              {props.answers.map((answer, key) => {
                  return (
                      <View key={answer}>
                          <Buttons
                              {...{key, answer}}
                              correct={props.useranswer?.correctanswer === answer}
                              disabled={props.useranswer ? true : false}
                              onPress={() => {
                                  (props.setcorrectanswer.current = answer),
                                      props.checkanswer();
                              }}
                          />
                      </View>
                  );
              })}
          </View>
      </SafeAreaView>
    );
};

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
    viewStyle: {
        marginTop: 10,
        paddingHorizontal: 20
    }
});

export default Answers;