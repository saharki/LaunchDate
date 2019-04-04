import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import axios from 'axios'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10%;
`;

const RestarauntOptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-color: red;
    align-items: center;
`;

const Actions = styled.div`
    width: 100%;
    justify-content: space-evenly;
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
                setCurrentRestaraunts(result.data);
            });
    }, []);

    return (
        <Container>
            {
                currentRestaraunts.length > 0 ?
                    (
                        <div>
                            <RestarauntOption restaraunt={currentRestaraunts[0]} />
                            <Actions>
                                <ThumbUp onClick={() => {
                                    const chosenRestaraunt = currentRestaraunts[0];
                                    props.setChosenRestaraunt(chosenRestaraunt);
                                }} />
                                <ThumbDown onClick={() => {
                                    setCurrentRestaraunts(currentRestaraunts.slice(1, currentRestaraunts.length - 1));
                                }} />
                            </Actions>
                        </div>
                    ) :
                    <div>Sorry, no restaraunts to show!</div>
            }
        </Container>
    );
}

export default MatchFinder;