import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import "../styles/Autocomplete.css";

class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);

    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false
    };
  }

  // Event fired when the input value is changed
  onChange = e => {
    let { suggestions, field } = this.props;

    let filteredSuggestions = suggestions.filter((suggestion) => {
        return suggestion[field].toLowerCase().startsWith(e.currentTarget.value.toLowerCase());
    });
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true
    });

    this.props.onChange(e);
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false
    });

    this.props.onClick(e);
  };

  // Event fired when the user presses a key down
  onKeyUp = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    
    if (e.keyCode === 13 || e.keyCode === 8) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyUp,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions
      }
    } = this;

    const { className, name, value, field, autoComplete } = this.props;

    let suggestionsListComponent;

    if (showSuggestions) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={index} onClick={onClick} id={suggestion.id}>
                  <span style={{ minWidth: "25px", display: "inline-block" }}>{ suggestion.id }</span> - <span>{ suggestion[field] }</span>
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Fragment>
        <input
          type="text"
          onChange={onChange}
          onKeyUp={onKeyUp}
          value={value}
          className={className}
          name={name}
          autoComplete={autoComplete}
        />
        {suggestionsListComponent}
      </Fragment>
    );
  }
}

export default Autocomplete;