import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler';

export const PackContainer = styled.View.attrs({
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
})`
    background: #fff;
    /* padding: 10px 20px; */
    margin: 0 0px 20px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #ddd;
`;

export const PackHeader = styled.View`
    flex-direction: row;
    padding: 10px 20px;
`;

export const PackTitle = styled.Text`
    color: #7159c1;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
`;

export const PackStatus = styled.View`
    flex-direction: row;
    padding: 0px 40px;
    padding-top: 20px;
    align-items: center;
`;

export const Ball = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 6px;
    border-color: #7159c1;
    border-width: 1.2px;
    background: ${(props) => (props.done ? '#7159c1' : 'transparent')};
`;

export const StatusLegend = styled.View`
    flex-direction: row;
    padding: 0 20px;
    padding-bottom: 20px;
    align-items: center;
    justify-content: space-between;
`;

export const Legend = styled.Text`
    font-size: 10px;
    color: rgb(167, 167, 167);
    max-width: 56px;
    text-align: center;
    flex: 1;
`;

export const Line = styled.View`
    flex: 1;
    height: 1px;
    background-color: #7159c1;
`;

export const PackInfo = styled.View`
    background-color: rgb(248, 249, 253);
    height: 70px;
    flex-direction: row;
    align-items: flex-end;
    padding: 20px;
`;

export const Info = styled.View`
    flex: 1;
`;

export const InfoHeader = styled.Text`
    font-size: 10px;
    color: rgb(167, 167, 167);
`;
export const InfoValue = styled.Text`
    font-size: 12px;
    color: rgb(101, 101, 101);
    font-weight: bold;
`;
export const DetailText = styled.Text`
    font-size: 12px;
    color: #7159c1;
    font-weight: bold;
`;

export const InfoDetails = styled(BorderlessButton)``;
