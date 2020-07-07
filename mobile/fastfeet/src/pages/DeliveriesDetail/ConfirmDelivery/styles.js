import styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';
import Button from '../../../components/Button';

export const Background = styled.SafeAreaView`
    background-color: #fff;
    height: 100%;
    width: 100%;
`;

export const Container = styled.SafeAreaView`
    margin-top: ${(props) => `${props.marginTop}px`};
    justify-content: center;
`;

export const CamContainer = styled.View`
    position: relative;
    align-items: center;
    height: 97%;
`;

export const TopBackground = styled.View`
    background-color: #7159c1;
    position: absolute;
    height: 30%;
    width: 100%;
`;

export const Camera = styled(RNCamera)`
    height: 100%;
    width: 90%;
`;

export const CamButtom = styled.View`
    bottom: 5px;
    position: absolute;
    width: 100%;
    align-items: center;
`;

export const PicButtom = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: rgba(0, 0, 0, 0.1);
    border-width: 2.5px;
    border-color: rgba(0, 0, 0, 0.25);
    justify-content: center;
    align-items: center;
`;

export const FlashButtom = styled.View`
    top: 5px;
    position: absolute;
    width: 100%;
    align-items: flex-end;
`;

export const AuxButtom = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 40px;
    background-color: rgba(0, 0, 0, 0.1);
    border-width: 2.5px;
    border-color: rgba(0, 0, 0, 0.25);
    justify-content: center;
    align-items: center;
`;

export const PreviewImg = styled.Image.attrs({
    resizeMode: 'contain',
})`
    height: 98%;
    width: 90%;
    align-self: center;
`;

export const PreviewButtons = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
    position: absolute;
    bottom: 10px;
`;

export const PreviewContainer = styled.View`
    position: relative;
`;

export const PreviewButtom = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: ${(props) =>
        props.accept ? 'rgb(3, 202, 3)' : 'rgb(202, 3, 3)'};
    justify-content: center;
    align-items: center;
`;
