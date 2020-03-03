import React from 'react';

import { Layout } from './components';
import PlayList from './components/PlayList';
import Player from './components/Player';
import { requestAudios, deleteRecord } from './utils/db';

const initialState = {
  currentTrack: {
    id: '',
    filename: '',
    record: null
  },
  tracks: [],
  loading: true
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'REMOVE_TRACK':
      return {
        ...state,
        tracks: state.tracks.reduce((prev: any, next: any) => {
          if (action.payload !== next.id) {
            prev.push(next);
          }
          return prev;
        }, [])
      };
    case 'LOADING':
      return { ...state, loading: action.payload };
    case 'LOAD_TRACKS':
      return { ...state, tracks: action.payload };
    case 'ADD_TRACK':
      return { ...state, tracks: [action.payload].concat(state.tracks) };
    case 'CURRENT_TRACK':
      return { ...state, currentTrack: action.payload };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const getAudios = async () => {
    dispatch({ type: 'LOADING', payload: true });
    const records = await requestAudios();
    dispatch({ type: 'CURRENT_TRACK', payload: records[0] });
    dispatch({ type: 'LOAD_TRACKS', payload: records });
    dispatch({ type: 'LOADING', payload: false });
  };

  React.useEffect(() => {
    getAudios();
  }, []);

  const setTrack = (track: any) => {
    dispatch({ type: 'CURRENT_TRACK', payload: track });
  };

  const addTrack = (track: any) => {
    dispatch({ type: 'ADD_TRACK', payload: track });
  };

  const removeTrack = (id: string) => {
    deleteRecord(id);
    dispatch({ type: 'REMOVE_TRACK', payload: id });
    dispatch({
      type: 'CURRENT_TRACK',
      payload: null
    });
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-4/6">
          <Player {...state.currentTrack} removeTrack={removeTrack} />
        </div>
        <div className="w-full md:w-2/6">
          <PlayList
            setTrack={setTrack}
            trackActive={state.currentTrack?.id}
            tracks={state.tracks}
            addTrack={addTrack}
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
