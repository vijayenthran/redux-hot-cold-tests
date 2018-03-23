import * as hotandcoldreducer from './reducer';
import {generateAuralUpdate, restartGame,makeGuess} from './actions';

describe('hot and cold reducer', ()=>{
  it('simpleTest when nothing is passed in', ()=>{
  const state = hotandcoldreducer.default(undefined, {type: '__UNKNOWN'});
    delete state.correctAnswer;
    expect(state).toEqual({
        guesses: [],
        feedback: 'Make your guess!',
        auralStatus: ''
    });
  });

    it('Should return the current state on an unknown action', () => {
        let currentState = {};
        const state = hotandcoldreducer.default(currentState, {type: '__UNKNOWN'});
        expect(state).toBe(currentState);
    });

    it('RESTART_GAME', ()=>{
      let state;
      state = hotandcoldreducer.default(state, restartGame(12));
      state = hotandcoldreducer.default(state, restartGame(20));
      expect(state).toEqual( { guesses: [],
        feedback: 'Make your guess!',
        auralStatus: '',
        correctAnswer: 20 }
);
    });

    it('MAKE_GUESS', ()=>{
      let state;
      state = hotandcoldreducer.default(state, makeGuess(12));
      state = hotandcoldreducer.default(state, makeGuess(30));
      expect(state).toEqual( { guesses: [ 12, 30 ], feedback: 'You got it!', auralStatus: '' });
    });

    it('GENERATE_AURAL_UPDATE', ()=>{
      let state;
      state = hotandcoldreducer.default(state, generateAuralUpdate());
      state = hotandcoldreducer.default(state, generateAuralUpdate());
      expect(state).toEqual( { guesses: [],
        feedback: 'Make your guess!',
        auralStatus: 'Here\'s the status of the game right now: Make your guess! You\'ve made 0 guesses.' });
    });

});
