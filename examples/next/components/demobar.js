import React from 'react';
import {
  ReactFormGenerator,
  ElementStore,
} from '@threehippies/react-form-builder';
import { post } from './requests';

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    this.submit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    ElementStore.subscribe((state) => this.onChange(state.data));
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  onChange = (data) => {
    this.setState({
      data,
    });
  };

  onSubmit(data) {
    const { postUrl } = this.props;
    console.log('onSubmit', data);
    // Place code to post json data to server here
    post(postUrl, data).then(() => {
      window.location.href = '/form';
    });
    return false;
  }

  render() {
    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

    let shortModalClass = 'modal short-modal';
    if (this.state.shortPreviewVisible) {
      shortModalClass += ' show d-block';
    }

    let roModalClass = 'modal ro-modal';
    if (this.state.roPreviewVisible) {
      roModalClass += ' show d-block';
    }

    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        <h4 className="float-left">Preview</h4>
        <button
          className="btn btn-primary float-right"
          style={{ marginRight: '10px' }}
          onClick={this.showPreview.bind(this)}
        >
          Preview Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: '10px' }}
          onClick={this.showShortPreview.bind(this)}
        >
          Alternate/Short Form E
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: '10px' }}
          onClick={this.showRoPreview.bind(this)}
        >
          Read Only Form
        </button>

        {this.state.previewVisible && (
          <div className={modalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    back_action="/"
                    back_name="Back"
                    answer_data={{}}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    onSubmit={this.submit}
                    variables={this.props.variables}
                    data={this.state.data}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    back_action="/"
                    back_name="Back"
                    answer_data={{}}
                    action_name="Save"
                    form_action="/"
                    form_method="POST"
                    read_only={true}
                    variables={this.props.variables}
                    hide_actions={true}
                    data={this.state.data}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.shortPreviewVisible && (
          <div className={shortModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <ReactFormGenerator
                    download_path=""
                    back_action=""
                    answer_data={{}}
                    form_action="/"
                    form_method="POST"
                    data={this.state.data}
                    display_short={true}
                    variables={this.props.variables}
                    hide_actions={false}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
