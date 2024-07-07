function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/challenge" Component={ChallengePage} />
            <Route exact path="/local/:type" Component={Local} />
            <Route exact path="/global/:type" Component={Global} />
            <Route exact path="/local/:type" Component={Local} />
            <Route exact path="/local/choose/" Component={LocalChoose} />
            <Route exact path="/global/choose/" Component={ChallengeChoose} />
            <Route exact path="/challengegame/puzzle" Component={Puzzle} />
            <Route
              exact
              path="/challengegame/:location/:type/:city"
              Component={ChallengeGame}
            />
            <Route exact path="/User/:user" Component={ChallengeProfile} />
            <Route
              exact
              path="/achievementsandrewards"
              Component={AchievemntsRewards}
            />
          </Routes>
        </Router>
      </div>
    </>
  );
}
