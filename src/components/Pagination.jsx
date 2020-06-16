import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  width: 100%;
  margin: 1rem auto 2.5rem;
  max-width: ${props => props.theme.breakpoints.m};
  padding: 0 1.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
`;

const Button = styled(Link)`
  background: ${props => props.theme.colors.primary.base};
  color: white;
  padding: 1rem;
  border-radius: 2px;
  margin: 0 0 0 0.5rem;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s all;
  &:hover {
    background: ${props => props.theme.colors.primary.light};
  }
  @media (hover: none) {
    background: ${props => props.theme.colors.primary.base} !important;
  }
`;

const Pagination = props => {
  return (
    <>
      {props.context.numberOfPages > 1 && (
        <Wrapper>
          <div>
            {props.context.previousPagePath && (
              <Button to={`${props.context.previousPagePath}`}>
                <span>&larr;</span> Prev
              </Button>
            )}
            {props.context.nextPagePath && (
              <Button style={{ order: 3 }} to={`${props.context.nextPagePath}`}>
                Next <span>&rarr;</span>
              </Button>
            )}
          </div>
        </Wrapper>
      )}
    </>
  );
};

export default Pagination;
