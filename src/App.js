import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import  { connect } from 'react-redux'
import { actions } from './comics'

function App({ comics, loading, fetchAll, fetchSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [focusedComic, setFocusedComic] = useState(null);

  useEffect(() => {
      fetchAll()
  }, [])

  return (
    <div>
        {focusedComic ? <Modal focusedComic={focusedComic} setFocusedComic={setFocusedComic} /> : null}
        <div style={{ margin: '0 auto', width: '100%'}}>
        <div style={{ display: 'flex', width: '300px', alignItems: 'center', justifyContent: 'space-between'}}>
          <input value={searchValue} placeholder="Search for a movie" onChange={(e) => setSearchValue(e.target.value)}></input>
          <button onClick={() => {
            fetchSearch(searchValue)
            setSearchValue('')
          }}>SEARCH</button>
        </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            {loading ? 'Loading...' : comics.length ? comics.map((comic, i) => {
              return <div key={comic.id} onClick={() => setFocusedComic(comic)} style={{ border: '1px solid black', padding: 5, marginRight: 5, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} style={{ height: 300, width: 200 }} />
                  <div key={i}>{comic.title}</div>
                </div>
            }) : <p>No comics found!</p>}
          </div>
        </div>
      </div>
  );
}

const Modal = ({focusedComic, setFocusedComic}) => {
  console.log(focusedComic)
  return (
    <div style={{ position: 'fixed', zIndex: 1, left: 0, right: 0, top: 0, bottom: 0, backgroundColor: `rgb(0,0,0, 0.5)` }}>
          <div style={{ margin: '0 auto', width: '50%', backgroundColor: 'white'}}>
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={`${focusedComic.thumbnail.path}.${focusedComic.thumbnail.extension}`} style={{ height: 300, width: 200 }} />
              <div>{focusedComic.title}</div>
              <div>Issue Number: {focusedComic.issueNumber}</div>
              <div>creators: 
                {focusedComic.creators.items.map((person, i) => {
                  return <p key={i}>{person.role} - {person.name}</p>
                })}
              </div>
              <button style={{ position: 'absolute', top: 0, right: 0 }} onClick={() => setFocusedComic(null)}>CLOSE</button>
            </div>
          </div>
        </div>
  )
}

const mapStateToProps = (state) => {
  return {
    comics: state.comics.items,
    loading: state.comics.loading,
  }
}
const mapDispatchToProps = {
  fetchAll: actions.fetchAll,
  fetchSearch: actions.fetchSearch,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
