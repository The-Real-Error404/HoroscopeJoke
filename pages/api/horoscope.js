import axios from 'axios';

const OPENAI_API_KEY = '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';

const zodiacSignImages = {
  Aries: 'https://www.astrology-zodiac-signs.com/images/aries.jpg',
  Taurus: 'https://www.astrology-zodiac-signs.com/images/taurus.jpg',
  Gemini: 'https://www.astrology-zodiac-signs.com/images/gemini.jpg',
  Cancer: 'https://www.astrology-zodiac-signs.com/images/cancer.jpg',
  Leo: 'https://www.astrology-zodiac-signs.com/images/leo.jpg',
  Virgo: 'https://www.astrology-zodiac-signs.com/images/virgo.jpg',
  Libra: 'https://www.astrology-zodiac-signs.com/images/libra.jpg',
  Scorpio: 'https://www.astrology-zodiac-signs.com/images/scorpio.jpg',
  Sagittarius: 'https://www.astrology-zodiac-signs.com/images/sagittarius.jpg',
  Capricorn: 'https://www.astrology-zodiac-signs.com/images/capricorn.jpg',
  Aquarius: 'https://www.astrology-zodiac-signs.com/images/aquarius.jpg',
  Pisces: 'https://www.astrology-zodiac-signs.com/images/pisces.jpg',
};

function getZodiacSign(birthday) {
  const date = new Date(birthday);
  const month = date.getMonth() + 1; 
  const day = date.getDate();

  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    return 'Aquarius';
  } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
    return 'Pisces';
  } else if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    return 'Aries';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    return 'Taurus';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    return 'Gemini';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    return 'Cancer';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    return 'Leo';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    return 'Virgo';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    return 'Libra';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    return 'Scorpio';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    return 'Sagittarius';
  } else {
    return 'Capricorn';
  }
}

export default async function handler(req, res) {
  const { birthday } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: "gpt-3.5-turbo-instruct", 
        prompt: `How about:

        "Craft a simple horoscope joke for someone born on ${birthday}! Put their zodiac sign. One-liner joke."`,
        max_tokens: 50,
        temperature: 1.5,
        n: 2
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    console.log("OpenAI response:", response.data);
    const joke = response.data.choices[0].text.trim();
    
    const zodiacSign = getZodiacSign(birthday);
    
    const zodiacSignImage = zodiacSignImages[zodiacSign];
    
    res.status(200).json({ joke, zodiacSignImage });
  } catch (error) {
    console.error('Error generating horoscope joke:', error);
    res.status(500).json({ message: 'Error generating horoscope joke' });
  }
}
