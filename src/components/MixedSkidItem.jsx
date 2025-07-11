import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

export const MixedSkidItem = ({ skidItem }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-4 items-center max-sm:grid-cols-1 border-b border-gray-200 pb-4">
        <Typography variant="body2" className="font-medium">
          <span className="sm:hidden font-semibold">Qty: </span>
          {skidItem.qty}
        </Typography>
        <Typography variant="body2" className="font-medium">
          <span className="sm:hidden font-semibold">SKU: </span>
          {skidItem.hhSKU}
        </Typography>
        <Typography variant="body2" className="sm:col-span-2">
          <span className="sm:hidden font-semibold">Description: </span>
          {skidItem.description}
        </Typography>
        <Typography variant="body2">
          <span className="sm:hidden font-semibold">MFG: </span>
          {skidItem.mfgCode}
        </Typography>
        <Typography variant="body2" className="text-right">
          <span className="sm:hidden font-semibold">Beautitone price: </span>$
          {skidItem.beautitonePrice.toFixed(2)}
        </Typography>
        <Typography variant="body2" className="text-right text-green-600">
          <span className="sm:hidden font-semibold">Savings: </span>$
          {skidItem.savings.toFixed(2)}
        </Typography>
      </div>
    </div>
  );
};
