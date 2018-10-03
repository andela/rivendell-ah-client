import React, { Component } from 'react';
import { Modal, Button, Header,
  Form, Radio, TextArea, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const reportOptions = [
  { label: 'plagiarism', value: 'plagiarism' },
  { label: 'immoral', value: 'immoral' },
  { label: 'violent', value: 'violent' },
  { label: 'Racial', value: 'Racial' },
  { label: 'False News', value: 'false' },
  { label: 'Hate Speech', value: 'hate speech' },
  { label: 'Terrorism', value: 'terrorism' },
];

/**
 *
 */
class ReportArticle extends Component {
  /**
     *
     * @param {object} props contains the props passed to it from its parent
     */
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      description: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.open = this.open.bind(this);
    this.cancel = this.cancel.bind(this);
  }


  /**
   * this is called when a new props is about to be received
   * It resets the component state
   * @param {object} newProps contains the new props to be
   * received
   * @returns {void} performs an action and returns nothing
   */
  componentWillReceiveProps(newProps) {
    if (newProps.success) {
      setTimeout(() => this.setState({
        open: false,
        type: '',
        description: ''
      }), 1000);
    }
  }

  /**
   *this handles a change event on both the textbox and the radio group
   * @param {*} e this contains information about the event that
   * occured
   * @param {*} param1 this contains the new value that was created
   * when the event was called
   * @returns {void} handles the event that occured and returns nothing
   */
  handleChange(e, { name, value }) {
    if (name === 'type') {
      this.setState({ type: value });
    } else if (name === 'description') {
      this.setState({ description: value });
    }
  }

  /**
   *this is called when the submit button is clicked
   @returns {void} performs an action and returns nothing
   */
  handleSubmit() {
    const { description, type } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ description, type });
  }

  /**
   *@returns {void} performs an action and returns nothing
   */
  open() {
    this.setState({ open: true });
  }

  /**
   * this closes the modal by setting open equal to false
   *@returns {void} returns nothing
   */
  cancel() {
    const { onClose } = this.props;
    this.setState({ open: false });
    onClose();
  }

  /**
   *returns html to be rendered to then DOM
   *@returns {JSX} returns JSX to be rendered to the DOM
   */
  render() {
    const { type } = this.state;
    const { success, errors } = this.props;
    const { open } = this.state;
    const errorMessages = [];

    Object.values(errors).forEach((error) => {
      if (Array.isArray(error)) {
        errorMessages.push(...error);
      }
    });

    return (
      <div id="report-article">
        <Modal
          closeOnDimmerClick
          closeOnEscape={false}
          open={open}
          size="tiny"
          trigger={(
            <Button
              onClick={this.open}
            >
              Report Article

            </Button>
          )}
        >

          <Modal.Header>Report Article</Modal.Header>
          {success || errorMessages.length ? (
            <Message
              positive={!!success}
              header={success
                ? 'Report has been sent successfully' : 'An Error occured'}
              attached
              content={success
                ? 'The admin would start responding to your request' : null}
              success={success}
              list={errorMessages}
              error={!!errorMessages.length}
            />
          ) : null}

          <Modal.Content>
            <Modal.Description>
              <Header>Select report type</Header>
              <Form>
                {reportOptions.map(option => (
                  <Form.Field key={option.value}>
                    <Radio
                      label={option.label.substr(0, 1).toUpperCase()
                        + option.label.substr(1)}
                      name="type"
                      value={option.value}
                      checked={type === option.value}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                ))}

                <TextArea
                  name="description"
                  placeholder="Why are you reporting this"
                  onChange={this.handleChange}
                />
                <Button
                  className="submit-btn"
                  color="yellow"
                  content="Submit"
                  onClick={this.handleSubmit}
                />
                <Button
                  negative
                  content="Cancel"
                  onClick={this.cancel}
                />
              </Form>

            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}


export default ReportArticle;

ReportArticle.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  success: PropTypes.bool.isRequired,
  errors: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  onClose: PropTypes.func,
};

ReportArticle.defaultProps = {
  errors: {},
  onClose: () => {}
};
