import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 25px;
`;

export const PageHeader = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
`;

export const HeaderContent = styled.View`
    flex: 1;
`;

export const Avatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 40px;
    margin-right: 15px;
`;

export const Welcome = styled.Text`
    font-size: 15px;
    color: rgb(167, 167, 167);
`;
export const Name = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: rgb(101, 101, 101);
`;
export const ExitButton = styled.TouchableOpacity``;

export const PageMenu = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const MenuOptions = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 160px;
`;

export const MenuTitle = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: rgb(101, 101, 101);
`;

export const MenuOptionText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${(props) =>
        props.active ? '#7159c1' : 'rgba(167, 167, 167, 0.6)'};
    text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
`;

export const MenuOption = styled(BorderlessButton)``;

export const PacksList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 45px;
`;

export const Pack = styled.View.attrs({
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
})`
    background: #fff;
    padding: 10px 20px;
    margin: 0 0px 20px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #ddd;
`;

export const PackHeader = styled.View`
    flex-direction: row;
`;

export const PackTitle = styled.Text`
    color: #7159c1;
    font-size: 15px;
    font-weight: bold;
    margin-left: 10px;
`;

export const PackStatus = styled.View`
    flex-direction: row;
    padding: 15px 20px;
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
export const Line = styled.View`
    flex: 1;
    height: 1px;
    background-color: #7159c1;
`;

export const PackInfo = styled.View``;
