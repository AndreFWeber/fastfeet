import React from 'react';
import { ToastContainer } from 'react-native-root-toast';

const Toaster = (
    {message,
    visible,
    backgroundColor="red",
    onHidden}
    ) => {
    return (
        <ToastContainer
            visible={visible}
            backgroundColor={backgroundColor}
            opacity={1}
            shadow
            animation
            hideOnPress={true}
            delay={0}
            onHidden={onHidden}>
            {message}
        </ToastContainer>
    );
};

export default Toaster;
