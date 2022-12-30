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
  const [score, setScore] = useState(-999);
  const [tendencyModalState, setTendencyModalState] = useState([
    {
      id: 0,
      visibility: "hidden",
      editMode: false,
    },
  ]);

  const [scoreModalState, setScoreModalState] = useState([
    {
      visibility: "hidden",
    },
  ]);

  const [tendencyList, setTendencyList] = useState([
    {
      title: "Positive Tendency 1",
      cost: 50,
      id: 654321,
      type: "positive",
    },
  ]);

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

  function GenerateKeyID() {
    return Math.random().toString(36).substr(2, 9);
  }

  function SaveData() {
    if (score !== -999) {
      fetch(
        "https://imapp-cfdd0-default-rtdb.europe-west1.firebasedatabase.app/Data.json",
        {
          method: "PUT",
          body: JSON.stringify([
            {
              "Current-Score": score,
              "Tendency-List": tendencyList,
            },
          ]),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }

  useEffect(() => {
    fetch(
      "https://imapp-cfdd0-default-rtdb.europe-west1.firebasedatabase.app/Data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setScore(data[0]["Current-Score"]);
        setTendencyList(data[0]["Tendency-List"]);
        console.log(data);
      });
  }, []);

  //save data when score or tendency list changes
  useEffect(() => {
    SaveData();
  }, [score, tendencyList]);

  /***********************************************************************/

  return (
    <div className="App">
      <Head>
        <title>Imapp</title>
      </Head>

      <div className="App-header o-container o-container--fluid">
        <ScoreCounter score={score} setScoreModalState={setScoreModalState} />
      </div>

      <div className="o-container">
        <UpdateScoreModal
          score={score}
          setScore={setScore}
          scoreModalState={scoreModalState}
          setScoreModalState={setScoreModalState}
        />

        <TendencyModal
          tendencyList={tendencyList}
          setTendencyList={setTendencyList}
          tendencyModalState={tendencyModalState}
          setTendencyModalState={setTendencyModalState}
          currentTendencyView={currentTendencyView}
        />

        <div className="tendency-container">
          {tendencyList
            .filter((tendency) => tendency.type === currentTendencyView)
            .map((tendency) => (
              <Tendency
                tendencyList={tendencyList}
                key={tendency.id}
                id={tendency.id}
                score={score}
                setScore={setScore}
                setTendencyModalState={setTendencyModalState}
              />
            ))}

          <a className="c-add-tendency_button" onClick={OpenTendencyModal}>
            Add new{" "}
            {currentTendencyView === "positive" ? "positive" : "negative"}{" "}
            tendency...
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
