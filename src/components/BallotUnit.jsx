import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import beepSound from "../assets/beep.mp3";
import ladderSymbol from "../assets/symbol.png";
import handsymbol from "../assets/hand.png";

// --- DATA ---
const POLL_DATA = {
  ward: {
    label: "Ward",
    candidates: [
      {
        id: 1,
        name: "ഫിറോസ് ഖാൻ കരിമ്പിൽ ",
        symbol: ladderSymbol,
        sub: "POOLAMANNA - WARD 12",
      },
      { id: 2, name: "", symbol: null },
      { id: 3, name: "", symbol: null },
      { id: 4, name: "", symbol: null },
      { id: 5, name: "", symbol: null },
      { id: 6, name: "", symbol: null },
      { id: 7, name: "", symbol: null },
      { id: 8, name: "", symbol: null },
      { id: 9, name: "", symbol: null },
      { id: 10, name: "", symbol: null },
    ],
  },
  block: {
    label: "Block",
    candidates: [
      { id: 1, name: "", symbol: null },
      {
        id: 2,
        name: "സഫീർ ജാൻ ",
        symbol: handsymbol,
        sub: "വണ്ടൂർ ബ്ലോക്ക് പഞ്ചായത്ത് പാണ്ടിക്കാട് ഡിവിഷൻ ",
      },
      // ... fill up to 10
      { id: 3, name: "", symbol: null },
      { id: 4, name: "", symbol: null },
      { id: 5, name: "", symbol: null },
      { id: 6, name: "", symbol: null },
      { id: 7, name: "", symbol: null },
      { id: 8, name: "", symbol: null },
      { id: 9, name: "", symbol: null },
      { id: 10, name: "", symbol: null },
    ],
  },
  district: {
    label: "District",
    candidates: [
      { id: 1, name: "", symbol: null },
      // ... fill up to 10
      { id: 2, name: "", symbol: null },
      {
        id: 3,
        name: "ഷാഹിന നിയാസി ",
        symbol: ladderSymbol,
        sub: "മലപ്പുറം ജില്ലാ പഞ്ചായത്ത് ആനക്കായം ഡിവിഷൻ ",
      },
      { id: 4, name: "", symbol: null },
      { id: 4, name: "", symbol: null },
      { id: 4, name: "", symbol: null },
      { id: 5, name: "", symbol: null },
      { id: 6, name: "", symbol: null },
      { id: 7, name: "", symbol: null },
      { id: 8, name: "", symbol: null },
      { id: 9, name: "", symbol: null },
      { id: 10, name: "", symbol: null },
    ],
  },
};

const BallotUnit = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ward");
  const [activeLed, setActiveLed] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [isReady, setIsReady] = useState(true);

  const handleTabChange = (tabKey) => {
    if (isVoting) return;
    setActiveTab(tabKey);
    setActiveLed(null);
    setIsReady(true);
  };

  const handleVote = (candidate) => {
    if (isVoting) return;

    // 1. Lock Machine
    setIsVoting(true);
    setIsReady(false);

    // 2. Play Sound
    const audio = new Audio(beepSound);
    audio.play().catch((e) => console.error(e));

    // 3. LED On
    setActiveLed(candidate.id);

    // 4. Wait 2 seconds, then go to SUCCESS page
    setTimeout(() => {
      navigate("/success", {
        state: {
          candidate: candidate,
          section: POLL_DATA[activeTab].label,
        },
      });
    }, 2000);
  };

  const currentData = POLL_DATA[activeTab];

  return (
    <div className="container">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab-pill tab-grey ${
            activeTab === "ward" ? "active" : ""
          }`}
          onClick={() => handleTabChange("ward")}
        >
          Ward
        </button>
        <button
          className={`tab-pill tab-pink ${
            activeTab === "block" ? "active" : ""
          }`}
          onClick={() => handleTabChange("block")}
        >
          Block
        </button>
        <button
          className={`tab-pill tab-blue ${
            activeTab === "district" ? "active" : ""
          }`}
          onClick={() => handleTabChange("district")}
        >
          District
        </button>
      </div>

      {/* EVM */}
      <div className="ballot-box">
        <div className="status-bar">
          <div>
            Ready{" "}
            <span className={`ready-light ${isReady ? "on" : "off"}`}></span>
          </div>
          <span>Ballot Unit 1</span>
        </div>

        <div className="candidates-list">
          {currentData.candidates.map((c) => (
            <div key={c.id} className="candidate-row">
              <div className="serial-no">{c.id}</div>
              <div className="candidate-info">
                <span className="c-name">{c.name}</span>
                {c.symbol && (
                  <img src={c.symbol} alt="s" style={{ height: "40px" }} />
                )}
              </div>
              <div className="control-panel">
                <div className={`led ${activeLed === c.id ? "on" : ""}`}></div>
                <button
                  className="vote-btn"
                  onClick={() => handleVote(c)}
                  disabled={isVoting}
                ></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BallotUnit;
