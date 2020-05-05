import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 0 15px;
    height: 46px;
    background: #fff;
    flex-direction: row;
    align-items: center;
`;

export const TInput = styled.TextInput.attrs({
    placeholderTextColor: 'rgb(150, 150, 150)',
})`
    flex: 1;
    font-size: 15px;
    margin-left: 10px;
    color: rgb(150, 150, 150);
`;
