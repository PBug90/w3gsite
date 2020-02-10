import React from 'react';

const url =process.env.REACT_APP_API_HOST + "/api/replay/"

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
      fetch(url,{ method: 'POST',body: formData})
      .then((response) => {
        return response.json()
      })
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
          <input ref="fileUploader" class="hidden" type="file" onChange={this.onChange} />
          <button onClick={this.onClick} class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Upload Replay
          </button> 
        </div>
      );
    }
  }


export default FileUploader