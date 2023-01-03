import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

import ImappLogo from "/components/ImappLogo";
import ScoreCounter from "/components/ScoreCounter";
import TendencyContainer from "../components/TendencyContainer";
import TendencyModal from "/components/TendencyModal";
import UpdateScoreModal from "/components/UpdateScoreModal";
import SwitchTendencyButton from "/components/SwitchTendencyButton";
import SortingMethod from "/components/SortingMethod";
import FilterMethod from "/components/FilterMethod";
import SideMenu from "../components/SideMenu";

function Home({ currentUser }) {
  const [currentTendencyView, setCurrentTendencyView] = useState("positive");
  const [score, setScore] = useState(-999);
  const [entering, setEntering] = useState(false);
  const [lastDate, setLastDate] = useState();

  const [currentSortingMethod, setCurrentSortingMethod] = useState("name");
  const sortingMethodList = ["name", "cost", "duration"];

  const [currentPositiveFilterMethod, setCurrentPositiveFilterMethod] =
    useState("all");
  const [currentNegativeFilterMethod, setCurrentNegativeFilterMethod] =
    useState("all");
  const positiveFilterList = ["all", "home", "diet", "body", "work", "brain"];
  const negativeFilterList = ["all", "lazy", "eating", "fun"];

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

  const [sideMenuState, setSideMenuState] = useState("hidden");

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
        <Image
          alt="open menu"
          src="menu-open.svg"
          width={40}
          height={40}
          onClick={() => setSideMenuState("visible")}
        />
      </div>

      <SideMenu
        sideMenuState={sideMenuState}
        setSideMenuState={setSideMenuState}
        currentUser={currentUser}
      />

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
          positiveFilterList={positiveFilterList}
          negativeFilterList={negativeFilterList}
        />

        <div className="u-m-b-sm">
          <SortingMethod
            currentSortingMethod={currentSortingMethod}
            setCurrentSortingMethod={setCurrentSortingMethod}
            sortingMethodList={sortingMethodList}
          />

          <FilterMethod
            currentPositiveFilterMethod={currentPositiveFilterMethod}
            setCurrentPositiveFilterMethod={setCurrentPositiveFilterMethod}
            currentNegativeFilterMethod={currentNegativeFilterMethod}
            setCurrentNegativeFilterMethod={setCurrentNegativeFilterMethod}
            positiveFilterList={positiveFilterList}
            negativeFilterList={negativeFilterList}
            currentTendencyView={currentTendencyView}
          />
        </div>

        <TendencyContainer
          score={score}
          setScore={setScore}
          tendencyList={tendencyList}
          setTendencyList={setTendencyList}
          setTendencyModalState={setTendencyModalState}
          currentTendencyView={currentTendencyView}
          entering={entering}
          currentSortingMethod={currentSortingMethod}
          currentNegativeFilterMethod={currentNegativeFilterMethod}
          currentPositiveFilterMethod={currentPositiveFilterMethod}
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
