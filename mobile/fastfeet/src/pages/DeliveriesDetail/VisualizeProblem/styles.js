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
export const ProblemContainer = styled.View.attrs({
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
})`
    background: #fff;
    margin: 0 0px 10px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #ddd;
    padding: 10px;
`;

export const Description = styled.Text`
    font-size: 14px;
    color: rgb(101, 101, 101);
`;

export const Date = styled.Text`
    align-self: flex-end;
    padding-top: 5px;
    font-size: 14px;
    color: rgba(101, 101, 101, 0.4);
`;
