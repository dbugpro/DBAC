
import React from 'react';
import { KeyType } from '../types';
import { TARGET_SEQUENCE } from '../constants';
import GameButton from './GameButton';
import StatusDisplay from './StatusDisplay';

interface GameScreenProps {
  lives: number;
  score: number;
  currentStep: number;
  onKeyPress: (key: KeyType) => void;
  feedbackKey: KeyType | null;
  feedbackType: 'correct' | 'incorrect' | null;
}

const SequenceDisplay: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="flex justify-center space-x-4 mb-10">
    {TARGET_SEQUENCE.map((key, index) => (
      <div
        key={index}
        className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-4xl font-bold rounded-lg border-4 transition-all duration-200 ${
          index === currentStep
            ? 'border-yellow-400 text-yellow-400 scale-110 shadow-lg shadow-yellow-400/30'
            : 'border-slate-600 text-slate-500'
        }`}
      >
        {key}
      </div>
    ))}
  </div>
);

const GameScreen: React.FC<GameScreenProps> = ({
  lives,
  score,
  currentStep,
  onKeyPress,
  feedbackKey,
  feedbackType,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <StatusDisplay lives={lives} score={score} />
      <SequenceDisplay currentStep={currentStep} />
      <div className="grid grid-cols-2 gap-5 w-full max-w-md">
        {TARGET_SEQUENCE.map((key) => (
          <GameButton
            key={key}
            label={key}
            onClick={() => onKeyPress(key)}
            isCorrect={feedbackKey === key && feedbackType === 'correct'}
            isIncorrect={feedbackKey === key && feedbackType === 'incorrect'}
          />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
