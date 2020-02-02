import React from 'react';

const url =process.env.REACT_APP_API_HOST + "/api/replay/parse"

class FileUploader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        file: null
      };
      this.handleSubmit = this.handleSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
    }

    handleSubmit(e){
      e.preventDefault()
      if (this.state.file === null){
        return;
      }
      const formData = new FormData();
      formData.append('replay',this.state.file)

      fetch(url,{ method: 'POST',headers:{'content-type': 'multipart/form-data'},body: this.state.file})
      .then((response) => {
        return response.json()
      })
      .then(result => console.log(result))
      .catch(err => console.error(err))
    }

    onChange(e) {
      this.setState({file:e.target.files[0]})
    }
  
    render() {
      return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.onChange} />
        <input type="submit" value="Submit" />
      </form>
      );
    }
  }


export default FileUploader