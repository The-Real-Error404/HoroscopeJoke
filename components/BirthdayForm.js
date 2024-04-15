
import { useState } from 'react';

const BirthdayForm = ({ onSubmit }) => {
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(birthday);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
      />
      <button type="submit">Get Horoscope Joke</button>
    </form>
  );
};

export default BirthdayForm;