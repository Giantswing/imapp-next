import { useState, useEffect } from "react";
import Head from "next/head";

import ImappLogo from "/components/ImappLogo";
import ScoreCounter from "/components/ScoreCounter";
import Tendency from "/components/Tendency";
import TendencyModal from "/components/TendencyModal";

function Home() {
  const [currentTendencyView, setCurrentTendencyView] = useState("positive");
  const [score, setScore] = useState(5);
  const [tendencyModalState, setTendencyModalState] = useState("hidden");
  const [positiveTendencies, setPositiveTendencies] = useState([
    {
      name: "Run 5km",
      cost: 50,
    },
    {
      name: "Do exercise",
      cost: 100,
    },
    {
      name: "Play guitar for 30 minutes",
      cost: 25,
    },
  ]);

  const [negativeTendencies, setnegativeTendencies] = useState([
    {
      name: "Oversleep",
      cost: 25,
    },
    {
      name: "Overeat",
      cost: 50,
    },
    {
      name: "Skip work",
      cost: 150,
    },
    {
      name: "Get fired from work",
      cost: 5000,
    },
    {
      name: "Get fired from work",
      cost: 5000,
    },
    {
      name: "Get fired from work",
      cost: 5000,
    },
    {
      name: "Get fired from work",
      cost: 5000,
    },
  ]);

  function SwitchTendencyView() {
    if (currentTendencyView === "positive") {
      setCurrentTendencyView("negative");
    } else {
      setCurrentTendencyView("positive");
    }
  }

  function ExchangeScore(value) {
    setScore(score + parseInt(value));
    SaveData(score + parseInt(value));
  }

  function SaveData(newScore = score) {
    fetch(
      "https://imapp-cfdd0-default-rtdb.europe-west1.firebasedatabase.app/Data.json",
      {
        method: "PUT",
        body: JSON.stringify([
          {
            "Current-Score": newScore,
            "Positive-Tendencies": positiveTendencies,
            "Negative-Tendencies": negativeTendencies,
          },
        ]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  function AddNewTendency() {
    setTendencyModalState("visible");
  }

  function CloseTendencyModal() {
    console.log("yea");
    setTendencyModalState("hidden");
  }

  useEffect(() => {
    fetch(
      "https://imapp-cfdd0-default-rtdb.europe-west1.firebasedatabase.app/Data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setScore(data[0]["Current-Score"]);
        setPositiveTendencies(data[0]["Positive-Tendencies"]);
        setnegativeTendencies(data[0]["Negative-Tendencies"]);
      });
  }, []);

  return (
    <div className="App">
      <Head>
        <title>Imapp</title>
      </Head>

      <div className="App-header o-container o-container--fluid">
        <ImappLogo />
        <ScoreCounter score={score} />
      </div>
      <div className="o-container">
        <TendencyModal
          tendencyModalState={tendencyModalState}
          closeModal={() => CloseTendencyModal()}
        />

        <div className="tendency-container">
          {currentTendencyView === "positive"
            ? positiveTendencies.map((tendency) => (
                <Tendency
                  name={tendency.name}
                  cost={tendency.cost}
                  tendencyState="positive"
                  key={tendency.name}
                  callback={() => ExchangeScore(tendency.cost)}
                />
              ))
            : negativeTendencies.map((tendency) => (
                <Tendency
                  name={tendency.name}
                  cost={tendency.cost}
                  key={tendency.name}
                  tendencyState="negative"
                  callback={() => ExchangeScore(-tendency.cost)}
                />
              ))}

          <a className="c-add-tendency_button" onClick={AddNewTendency}>
            Add new tendency...
          </a>
        </div>

        <div className="main-footer">
          <button
            className={`c-switch-button c-switch-button--${currentTendencyView}`}
            onClick={SwitchTendencyView}
          >
            {currentTendencyView === "positive"
              ? "View negative tendencies"
              : "View positive tendencies"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
