import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PostPage } from '../components'
import moment from 'moment'
import { useIdentityContext } from "react-netlify-identity-widget"

class DraftImpl extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null
    };
  }
  
  // 初期値の設定
  componentWillMount(){
    this.fetchResponse();
  }
  
  // リストの更新
  fetchResponse(){
    const url = new URL('http://localhost:8000/' + this.props.location.search)
    const draftKey = url.searchParams.get('draftKey')
    const contentId = url.searchParams.get('contentId')
    if (!draftKey || !contentId) {
      return
    }
    fetch(`/.netlify/functions/draft?draftKey=${draftKey}&contentId=${contentId}`)
    .then( res => res.json() )
    .then( res => {
      res.createdAt = moment(res.createdAt).format('YYYY-MM-DD')
      res.updatedAt = moment(res.updatedAt).format('YYYY-MM-DD')
      this.setState({
        data : res
      });
    })
  }
  
  render() {
    if (!this.state.data) {
      return (<p>waiting data loaded</p>)
    }
    const pageContext = {}
    return (
      <PostPage data={this.state.data} pageContext={pageContext} />
    );
  }
}

const Draft = () => {
  const identity = useIdentityContext()
  if (identity && identity.isLoggedIn) {
    return <DraftImpl />
  }
  return <div>
    identity failed
  </div>
}

export default Draft;

Draft.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }).isRequired,
};
