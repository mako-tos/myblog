import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PostPage } from '../components'
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import IdentityModal, { useIdentityContext } from "react-netlify-identity-widget"
import "react-netlify-identity-widget/styles.css"

dayjs.locale('ja');

const DraftImpl = ({location}) => {
  const [data, setData] = useState(data)
  const [message, setMessage] = useState('now fetching data')
  useEffect(() => {
    const fetchDraft = async () => {
      const url = new URL('http://localhost:8000/' + location.search)
      const draftKey = url.searchParams.get('draftKey')
      const contentId = url.searchParams.get('contentId')
      if (!contentId) {
        setMessage('contentId is undefined')
      } else {
        try {
          const res = await fetch(`/.netlify/functions/draft?draftKey=${draftKey}&contentId=${contentId}`)
          const json = await res.json()
          json.createdAt = dayjs(json.createdAt).format('YYYY-MM-DD')
          json.updatedAt = dayjs(json.updatedAt).format('YYYY-MM-DD')
          setData(json)
        } catch (e) {
          setMessage(e.toString())
        }
      }
    }
    fetchDraft()
  }, [])

  const pageContext = {}

  return (
    <>
      {data ?
        (<PostPage data={data} pageContext={pageContext} location={location} />) :
        (<p>{message}</p>)
      }
    </>
  )
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
