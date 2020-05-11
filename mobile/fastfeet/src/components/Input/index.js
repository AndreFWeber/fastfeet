/* eslint-disable react/jsx-props-no-spreading */
import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, TInput} from './styles';

function Input({style, icon, ...rest}, ref) {
    return (
        <Container style={style}>
            {icon && <Icon name={icon} size={20} color="rgb(150, 150, 150)" />}
            <TInput {...rest} ref={ref} />
        </Container>
    );
}

export default forwardRef(Input);

Input.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    icon: PropTypes.string,
};

Input.defaultProps = {
    style: {},
    icon: null,
};
