import React, { useState } from 'react';
import { Statistics } from './FeedbackWidjet/Statistics';
import { FeedbackOptions } from './FeedbackWidjet/FeedbackOptions';
import { Notification } from './FeedbackWidjet/Notification';
import { Section } from './FeedbackWidjet/Section';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function addFeedback(event) {
    const feedbackType = event.target.name;

    switch (feedbackType) {
      case 'good':
        setGood(state => state + 1);
        break;

      case 'neutral':
        setNeutral(state => state + 1);
        break;

      case 'bad':
        setBad(state => state + 1);
        break;

      default:
        return;
    }
  }

  function countTotalFeedback() {
    const totalFeedback = good + neutral + bad;
    return totalFeedback;
  }

  function countPositiveFeedbackPercentage() {
    let positiveFeedbackPercentage = 0;
    positiveFeedbackPercentage = (good * 100) / (good + neutral + bad);
    return parseInt(positiveFeedbackPercentage);
  }

  const total = countTotalFeedback();

  return (
    <div>
      <Section title={'Please live feedback'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={addFeedback}
        />
      </Section>

      {total > 0 && (
        <Section style={{ backgroundColor: 'white' }} title={'Statistics'}>
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        </Section>
      )}

      {total === 0 && <Notification message={'There is no feedback'} />}
    </div>
  );
}
