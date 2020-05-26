/* eslint-disable react/jsx-props-no-spreading */
import React, {useState} from 'react';
// import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {PacksList} from './styles';

import Pack from '../Pack';

function List({navigation}) {
    const packs = useSelector((state) => state.packs.deliveryPacks);
    const loading = useSelector((state) => state.packs.loading);
    const [skeleton, setSkeleton] = useState([{id: 0}]);

    return (
        <PacksList
            data={loading ? skeleton : packs}
            keyExtractor={(pack) => String(pack.id)}
            renderItem={({item: pack}) => (
                <Pack pack={pack} navigation={navigation} />
            )}
        />
    );
}

export default List;

// List.propTypes = {
//     packs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
// };
