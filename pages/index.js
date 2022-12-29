import { useState, useEffect } from "react";
import Head from "next/head";

import ImappLogo from "/components/ImappLogo";
import ScoreCounter from "/components/ScoreCounter";
import Tendency from "/components/Tendency";
import TendencyModal from "/components/TendencyModal";
import UpdateScoreModal from "/components/UpdateScoreModal";
import SwitchTendencyButton from "/components/SwitchTendencyButton";

function Home() {
  const [currentTendencyView, setCurrentTendencyView] = useState("positive");
  const [score, setScore] = useState(5);
  const [tendencyModalState, setTendencyModalState] = useState([
    {
      title: "",
      cost: 0,
      id: 0,
      visibility: "hidden",
      editMode: false,
    },
  ]);

  const [updateScoreModalState, setUpdateScoreModalState] = useState([
    {
      visibility: "hidden",
      currentScore: 0,
    },
  ]);

  const [positiveTendencies, setPositiveTendencies] = useState([
    {
      name: "Positive Tendency 1",
      cost: 50,
      id: 654321,
    },
  ]);
  const [negativeTendencies, setnegativeTendencies] = useState([
    {
      name: "Negative Tendency 1",
      cost: 50,
      id: 123456,
    },
  ]);

  const [tendencyList, setTendencyList] = useState([
    {
      name: "Positive Tendency 1",
      cost: 50,
      id: 654321,
      type: "positive",
    },
  ]);

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

  function OpenTendencyModal() {
    setTendencyModalState([
      {
        title: "",
        cost: 0,
        id: GenerateKeyID(),
        visibility: "visible",
        editMode: false,
      },
    ]);
  }

  function EditTendencyModal(title, cost, id) {
    setTendencyModalState([
      {
        title: title,
        cost: cost,
        id: id,
        visibility: "visible",
        editMode: true,
      },
    ]);
  }

  function GenerateKeyID() {
    return Math.random().toString(36).substr(2, 9);
  }

  function AddNewTendency(title, cost, id) {
    if (currentTendencyView === "positive") {
      //check if tendency already exists
      if (positiveTendencies.some((tendency) => tendency.id === id)) {
        const index = positiveTendencies.findIndex(
          (tendency) => tendency.id === id
        );
        positiveTendencies[index].name = title;
        positiveTendencies[index].cost = cost;
        positiveTendencies[index].id = id;
        setPositiveTendencies([...positiveTendencies]);
      } else {
        setPositiveTendencies([
          ...positiveTendencies,
          { name: title, cost: cost, id: id },
        ]);
      }
    } else {
      //check if tendency already exists
      if (negativeTendencies.some((tendency) => tendency.id === id)) {
        const index = negativeTendencies.findIndex(
          (tendency) => tendency.id === id
        );
        negativeTendencies[index].name = title;
        negativeTendencies[index].cost = cost;
        negativeTendencies[index].id = id;
        setnegativeTendencies([...negativeTendencies]);
      } else {
        setnegativeTendencies([
          ...negativeTendencies,
          { name: title, cost: cost },
        ]);
      }
    }

    SaveData();
    CloseTendencyModal();
  }

  function DeleteTendency(id) {
    if (currentTendencyView === "positive") {
      const index = positiveTendencies.findIndex(
        (tendency) => tendency.id === id
      );
      positiveTendencies.splice(index, 1);
      setPositiveTendencies([...positiveTendencies]);
    } else {
      const index = negativeTendencies.findIndex(
        (tendency) => tendency.id === id
      );
      negativeTendencies.splice(index, 1);
      setnegativeTendencies([...negativeTendencies]);
    }
    SaveData();
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
        console.log(data);
      });
  }, []);

  /***********************************************************************/

  return (
    <div className="App">
      <Head>
        <title>Imapp</title>
      </Head>

      <div className="App-header o-container o-container--fluid">
        <ImappLogo />
        <ScoreCounter
          score={score}
          setUpdateScoreModalState={setUpdateScoreModalState}
        />
      </div>

      <div className="o-container">
        <UpdateScoreModal state={updateScoreModalState} />

        <TendencyModal
          tendencyModalState={tendencyModalState}
          setTendencyModalState={setTendencyModalState}
          currentTendencyView={currentTendencyView}
        />

        <div className="tendency-container">
          {currentTendencyView === "positive"
            ? positiveTendencies.map((tendency) => (
                <Tendency
                  title={tendency.name}
                  cost={tendency.cost}
                  tendencyState="positive"
                  key={tendency.id}
                  id={tendency.id}
                  callback={() => ExchangeScore(tendency.cost)}
                  optionsFunction={(title, cost, id) =>
                    EditTendencyModal(title, cost, id)
                  }
                />
              ))
            : negativeTendencies.map((tendency) => (
                <Tendency
                  title={tendency.name}
                  cost={tendency.cost}
                  key={tendency.id}
                  id={tendency.id}
                  tendencyState="negative"
                  callback={() => ExchangeScore(-tendency.cost)}
                  optionsFunction={(title, cost, id) =>
                    EditTendencyModal(title, cost, id)
                  }
                />
              ))}

          <a className="c-add-tendency_button" onClick={OpenTendencyModal}>
            Add new tendency...
          </a>
        </div>

        <SwitchTendencyButton
          currentTendencyView={currentTendencyView}
          setCurrentTendencyView={setCurrentTendencyView}
        />
      </div>
    </div>
  );
}

export default Home;
