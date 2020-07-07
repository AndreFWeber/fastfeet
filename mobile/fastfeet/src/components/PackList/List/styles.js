import styled from 'styled-components/native';

export const PacksList = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 15px;
`;

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    height: 50%;
`;
export const NoData = styled.Text``;
