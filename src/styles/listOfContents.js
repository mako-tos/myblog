import { css } from '@emotion/core';
import theme from '../../config/theme';

const listOfContents = css`
.displayIfPc, .displayIfSp {
  display: none;

  ol.listOfContents {
    margin: 0.5em;
    padding: 1em;
    border-radius: 1em;
    background-color: #f0f0f0;
    list-style-type: none;

    li:first-of-type::before {
      content: 'コンテンツ:';
      display: block;
      margin-bottom: 0.5em;
      border-bottom: 0.5px black solid;
    }
    li {
      a {
        text-decoration: none;
      }
    }

    li.listOfContents--level1 {
      margin-left: 0em;
    }
    li.listOfContents--level2 {
      margin-left: 1em;
    }
    li.listOfContents--level3 {
      margin-left: 2em;
    }
    li.listOfContents--level4 {
      margin-left: 3em;
    }
  }  
}
@media (min-width: ${theme.breakpoints.m}) {
  .displayIfPc {
    display: block;
  }
}
@media (max-width: ${theme.breakpoints.m}) {
  .displayIfSp {
    display: block;
  }
}
`

export default listOfContents;
