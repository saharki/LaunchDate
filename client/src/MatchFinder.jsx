import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10%;
`;

const RestarauntOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-color: red;
    align-items: center;
`;

const Actions = styled.div`
    width: 100px;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
`;

const Logo = styled.img`
    width:  100px;
`;

const RestarauntOption = (props) => {
    return <RestarauntOptionContainer>
        <div>{props.restaraunt.name}</div>
        <div>{props.restaraunt.description}</div>
        <Logo src={props.restaraunt.logo} />
    </RestarauntOptionContainer>
}

const MatchFinder = (props) => {
    const [currentRestaraunts, setCurrentRestaraunts] = useState([]);

    useEffect(() => {
        axios.get('https://515fdb63.ngrok.io/restaurants')
            .then((result) => {
                console.log(result.data);
                setCurrentRestaraunts(result.data);
            });
    }, []);


    return (
        <Container>
            {
                currentRestaraunts.length > 0 ?
                    <RestarauntOption restaraunt={currentRestaraunts[0]} /> :
                    <div>Sorry, no restaraunts to show!</div>
            }
            <Actions>
                <ThumbUp onClick={() => {
                    const chosenRestaraunt = currentRestaraunts[0];
                    props.setChoosenRestaraunt(chosenRestaraunt);
                }} />
                <ThumbDown onClick={() => {
                    setCurrentRestaraunts(currentRestaraunts.slice(1, currentRestaraunts.length - 1));
                }} />
            </Actions>
        </Container>
    );
}

export default MatchFinder;