import React from "react";

const HoldingRow = ({ holding }) => {
  return (
    <tr>
      <td>{holding.name}</td>
      <td>{holding.ticker}</td>
      <td>{holding.asset_class}</td>
      <td>{holding.avg_price}</td>
      <td>{holding.market_price}</td>
      <td>{holding.latest_chg_pct}</td>
      <td>{holding.market_value_ccy}</td>
    </tr>
  );
};

export default HoldingRow;
