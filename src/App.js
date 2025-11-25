import React, { useState } from 'react';
import './App.css';

function App() {
  const [words, setWords] = useState([
    { id: 1, original: 'Hello', translation: 'Привет' },
    { id: 2, original: 'World', translation: 'Мир' },
  ]);

  const [newOriginal, setNewOriginal] = useState('');
  const [newTranslation, setNewTranslation] = useState('');

  const [isTraining, setIsTraining] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(null);
  const [showTranslation, setShowTranslation] = useState(false);

  const addWord = () => {
    if (newOriginal.trim() && newTranslation.trim()) {
      const newWord = {
        id: Date.now(), 
        original: newOriginal,
        translation: newTranslation,
      };
      setWords([...words, newWord]);
      setNewOriginal('');
      setNewTranslation('');
    }
  };

  const startTraining = () => {
    if (words.length === 0) {
      alert('Добавьте слова для тренировки!');
      return;
    }
    setIsTraining(true);
    setCurrentWordIndex(Math.floor(Math.random() * words.length));
    setShowTranslation(false);
  };

  const nextWord = () => {
    setCurrentWordIndex(Math.floor(Math.random() * words.length));
    setShowTranslation(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Тренажер слов</h1>

        {}
        {!isTraining ? (
          <>
            <div className="add-word-form">
              <h2>Добавить новое слово</h2>
              <input
                type="text"
                placeholder="Слово (напр., Hello)"
                value={newOriginal}
                onChange={(e) => setNewOriginal(e.target.value)}
              />
              <input
                type="text"
                placeholder="Перевод (напр., Привет)"
                value={newTranslation}
                onChange={(e) => setNewTranslation(e.target.value)}
              />
              <button onClick={addWord}>Добавить</button>
            </div>

            <div className="word-list">
              <h2>Мой словарь</h2>
              <ul>
                {words.map((word) => (
                  <li key={word.id}>
                    <strong>{word.original}</strong> - {word.translation}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={startTraining} className="train-button">
              Начать тренировку
            </button>
          </>
        ) : (
          <div className="training-mode">
            <h2>Тренировка</h2>
            {currentWordIndex !== null && (
              <>
                <div className="word-card">
                  <p className="original-word">{words[currentWordIndex].original}</p>
                  {showTranslation && (
                    <p className="translation-word">{words[currentWordIndex].translation}</p>
                  )}
                </div>
                <div className="training-buttons">
                  {!showTranslation ? (
                    <button onClick={() => setShowTranslation(true)}>
                      Показать перевод
                    </button>
                  ) : (
                    <button onClick={nextWord}>Следующее слово</button>
                  )}
                </div>
              </>
            )}
            <button onClick={() => setIsTraining(false)} className="back-button">
              Вернуться к списку
            </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;