import React, { useMemo } from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {
    PackContainer,
} from './styles';

const PackSkeleton = () => {
    return (
        <PackContainer>
            <SkeletonPlaceholder>
                <View
                    style={{
                        width: '50%',
                        height: 40,
                        margin: 10,
                        borderRadius: 4,
                    }}
                />
                <View
                    style={{
                        width: '95%',
                        marginLeft: '2.5%',
                        height: 20,
                        marginTop: 20,
                        marginBottom: 20,
                        borderRadius: 4,
                    }}
                />
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: 'rgb(248, 249, 253)',
                        height: 70,
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: '100%',
                    }}>
                    <View
                        style={{
                            marginTop: 6,
                            width: 80,
                            height: 45,
                            borderRadius: 4,
                        }}
                    />
                    <View
                        style={{
                            marginTop: 6,
                            width: 80,
                            height: 45,
                            borderRadius: 4,
                        }}
                    />
                    <View
                        style={{
                            marginTop: 6,
                            width: 80,
                            height: 45,
                            borderRadius: 4,
                        }}
                    />
                </View>
            </SkeletonPlaceholder>
        </PackContainer>
    );
};

export default PackSkeleton;
