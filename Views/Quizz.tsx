import React, { FC, useEffect, useState, useRef } from "react";
import {StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView, Touchable} from "react-native";

import { getquestiojns, Question } from "@/Hooks/api";
import Questions from "@/Components/Questions";
import Answers from "@/Components/Answers";
import Icon from 'react-native-vector-icons/AntDesign';

export type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctanswer: string
}

const Quizz: FC = (props) => {
    const [ loader, setLoader ] = useState(false);
    const [ question, setQuestion ] = useState<Question[]>([]);
    const [ useranswers, setUseranswers ] = useState<AnswerObject[]>([]);
    const [ score, setScore ] = useState(0);
    const [ number, setNumber ] = useState(0);
    const [ totalQuestion ] = useState(10);
    const [ gameover, setGameover ] = useState(true);
    const setcorrectanswer = useRef(null);
    const [ correcta, setcorrecta ] = useState('');

    useEffect(() => {
        startQuizz();
    }, []);

    const startQuizz = async () => {
        setNumber(0);
        setLoader(true);
        setGameover(false);
        const newquestions = await getquestiojns();
        console.log(newquestions);
        setQuestion(newquestions);
        setScore(0);
        setUseranswers([]);
        setLoader(false);
    };


    // function to manage next question
    const nextQuestion = () => {
        const nextq = number + 1;
        if ( nextq == totalQuestion ) {
            setGameover(true);
        } else {
            setNumber(nextq)
        }
    }

    // function to check the correct answer
    const checkanswer = () => {
        if (!gameover) {
            const answer = setcorrectanswer.current;

            const correcta = question[number].correct_answer === answer;

            if (correcta) setScore(prev => prev + 1);

            const answerobject = {
                question: question[number].question,
                answer,
                correcta,
                correctanswer: question[number].correct_answer,
            };

            // @ts-ignore
            setUseranswers(prev => [...prev, answerobject]);
            setTimeout(() => {
                nextQuestion();
            }, 1000);
        }
    };

    return (
        <View style={{flex: 1}}>
            {!loader ? (
                <View>
                    <View style={styles.container}>
                        <Text style={styles.textStyle}>Questions</Text>
                        <Text style={styles.textStyle}>
                            {number + 1}/{totalQuestion}
                        </Text>
                    </View>
                    <View style={{marginLeft: 20}}>
                        <Text style={styles.textStyle}>Score : {score}</Text>
                    </View>
                    {question.length > 0 ? (
                        <>
                            <Questions
                                QuestionNo={number + 1}
                                Question={question[number].question}
                            />
                            <Answers
                                answers={question[number].answers}
                                {...{setcorrectanswer, checkanswer}}
                                useranswer={useranswers ? useranswers[number] : undefined}
                            />
                        </>
                    ) : null}
                </View>
            ) : (
                <ActivityIndicator
                    style={{justifyContent: 'center', top: 200}}
                    size={50}
                    color="black"
                />
            )}

            <View>
                {!gameover && !loader && number != totalQuestion - 1 ? (
                    <TouchableOpacity onPress={() => nextQuestion()}>
                        <Icon
                            name="arrowright"
                            size={40}
                            color="black"
                            style={{left: 130, margin: 20}}
                        />
                    </TouchableOpacity>
                ) : number == totalQuestion - 1 ? (
                    <TouchableOpacity onPress={() => startQuizz()}>
                        <Icon
                            name="controller-play"
                            size={40}
                            color="black"
                            style={{left: 130, margin: 20}}
                        />
                    </TouchableOpacity>
                ) : null}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 70,
        backgroundColor: 'white'
    },
    textStyle: {
        padding: 15,
        fontSize: 15,
        color: 'blue'
    },
    bottomView : {
        padding: 13,
        backgroundColor: 'blue',
        borderRadius: 300,
        width: 70,
        height: 70,
        position: 'absolute',
        right: 20,
        top: 550
    },
    questioncontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 10,
        paddingRight: 16,
    },
    iconstyle: {
        backgroundColor: 'blue',
        borderRadius: 50,
        width: 70,
        height: 70,
        top: 100,
        left: 260
    }
})

export default Quizz;