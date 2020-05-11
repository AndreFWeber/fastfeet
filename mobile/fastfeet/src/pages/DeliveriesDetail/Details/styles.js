import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    margin-top: ${(props) => `${props.marginTop}px`};
    padding: 20px;
`;

export const TopBackground = styled.View`
    background-color: #7159c1;
    position: absolute;
    height: 30%;
    width: 100%;
`;

export const InfoContainer = styled.View.attrs({
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
})`
    background: #fff;
    margin: 0 0px 20px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #ddd;
`;

export const TitleContainer = styled.View`
    flex-direction: row;
    padding: 10px;
`;
export const InfoTitle = styled.Text`
    color: #7159c1;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
`;

export const InfoHeader = styled.Text`
    padding: 0px 10px;
    font-size: 20px;
    color: rgb(167, 167, 167);
`;
export const InfoValue = styled.Text`
    padding: 0px 10px 15px 10px;
    font-size: 14px;
    color: rgb(101, 101, 101);
`;

export const Dates = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

export const Date = styled.View``;
