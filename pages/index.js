import { useState, useEffect } from "react";
import Head from "next/head";

import ImappLogo from "/components/ImappLogo";
import ScoreCounter from "/components/ScoreCounter";
import TendencyContainer from "../components/TendencyContainer";
import TendencyModal from "/components/TendencyModal";
import UpdateScoreModal from "/components/UpdateScoreModal";
import SwitchTendencyButton from "/components/SwitchTendencyButton";

function Home() {
  const [currentTendencyView, setCurrentTendencyView] = useState("positive");
  const [score, setScore] = useState(-999);
  const [entering, setEntering] = useState(false);

  const [lastDate, setLastDate] = useState();

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
      title: "DEFAULT",
      cost: 50,
      id: 654321,
      type: "positive",
      maxIterations: 2,
      iterations: 0,
      duration: 30,
    },
  ]);

  function SaveData() {
    if (score !== -999) {
      fetch(
        "https://imapp-cfdd0-default-rtdb.europe-west1.firebasedatabase.app/Data.json",
        {
          method: "PUT",
          body: JSON.stringify([
            {
              "Current-Score": parseInt(score),
              "Tendency-List": tendencyList,
              "Last-Date": lastDate,
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
    var newDate = parseInt(new Date().getDate());
    fetch(
      "https://imapp-cfdd0-default-rtdb.europe-west1.firebasedatabase.app/Data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setScore(data[0]["Current-Score"]);
        setTendencyList(data[0]["Tendency-List"]);
        setLastDate(parseInt(data[0]["Last-Date"]));
      });
  }, []);

  useEffect(() => {
    if (lastDate) {
      var newDate = parseInt(new Date().getDate());

      if (newDate != lastDate) {
        var newTendencyList = tendencyList;
        //reset iterations
        newTendencyList.map((tendency) => {
          tendency.iterations = 0;
        });

        setTendencyList(newTendencyList);
        setLastDate(newDate);
      }
    }
  }, [lastDate]);

  useEffect(() => {
    SaveData();
  }, [score, tendencyList, lastDate]);

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
          tendencyList={tendencyList}
          setTendencyList={setTendencyList}
        />

        <TendencyModal
          tendencyList={tendencyList}
          setTendencyList={setTendencyList}
          tendencyModalState={tendencyModalState}
          setTendencyModalState={setTendencyModalState}
          currentTendencyView={currentTendencyView}
        />

        <TendencyContainer
          score={score}
          setScore={setScore}
          tendencyList={tendencyList}
          setTendencyList={setTendencyList}
          setTendencyModalState={setTendencyModalState}
          currentTendencyView={currentTendencyView}
          entering={entering}
        />

        <SwitchTendencyButton
          currentTendencyView={currentTendencyView}
          setCurrentTendencyView={setCurrentTendencyView}
          setEntering={setEntering}
        />
      </div>
    </div>
  );
}

export default Home;
