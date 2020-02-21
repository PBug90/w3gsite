import React from 'react';
import {replayUpload} from '../Requests'
class FileUploader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: null
      };
      this.uploadFile = this.uploadFile.bind(this)
      this.onChange = this.onChange.bind(this)
      this.onClick = this.onClick.bind(this)
    }

    uploadFile(){
      if (this.state.file === null){
        return;
      }
      const formData = new FormData();
      formData.append('replay',this.state.file)
      replayUpload(formData)
      .then(result => {
        this.props.onReplayParsed(result)
      })
      .catch(err => console.error(err))
    }

    onChange(e) {
      this.setState({file:e.target.files[0]},() => {
        this.uploadFile()
      })
    }

    onClick(){
      this.refs.fileUploader.click();
    }
  
    render() {
      return (
        <div>
          <input ref="fileUploader" className="hidden" type="file" onChange={this.onChange} />
          <button onClick={this.onClick} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Upload Replay
          </button> 
        </div>
      );
    }
  }


export default FileUploader