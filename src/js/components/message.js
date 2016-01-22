import React from 'react';

export class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: ''
    }
  }
  render() {
    let { message, dismiss, dispatch } = this.props;
    let { title, body, type, action } = message.toJS();
    let ok = () => {dispatch(dismiss())};
    let hasCancel = false;
    let promptType = false;
    let compromise = false;

    if (action.type === 'confirm'){
      ok = () => {
        dispatch(action.after());
        dispatch(dismiss());
      }
      if (typeof action.compromise !== 'undefined') {
        compromise = () => {
          dispatch(action.compromise());
          dispatch(dismiss());
        }
      }
      hasCancel = true;    
    }
    else if (action.type === 'prompt' || action.type === 'secretPrompt') {
      ok = () => {
        dispatch(action.after(this.state.prompt));
        dispatch(dismiss());
      }
      promptType = (action.type === 'secretPrompt') ? 'password' : 'text';
      hasCancel = true;
    }

    return (
      <article className={`popup popup--${type}`}>
        <h1 className="popup__title">{title}</h1>
        <section className="popup__body">
          <p>{body}</p>
          {promptType && 
            <input className="popup__prompt"
              type={promptType}
              onChange={(e) => {this.setState({prompt: e.target.value})}} />}
        </section>

        <div className="popup__buttons">
          <button onClick={ok} className="popup__button popup__button--ok">{action.label}</button>
          {hasCancel && <button onClick={() => dispatch(dismiss())} className="popup__button">Cancel</button>}
          {compromise && <button onClick={compromise} className="popup__button popup__button--compromise">{action.compromiseLabel}</button>}
        </div>
      </article>
    );
  }
}

export default Message;