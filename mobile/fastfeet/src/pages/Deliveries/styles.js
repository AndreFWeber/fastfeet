import styled from 'styled-components/native';
import {BorderlessButton} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 5px 25px;
`;

export const PageHeader = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
`;

export const HeaderContent = styled.View`
    flex: 1;
`;

export const AvatarContainer = styled.View`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: left;
    border: none;
    color: rgb(150, 150, 150);
    padding: 10px;
`;

export const Avatar = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 40px;
    margin-right: 15px;
`;

export const NameAvatar = styled.View`
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    height: 65px;
    width: 65px;
    border-radius: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    background: ${(props) => `rgba(${props.r},${props.g}, ${props.b}, 0.2)`};
`;

export const NameAvatarText = styled.Text`
    font-size: 35px;
    color: ${(props) => `rgba(${props.r},${props.g}, ${props.b}, 1)`};
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

export const MenuOption = styled(BorderlessButton)``;
export const MenuOptionText = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${(props) =>
        props.active ? '#7159c1' : 'rgba(167, 167, 167, 0.6)'};
    text-decoration: ${(props) => (props.active ? 'underline' : 'none')};
`;
