import React from 'react'
import ReactPlayer from 'react-player';

const VideoPlayer = ({url}) => {
  return (
    <>   <div className='player-wrapper'>
      <ReactPlayer url={url}
             className= 'react-player'
              playing
              controls
              light
              width='400px'
              height='250px'
                />
          </div>

    </>
  )
}

export default VideoPlayer