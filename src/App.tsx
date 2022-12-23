import { createContext, useState } from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";

import Bid from "./types/Bid";
import Tabs from "./types/Tabs";

import styles from "./App.module.scss";
import classNames from "classnames";
import Trading from "./pages/Trading";
import Archive from "./pages/Archive";

type contextType = {
  bids: Bid[];
  setBids: React.Dispatch<React.SetStateAction<Bid[]>>;
};
export const BidsContext = createContext<contextType>({
  bids: [],
  setBids: () => {},
});

const Provider = BidsContext.Provider;

function App() {
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(
    location.pathname.slice(1) || Tabs.trading
  );

  const bidsFromSession = sessionStorage.getItem("Bids");
  const [bids, setBids] = useState<Bid[]>(
    bidsFromSession ? JSON.parse(bidsFromSession) : []
  );

  return (
    <Provider value={{ bids, setBids }}>
      <div className={styles.App}>
        <div className={styles.TabsPanel}>
          {Object.values(Tabs).map((tab) => (
            <Link to={"/" + tab} key={tab}>
              <button
                className={classNames(
                  styles.TabsPanel__Tab,
                  tab === currentTab && styles["TabsPanel__Tab-active"]
                )}
                onClick={() => {
                  setCurrentTab(tab);
                }}
              >
                {tab}
              </button>
            </Link>
          ))}
        </div>
        <div className={styles.Content}>
          <Routes>
            <Route path={"/" + Tabs.trading} element={<Trading />} />
            <Route path={"/" + Tabs.archive} element={<Archive />} />
            <Route
              path="*"
              element={<Navigate to={"/" + Tabs.trading} replace />}
            />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
