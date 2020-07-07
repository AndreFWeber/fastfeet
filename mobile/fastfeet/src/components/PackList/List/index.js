/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PackagesRequest, PackagesClear } from '../../../store/modules/packs/actions';
import { PacksList, NoData, Container } from './styles';
import Pack from '../Pack';
import Skeleton from '../PackSkeleton'

function List({ navigation, delivered }) {
    const storedPacks = useSelector((state) => state.packs.deliveryPacks);
    const limit = useSelector((state) => state.packs.limit);
    const offset = useSelector((state) => state.packs.offset);
    const maxPages = useSelector((state) => state.packs.maxPages);

    const loading = useSelector((state) => state.packs.loading);
    const [packs, setPacks] = useState(1);
    const [infinitLoad, setInfinitLoad] = useState(false);
    const [beginScroll, setbeginScroll] = useState(true);
    const [skeleton, setSkeleton] = useState([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
    const deliveryPerson = useSelector((state) => state.auth.deliveryPerson);
    const dispatch = useDispatch();
    const listRef = useRef(null);

    useEffect(() => {
        dispatch(PackagesClear());
        dispatch(PackagesRequest(deliveryPerson.id, delivered === 'delivered', limit, 1));
        setPacks(0);
    }, [delivered]);


    useEffect(() => {
        if (infinitLoad) {

            setTimeout(() => {
                if (listRef.current != null) {
                    console.tron.log("TESTE ", storedPacks.length, packs);
                    setInfinitLoad(false);
                    listRef.current.scrollToIndex({ animated: false, index: (packs) > 0 ? packs : 1 });
                    setPacks(storedPacks.length);
                }
            }, 15);

        } else {
            setPacks(storedPacks.length);
        }
    }, [loading]);

    const loadMorePacks = () => {
        if (!beginScroll && maxPages > offset) {
            dispatch(PackagesRequest(deliveryPerson.id, delivered === 'delivered', limit, offset + 1));
            setbeginScroll(true);
            setInfinitLoad(true);
        }
    }

    return (
        <>
            {!storedPacks.length && !loading ? (
                <Container>
                    <NoData>Nenhuma entrega encontrada.</NoData>
                </Container>
            ) : (
                    <>
                        <PacksList
                            ref={listRef}
                            data={loading ? skeleton : storedPacks}
                            onEndReached={() => { loadMorePacks(); }}
                            onEndReachedThreshold={0.1}
                            getItemLayout={
                                (data, index) => (
                                    { length: 350, offset: 190 * index, index }
                                )
                            }
                            keyExtractor={(pack) => String(pack.id)}
                            onMomentumScrollBegin={() => { setbeginScroll(false); }}
                            renderItem={({ item: pack }) => (
                                loading ?
                                    <Skeleton /> :
                                    <Pack pack={pack} navigation={navigation} />
                            )}
                        />
                    </>
                )}
        </>
    );
}

export default List;
