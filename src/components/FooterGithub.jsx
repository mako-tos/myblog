import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { graphql, useStaticQuery } from 'gatsby';

const Wrapper = styled.div`
`;

const ReposWrapper = styled.ul`
  list-style: none;
  text-align: left;
  &&::before {
    content: 'レポジトリ―：';    
  }
  li {
    margin-left: 1em;
  }
`;

const FooterGithub = ({ user }) => {
  const data = useStaticQuery(query)
  const repos = data.allGithubRepos.edges.map(edge => edge.node);
  return (
    <Wrapper>
      <div>
        <FontAwesomeIcon icon={faGithub} width="16" height="16" />
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://github.com/${user}`}
          itemProp="url"
        >
          {user}
        </a>
      </div>
      <ReposWrapper>
        {repos.map(repo => (
          <li key={repo.url}>
            <FontAwesomeIcon icon={faFileAlt} width="16" height="16" />
            <a href={repo.html_url} title={repo.full_name} target="_blank" rel="noreferrer" itemProp="url">
              <span>{repo.full_name}</span>
            </a>
          </li>
        ))}
      </ReposWrapper>
    </Wrapper>
  );
};
export default FooterGithub;

export const query = graphql`
  query {
    allGithubRepos {
      edges {
        node {
          full_name
          html_url
        }
      }
    }
  }
`;
