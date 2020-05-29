import React from 'react'
import { navigate, Link } from 'gatsby'
import styled from '@emotion/styled'

const SVG = styled.svg`
  padding: 0;
  width: 0.6rem;
`

const SelectIcon = props => {
  return (
    <SVG viewBox="0 0 292.362 292.362">
      <path
        d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424
  C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428
  s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"
      />
    </SVG>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: -1.5rem auto 2.5rem;
  max-width: ${props => props.theme.breakpoints.m};
  padding: 0 1.5rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: baseline;
`

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
`

const Numbers = styled.div`
  border: 1px solid ${props => props.theme.colors.black.blue};
  border-radius: 2px;
  display: inline-block;
  float: left;
  color: ${props => props.theme.colors.black.blue};
  padding: 1rem;
  background: white;
  position: relative;
  transition: 0.3s all;
  svg {
    fill: ${props => props.theme.colors.black.blue};
    margin: 0 0 0 0.25rem;
    transition: 0.3s all;
  }
  &:hover {
    background: ${props => props.theme.colors.black.light};
  }
  @media (hover: none) {
    background: white !important;
  }
`

const Select = styled.select`
  font-size: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  color: transparent;
  option {
    color: black;
  }
`

const Pagination = props => {
  function changePage(e) {
    navigate(
      e.target.value
        ? `${props.context.paginationPath}/${e.target.value}`
        : `${props.context.paginationPath}/`
    )
  }

  return (
    <>
      {props.context.numberOfPages > 1 && (
        <Wrapper>
          <Numbers>
            {props.context.humanPageNumber}{' '}
            <Select
              value={
                props.context.humanPageNumber === 1
                  ? ``
                  : props.context.humanPageNumber
              }
              onChange={changePage}
            >
              {Array.from({ length: props.context.numberOfPages }, (_, i) => (
                <option value={`${i === 0 ? `` : i + 1}`} key={`page${i + 1}`}>
                  {i + 1}
                </option>
              ))}
            </Select>
            / {props.context.numberOfPages} <SelectIcon />
          </Numbers>
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
  )
}

export default Pagination
