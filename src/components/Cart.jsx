import Button from "@mui/material/Button";
import React from "react";

const Cart = ({ items, onRemoveItem }) => {
  const total = items.reduce(
    (sum, item) => sum + item.beautitonePrice * item.quantity,
    0
  );
  return (
    <div className="mt-8 p-4 border rounded bg-white min-w-[280px] max-w-full">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li
              key={item.hhSKU}
              className="flex justify-between items-center mb-2"
            >
              <span>
                {item.description} (x{item.quantity})
              </span>
              <span className="flex items-center gap-2">
                <span>
                  ${(item.beautitonePrice * item.quantity).toFixed(2)}
                </span>
                <Button onClick={() => onRemoveItem(item.hhSKU)} type="button">
                  Remove
                </Button>
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="font-bold mt-4">Total: ${total.toFixed(2)}</div>
    </div>
  );
};

export default Cart;
