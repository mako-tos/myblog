import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PostPage } from '../components'
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

dayjs.locale('ja');

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
      res.createdAt = dayjs(res.createdAt).format('YYYY-MM-DD')
      res.updatedAt = dayjs(res.updatedAt).format('YYYY-MM-DD')
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
      <PostPage data={this.state.data} pageContext={pageContext} location={this.props.location} />
    );
  }
}

const Draft = ({location}) => {
  const identity = useIdentityContext()
  const [dialog, setDialog] = React.useState(false)
  if (identity && identity.isLoggedIn) {
    return <DraftImpl location={location} />
  }
  return (
    <>
      <nav style={{ background: "green" }}>
        {" "}
        Login Status:
        <button className="btn" onClick={() => setDialog(true)}>
          LOG IN
        </button>
      </nav>
      <IdentityModal aria-labelledby={"dialog"} showDialog={dialog} onCloseDialog={() => setDialog(false)} />
    </>
  )
}

export default Draft;

Draft.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }).isRequired,
  location: PropTypes.object,
};
