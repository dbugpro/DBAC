
import React, { useState, useCallback, useEffect } from 'react';
import { GameState, KeyType } from './types';
import { TARGET_SEQUENCE, KEY_MAP } from './constants';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import GameOverScreen from './components/GameOverScreen';
import { soundManager } from './utils/SoundManager';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.Idle);
  const [lives, setLives] = useState<number>(4);
  const [score, setScore] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [feedbackKey, setFeedbackKey] = useState<KeyType | null>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | null>(null);

  const resetGame = useCallback(() => {
    soundManager.init();
    soundManager.startBGM();
    setLives(4);
    setScore(0);
    setCurrentStep(0);
    setGameState(GameState.Playing);
  }, []);

  const handleUserInput = useCallback((key: KeyType) => {
    if (gameState !== GameState.Playing) return;

    if (key === TARGET_SEQUENCE[currentStep]) {
      soundManager.playCorrect();
      setFeedbackKey(key);
      setFeedbackType('correct');
      const nextStep = currentStep + 1;
      if (nextStep === TARGET_SEQUENCE.length) {
        soundManager.playSequenceComplete();
        setScore(prev => prev + 10);
        setCurrentStep(0);
      } else {
        setCurrentStep(nextStep);
      }
    } else {
      soundManager.playIncorrect();
      setFeedbackKey(key);
      setFeedbackType('incorrect');
      const newLives = lives - 1;
      setLives(newLives);
      setCurrentStep(0);
      if (newLives <= 0) {
        soundManager.stopBGM();
        setGameState(GameState.GameOver);
      }
    }

    setTimeout(() => {
      setFeedbackKey(null);
      setFeedbackType(null);
    }, 300);
  }, [currentStep, lives, gameState]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      if (KEY_MAP.hasOwnProperty(key)) {
        handleUserInput(KEY_MAP[key as keyof typeof KEY_MAP]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUserInput]);

  const renderContent = () => {
    switch (gameState) {
      case GameState.Playing:
        return (
          <GameScreen
            lives={lives}
            score={score}
            currentStep={currentStep}
            onKeyPress={handleUserInput}
            feedbackKey={feedbackKey}
            feedbackType={feedbackType}
          />
        );
      case GameState.GameOver:
        return <GameOverScreen score={score} onRestart={resetGame} />;
      case GameState.Idle:
      default:
        return <StartScreen onStart={resetGame} />;
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-4 font-sans">
      {renderContent()}
    </div>
  );
};

export default App;
