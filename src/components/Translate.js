import React, { useEffect, useState } from "react";
import axios from "axios";
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
  withCredentials: false,
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }
});

const doTranslation = async (input, languageCode, cancelToken) => {
  try {
    const { data } = await axios.post(
      "https://translation.googleapis.com/language/translate/v3?key=AIzaSyCf0Xy0OnhxlduyEt3K8zP-sOuu-l_u6uA",
      {
        q: input,
        target: languageCode
      },

      { cancelToken: cancelToken.token }
    );

    return data.data.translations[0].translatedText;
  } catch (err) {
    return "";
  }
};

export default ({ language, text }) => {
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    if (!text) {
      return;
    }

    const cancelToken = axios.CancelToken.source();

    doTranslation(text, language, cancelToken).then(setTranslated);

    return () => {
      try {
        cancelToken.cancel();
      } catch (err) {}
    };
  }, [text, language]);

  return (
    <div>
      <label className="label">Output</label>
      <h1 className="title">{translated}</h1>
    </div>
  );
};
