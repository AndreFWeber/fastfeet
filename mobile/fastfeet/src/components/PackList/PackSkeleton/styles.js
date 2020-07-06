import styled from 'styled-components/native';

export const PackContainer = styled.View.attrs({
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
})`
    background: #fff;
    margin: 0 0px 20px;
    border-width: 1px;
    border-radius: 4px;
    border-color: #ddd;
`;