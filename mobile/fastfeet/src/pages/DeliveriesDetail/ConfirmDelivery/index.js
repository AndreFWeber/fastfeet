import React, {useRef, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import FormData from 'react-native/Libraries/Network/FormData';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useHeaderHeight} from 'react-navigation-stack';
import {useDispatch, useSelector} from 'react-redux';
import {
    PackagesRequest,
    PackageDetailed,
} from '../../../store/modules/packs/actions';

import api from '../../../services/api';
import {
    Background,
    Container,
    TopBackground,
    CamContainer,
    Camera,
    CamButtom,
    PicButtom,
    FlashButtom,
    AuxButtom,
    PreviewImg,
    PreviewContainer,
    PreviewButtons,
    PreviewButtom,
} from './styles';

const ConfirmDelivery = ({navigation}) => {
    const headerHeight = useHeaderHeight();
    const pack = navigation.getParam('pack');
    const deliveryPerson = useSelector((state) => state.auth.deliveryPerson);
    const camRef = useRef(null);
    const dispatch = useDispatch();

    const [camFlashMode, setCamFlashMode] = useState('on');
    const [preview, setPreview] = useState(null);

    async function takePicture() {
        if (camRef.current) {
            const options = {
                quality: 0.5,
                base64: true,
            };
            const data = await camRef.current.takePictureAsync(options);

            console.tron.log(data);
            setPreview({uri: data.uri, base64: data.base64});
        }
    }

    function handleFlash() {
        if (camFlashMode === 'on') {
            setCamFlashMode('off');
        } else if (camFlashMode === 'off') {
            setCamFlashMode('auto');
        } else {
            setCamFlashMode('on');
        }
    }
    console.tron.log(pack);
    async function handleSend() {
        console.tron.log(preview.uri);
        const data = new FormData();
        const fileURL = preview.uri;
        const fileName = fileURL.split('/').pop();
        const ext = fileURL.split('.').pop();
        data.append('file', {
            type: `image/${ext}`,
            uri: fileURL,
            name: fileName,
        });
        try {
            const response = await api.post('files', data).catch((error) => {
                console.tron.log('@ConfirmDelivery/handleSend Error', error);
            });
            if (response.status === 200) {
                const confirmResponse = await api
                    .put('deliverypackage/deliveries', {
                        package_id: pack.id,
                        deliveryperson_id: deliveryPerson.id,
                        signature_id: response.data.id,
                        end_date: new Date().toISOString(),
                    })
                    .catch((error) => {
                        console.tron.log(
                            '@ConfirmDelivery/handleSend Error',
                            error
                        );
                    });
                if (confirmResponse.status === 200) {
                    dispatch(PackagesRequest(1, false));
                    dispatch(PackageDetailed(confirmResponse.data.updatedPack));
                    // navigation.navigate('Detail', {
                    //     pack: confirmResponse.data.updatedPack,
                    // });
                    navigation.goBack();
                }
            }
        } catch (error) {
            console.tron.log('@ConfirmDelivery/handleSend Error', error);
        }
    }

    return (
        <Background>
            <TopBackground />
            <Container marginTop={Math.ceil(headerHeight)}>
                {preview === null ? (
                    <CamContainer>
                        <Camera
                            ref={camRef}
                            type="back"
                            captureAudio={false}
                            flashMode={camFlashMode}
                            defaultVideoQuality={720}>
                            <FlashButtom>
                                <AuxButtom onPress={handleFlash}>
                                    <Icon
                                        name={`flash-${camFlashMode}`}
                                        size={15}
                                        color="#FFF"
                                    />
                                </AuxButtom>
                            </FlashButtom>
                            <CamButtom>
                                <PicButtom onPress={takePicture}>
                                    <Icon
                                        name="photo-camera"
                                        size={25}
                                        color="#FFF"
                                    />
                                </PicButtom>
                            </CamButtom>
                        </Camera>
                    </CamContainer>
                ) : (
                    <PreviewContainer>
                        <PreviewImg
                            source={{
                                uri: preview.uri,
                            }}
                        />
                        <PreviewButtons>
                            <PreviewButtom
                                onPress={() => {
                                    setPreview(null);
                                }}>
                                <Icon name="delete" size={25} color="#FFF" />
                            </PreviewButtom>
                            <PreviewButtom accept onPress={handleSend}>
                                <Icon name="thumb-up" size={25} color="#FFF" />
                            </PreviewButtom>
                        </PreviewButtons>
                    </PreviewContainer>
                )}
            </Container>
        </Background>
    );
};

ConfirmDelivery.navigationOptions = ({navigation}) => ({
    title: 'Confirmar entrega',
    headerTitleAlign: 'center',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}>
            <Icon name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>
    ),
});

export default ConfirmDelivery;
