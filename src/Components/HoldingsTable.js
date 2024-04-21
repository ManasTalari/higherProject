import React, { useState, useEffect } from "react";
import axios from "axios";
import HoldingRow from "./HoldingRow";

const HoldingsTable = () => {
  const [holdings, setHoldings] = useState([]);
  const [assetClasses, setAssetClasses] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  useEffect(() => {
    axios
      .get("https://canopy-frontend-task.now.sh/api/holdings")
      .then((response) => {
        const holdingsData = response.data.payload;
        setHoldings(holdingsData);

        // Extract unique asset classes
        const uniqueAssetClasses = Array.from(
          new Set(holdingsData.map((holding) => holding.asset_class))
        );
        setAssetClasses(uniqueAssetClasses);

        // Initialize expandedGroups state
        const initialExpandedGroups = {};
        uniqueAssetClasses.forEach((assetClass) => {
          initialExpandedGroups[assetClass] = false;
        });
        setExpandedGroups(initialExpandedGroups);
        console.log(initialExpandedGroups);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const toggleGroup = (assetClass) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [assetClass]: !prevState[assetClass],
    }));
  };

  return (
    <div>
      {assetClasses.map((assetClass) => (
        <div key={assetClass}>
          <h2
            onClick={() => toggleGroup(assetClass)}
            style={{ cursor: "pointer" }}
          >
            {assetClass} {expandedGroups[assetClass] ? "[-]" : "[+]"}
          </h2>
          {expandedGroups[assetClass] && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Ticker</th>
                  <th>Average Price</th>
                  <th>Market Price</th>
                  <th>Latest Change (%)</th>
                  <th>Market Value (Base CCY)</th>
                </tr>
              </thead>
              <tbody>
                {holdings
                  .filter((holding) => holding.asset_class === assetClass)
                  .map((holding) => (
                    <HoldingRow key={holding.name} holding={holding} />
                  ))}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
};

export default HoldingsTable;
