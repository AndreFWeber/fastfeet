/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import {PacksList} from './styles';
import Pack from '../Pack';

function List({packs, navigation}) {
    return (
        <PacksList
            data={packs}
            keyExtractor={(pack) => String(pack.id)}
            renderItem={({item: pack}) => (
                <Pack pack={pack} navigation={navigation} />
            )}
        />
    );
}

export default List;

List.propTypes = {
    packs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
