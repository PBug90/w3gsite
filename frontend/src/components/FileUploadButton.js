import React from 'react';
import Button from 'react-bootstrap/Button'

class FileUploadButton extends React.Component {
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
      this.props.fetchPostRequest(formData)
      .then(result => {
        this.props.onSuccess(result)
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
        <>
          <input ref="fileUploader" className="d-none" type="file" onChange={this.onChange} />
          <Button onClick={this.onClick} variant="primary">{this.props.text}</Button>
        </>
      );
    }
  }


export default FileUploadButton