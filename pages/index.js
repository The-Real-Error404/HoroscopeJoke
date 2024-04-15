import { useState } from "react";
import axios from "axios";
import BirthdayForm from "../components/BirthdayForm";
import HoroscopeJoke from "../components/HoroscopeJoke";

const IndexPage = () => {
  const [horoscope, setHoroscope] = useState(null);
  const [zodiacSignImage, setZodiacSignImage] = useState(null);

  const getHoroscopeJoke = async (birthday) => {
    try {
      const response = await axios.post("/api/horoscope", { birthday });
      setHoroscope(response.data.joke);
      setZodiacSignImage(response.data.zodiacSignImage);
    } catch (error) {
      console.error("Error fetching horoscope joke:", error);
    }
  };

  return (
    <div>
      <h1>Horoscope Joke Generator</h1>
      <BirthdayForm onSubmit={getHoroscopeJoke} />
      {horoscope && zodiacSignImage && (
        <div>
          <img src={zodiacSignImage} alt="Zodiac Sign" />
          <HoroscopeJoke joke={horoscope} />
        </div>
      )}
    </div>
  );
};

export default IndexPage;
