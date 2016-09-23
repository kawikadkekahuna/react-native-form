// Need to attach current section to redux store.
import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { loadSection } from '../actions/Form';
// Selectors
import {
  currentQuestionsSelector
} from '../selectors/Form';
// Components
import {
  Text,
  ScrollView
} from 'react-native';
import Header from '../components/Header';
import Questions from '../components/Questions';
// Questions
import { RefuseQuestions } from '../utilities/questions';
import { processQuestions } from '../utilities/helpers';
import * as answerOptions from '../utilities/answerOptions.js';

class Refuse extends Component {
  static propTypes = {
    currentRoute: PropTypes.string,
    loadSection: PropTypes.func,
    questions: PropTypes.object
  };

  mixins: [PureRenderMixin];

  constructor(props) {
    super(props);
    this.renderPrefaceText = this._renderPrefaceText.bind(this);
    this.state = {
      questions: RefuseQuestions.get('questions').map((question) => {
        if (!question.has('answers')) {
          return question;
        }
        return question.set('answers', answerOptions[ question.get('answers') ]);
      })
    };
  }

  componentWillMount() {
    // this.props.loadSection({
    //   questions: RefuseQuestions.get('questions'),
    //   answerOptions
    // });
  }

  _renderPrefaceText() {
    if (RefuseQuestions.prefaceText) {
      return (<Text>{RefuseQuestions.get('prefaceText')}</Text>);
    }
    return null;
  }

  render() {
    if (!this.state.questions) {
      return (
        <Text> Loading.. </Text>
      );
    }
    return (
      <ScrollView>
        <Header
          text={"Vispdat Housing History"}
        />
        <Header
          text={RefuseQuestions.get('sectionTitle')}
        />
        <Questions
          questions={processQuestions(this.state.questions)}
        />
      </ScrollView>
    );
  }
}

export default Refuse;
