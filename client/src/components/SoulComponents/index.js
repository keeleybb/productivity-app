import React, { Component } from 'react';
import Sound from 'react-sound';
import PlayerControls from './PlayerControls';
import SongSelector from './SongSelector';
import songs from './songs';
import { Col, Row, Container } from "../Grid";

class SoulComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controlled: true,
      currentSong: songs[0],
      position: 0,
      // loop: false,
      playStatus: Sound.status.STOPPED
    };
  }

  getStatusText() {
    switch (this.state.playStatus) {
      case Sound.status.PLAYING:
        return 'playing';
      case Sound.status.PAUSED:
        return 'paused';
      case Sound.status.STOPPED:
        return 'stopped';
      default:
        return '(unknown)';
    }
  }

  // is passed song, sets it to currentSong
  // could change to a hook for currentSong, setCurrentSong
  handleSongSelected = (song) => {
    this.setState({ currentSong: song, position: 0 });
  }

  handleControlledComponentChange = (ev) => {
    this.setState({
      controlled: ev.target.checked,
      position: 0
    });
  }

  // renderCurrentSong() {
  //   return (
  //     <div className="container">

  //       <div className="row">
  //         <p>
  //           Current song {this.state.currentSong.title}. Song is {this.getStatusText()}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  render() {
    // const { loop } = this.state;

    return (
      <Container>
        <Row>
          <Col size="md-12">
            <SongSelector
              songs={songs}
              selectedSong={this.state.currentSong}
              onSongSelected={this.handleSongSelected}
            />
            {/* {this.state.currentSong && this.renderCurrentSong()} */}
          </Col>

          <Col size="md-12">
            <div>
              <PlayerControls
                playStatus={this.state.playStatus}
                // loop={loop}
                onPlay={() => this.setState({ playStatus: Sound.status.PLAYING })}
                onPause={() => this.setState({ playStatus: Sound.status.PAUSED })}
                onResume={() => this.setState({ playStatus: Sound.status.PLAYING })}
                onStop={() => this.setState({ playStatus: Sound.status.STOPPED, position: 0 })}
                onSeek={position => this.setState({ position })}
                // onToggleLoop={e => this.setState({ loop: e.target.checked })}
                duration={this.state.currentSong ? this.state.currentSong.duration : 0}
                position={this.state.position}
              />
              {this.state.currentSong && (
                this.state.controlled ? (
                  <Sound
                    url={this.state.currentSong.url}
                    playStatus={this.state.playStatus}
                    position={this.state.position}
                    // loop={loop}
                    onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                    onLoad={() => console.log('Loaded')}
                    onPlaying={({ position }) => this.setState({ position })}
                    onPause={() => console.log('Paused')}
                    onResume={() => console.log('Resumed')}
                    onStop={() => console.log('Stopped')}
                    onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
                  />
                ) : (
                    <Sound
                      url={this.state.currentSong.url}
                      playStatus={this.state.playStatus}
                      playFromPosition={this.state.position}
                      // loop={loop}
                      onLoading={({ bytesLoaded, bytesTotal }) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                      onLoad={() => console.log('Loaded')}
                      onPlaying={({ position }) => console.log('Position', position)}
                      onPause={() => console.log('Paused')}
                      onResume={() => console.log('Resumed')}
                      onStop={() => console.log('Stopped')}
                      onFinishedPlaying={() => this.setState({ playStatus: Sound.status.STOPPED })}
                    />
                  )
              )}
            </div>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default SoulComponent;