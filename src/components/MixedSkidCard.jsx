import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Paper from "@mui/material/Paper";
import { FaArrowDown } from "react-icons/fa";
import { MixedSkidItem } from "./MixedSkidItem";

const MixedSkidCard = ({ item, quantity, onQuantityChange, onAddToOrder }) => {
  return (
    <div>
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
        <Accordion>
          <AccordionSummary
            expandIcon={<FaArrowDown />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Items</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid grid-cols-7 gap-4 items-center px-4 max-sm:hidden">
              <Typography variant="body2" className="font-medium">
                QTY
              </Typography>
              <Typography variant="body2" className="font-medium">
                SKU
              </Typography>
              <Typography variant="body2" className=" sm:col-span-2">
                DESCRIPTION
              </Typography>
              <Typography variant="body2">MFG</Typography>
              <Typography variant="body2" className="text-right">
                Price
              </Typography>
              <Typography variant="body2" className="text-right text-green-600">
                Savings
              </Typography>
            </div>
            {item.items.map((skidItem) => (
              <MixedSkidItem key={skidItem.hhSKU} skidItem={skidItem} />
            ))}
          </AccordionDetails>
        </Accordion>
      </Card>
    </div>
  );
};

export default MixedSkidCard;
