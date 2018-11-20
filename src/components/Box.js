import React, { Component } from 'react';
import ResizableBox from 're-resizable';
import Draggable, {DraggableCore} from 'react-draggable';

class Box extends Component {
  constructor(props) {
    super(props)

    this.state = {
      width: 100,
      height: 100,
      xdisp: 100,
      ydisp: 100,
    }
  }

  handleResizeStop = (e, direction, ref, d) => {
    this.setState({
      width: this.state.width + d.width,
      height: this.state.height + d.height,
    });
  }

  // shouldn't need two separate sets of (x,y) for displaying and setting. Refactor later
  handleResizing = (e, direction, ref, d) => {
    this.setState({
      xdisp: this.state.width + d.width,
      ydisp: this.state.height + d.height,
    });
  }


  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <ResizableBox
            className='resizable'
            size={{width: this.state.width, height: this.state.height}}
            onResizeStop={this.handleResizeStop}
            onResize={this.handleResizing}
            draggableOpts={{grid: [25, 25]}}>
            <span className="text">
              width: {this.state.xdisp} <br></br>
              height: {this.state.ydisp}
            </span>
          </ResizableBox>
                </div>
      </Draggable>
    );
  }
}

export default Box;
