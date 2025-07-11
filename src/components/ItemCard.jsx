import React from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const ItemCard = ({ item, quantity, onQuantityChange, onAddToOrder }) => {
  return (
    <Card className="mb-4">
      <CardContent className="flex">
        <div className="flex-1">
          <Typography variant="h6">{item.description}</Typography>
          <Typography variant="body2">SKU: {item.hhSKU}</Typography>
          <Typography variant="body2">MFG Code: {item.mfgCode}</Typography>
          {/* <Typography variant="body2">Category: {item.category}</Typography> */}
          <Typography variant="body2">
            Price: ${item.beautitonePrice.toFixed(2)}
          </Typography>
          <Typography variant="body2">
            Savings: ${item.savings.toFixed(2)}
          </Typography>
        </div>
        <div className="flex flex-col items-end justify-between ml-4">
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            inputProps={{ min: 0 }}
            className="mt-2"
            size="small"
            style={{ width: 80 }}
          />
          <Button
            variant="contained"
            color="primary"
            className="mt-2"
            onClick={() => onAddToOrder(item, quantity)}
            disabled={quantity <= 0}
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
