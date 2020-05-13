import styled from 'styled-components/native';
import Button from '../../../components/Button';

export const Background = styled.SafeAreaView`
    background-color: #fff;
    height: 100%;
`;

export const Container = styled.SafeAreaView`
    margin-top: ${(props) => `${props.marginTop}px`};
    padding: 20px;
    height: 100%;
`;

export const TopBackground = styled.View`
    background-color: #7159c1;
    position: absolute;
    height: 30%;
    width: 100%;
`;
export const ProblemTextBox = styled.TextInput.attrs({
    textAlignVertical: 'top', // Android only
})`
    background: #fff;
    padding: 10px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #ddd;

    height: 65%;
`;

export const SubmitButton = styled(Button)`
    margin-top: 25px;
    background: #7159c1;
`;
