import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.SafeAreaView`
    flex: 1;
    padding: 20px;
    justify-content: center;
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
    height: 180px;
    width: 180px;
    border-radius: 90px;
    margin-right: 15px;
`;

export const NameAvatar = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    height: 180px;
    width: 180px;
    border-radius: 90px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    background: ${(props) => `rgba(${props.r},${props.g}, ${props.b}, 0.2)`};
`;

export const NameAvatarText = styled.Text`
    font-size: 75px;
    color: ${(props) => `rgba(${props.r},${props.g}, ${props.b}, 1)`};
`;
export const DeliveryPerson = styled.View`
    padding: 15px;
`;
export const Info = styled.Text`
    font-size: 15px;
    color: rgb(167, 167, 167);
`;
export const Value = styled.Text`
    font-size: 25px;
    color: rgb(101, 101, 101);
    font-weight: bold;
    padding-bottom: 25px;
`;

export const LogoutButton = styled(Button)`
    margin: 0 15px;
    background: rgb(231, 64, 64);
`;
