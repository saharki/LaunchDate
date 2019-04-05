import React from 'react';
import styled from 'styled-components';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';

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
    return (
        <Container>
            <RestarauntOption restaraunt={props.restaraunt} />
            <Actions>
                <ThumbUp onClick={() => {
                    props.setChosenRestaraunt(props.restaraunt);
                }} />
                <ThumbDown onClick={() => {
                    props.removeRestaraunt(props.restaraunt);
                }} />
            </Actions>
        </Container >
    );
}

export default MatchFinder;