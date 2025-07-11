import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { dataPaintGallonsInterior } from "../../data";
import ItemCard from "../components/ItemCard";
import Cart from "../components/Cart";
import FilterBar from "../components/FilterBar";
import Fab from "@mui/material/Fab";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MixedSkidCard from "../components/MixedSkidCard";
import { mixedSkidData } from "../../data";
import { FaLongArrowAltLeft } from "react-icons/fa";

// import NavigationIcon from "@mui/icons-material/Navigation";

const paintReps = ["Rep 1", "Rep 2", "Rep 3", "Rep 4"];

const DirectBuy = () => {
  const { handleSubmit, control, reset } = useForm();
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [productType, setProductType] = useState("");
  const [skuSearch, setSkuSearch] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [cartOpen, setCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  // Get unique categories from data
  const categories = Array.from(
    new Set(dataPaintGallonsInterior.map((item) => item.category))
  );

  // Filter products
  const filteredProducts = dataPaintGallonsInterior.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (onlyDiscount && item.discount <= 0) return false;
    if (
      skuSearch &&
      !item.hhSKU.toLowerCase().includes(skuSearch.toLowerCase())
    )
      return false;
    if (productType === "individual") return true;
    if (productType === "mixed") return false;
    return true;
  });

  const filteredMixedProducts = mixedSkidData.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (onlyDiscount && item.discount <= 0) return false;
    if (
      skuSearch &&
      !item.hhSKU.toLowerCase().includes(skuSearch.toLowerCase())
    )
      return false;
    if (productType === "individual") return false;
    if (productType === "mixed") return true;
    return true;
  });

  const handleQuantityChange = (sku, qty) => {
    setQuantities((prev) => ({ ...prev, [sku]: qty }));
  };

  const handleAddToOrder = (item, qty) => {
    if (qty > 0) {
      setCart((prev) => {
        const existing = prev.find((i) => i.hhSKU === item.hhSKU);
        if (existing) {
          return prev.map((i) =>
            i.hhSKU === item.hhSKU ? { ...i, quantity: i.quantity + qty } : i
          );
        }
        return [...prev, { ...item, quantity: qty }];
      });
      setQuantities((prev) => ({ ...prev, [item.hhSKU]: 0 }));
    }
  };

  const handleRemoveFromCart = (sku) => {
    setCart((prev) => prev.filter((item) => item.hhSKU !== sku));
  };

  const onSubmit = (data) => {
    console.log("FormData:", data);
    console.log("Cart:", cart);
    // If you want to send the email, uncomment the following lines:
    // emailjs
    //   .send("service_374x8ut", "template_d7mlxg6", data, "d46XF3XPnciMC9yX1")
    //   .then(
    //     () => {
    //       alert("Email sent!");
    //     },
    //     () => {
    //       alert("Failed to send email.");
    //     }
    //   );
  };

  // console.log(mixedSkidData);

  return (
    <div className="max-w-7xl w-full mx-auto">
      <h1>Direct Buy Order Form</h1>
      <h2>Attention: Paint Department</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 mt-10 mb-10">
          {!showCheckout && (
            <>
              <FilterBar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                onlyDiscount={onlyDiscount}
                onDiscountChange={setOnlyDiscount}
                productType={productType}
                onTypeChange={setProductType}
                skuSearch={skuSearch}
                onSkuSearchChange={setSkuSearch}
              />

              {filteredMixedProducts.map((item) => {
                return (
                  <MixedSkidCard
                    item={item}
                    quantity={quantities[item.hhSKU] || 0}
                    onQuantityChange={(qty) =>
                      handleQuantityChange(item.hhSKU, qty)
                    }
                    onAddToOrder={handleAddToOrder}
                  />
                );
              })}
              {filteredProducts.map((item) => (
                <ItemCard
                  key={item.hhSKU}
                  item={item}
                  quantity={quantities[item.hhSKU] || 0}
                  onQuantityChange={(qty) =>
                    handleQuantityChange(item.hhSKU, qty)
                  }
                  onAddToOrder={handleAddToOrder}
                />
              ))}
            </>
          )}
        </div>
        {/* Sticky cart sidebar for desktop */}
        {!isMobile && (
          <div className="w-full md:w-96 md:sticky md:top-8 h-fit">
            {!showCheckout && (
              <Cart items={cart} onRemoveItem={handleRemoveFromCart} />
            )}
            {!showCheckout && cart.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                className="mt-4 w-full"
                onClick={() => setShowCheckout(true)}
              >
                Proceed to checkout
              </Button>
            )}
          </div>
        )}
      </div>
      {/* Show form only after Place Order is clicked */}
      {showCheckout && (
        <>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            className="col-span-2 mb-2 sm:w-1/4 w-1/2"
            onClick={() => setShowCheckout(false)}
          >
            Back
          </Button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 mb-10"
          >
            <Controller
              name="store"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Store"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="storePO"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Store PO"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="area"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Area"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="fax"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Fax"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="contact"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contact"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="deliveryNotes"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Delivery notes"
                  variant="outlined"
                  fullWidth
                  className="col-span-1 sm:col-span-2"
                />
              )}
            />
            <FormControl fullWidth>
              <InputLabel id="paint-rep-label">Paint rep</InputLabel>
              <Controller
                name="paintRep"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="paint-rep-label"
                    label="Paint rep"
                  >
                    {paintReps.map((rep) => (
                      <MenuItem key={rep} value={rep}>
                        {rep}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <div className="w-full mb-8 col-span-1 sm:col-span-2">
              <Cart items={cart} onRemoveItem={handleRemoveFromCart} />
            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="col-span-1 sm:col-span-2"
            >
              Place Order
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              className="col-span-1 sm:col-span-2"
              onClick={() => reset()}
            >
              Reset Form
            </Button>
          </form>
          {/* Full width cart at checkout */}
        </>
      )}
      {/* Floating cart button and drawer for mobile */}
      {isMobile && !showCheckout && (
        <>
          <Box sx={{ "& > :not(style)": { m: 1 } }}>
            <Fab
              variant="extended"
              color="primary"
              sx={{
                position: "fixed",
                bottom: 16,
                right: 16,
                zIndex: 1000,
                width: "90%",
              }}
              onClick={() => setCartOpen(true)}
            >
              View Cart
            </Fab>
          </Box>
          <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
          >
            <div style={{ width: 320, maxWidth: "100vw", padding: 10 }}>
              <Cart items={cart} onRemoveItem={handleRemoveFromCart} />
              {!showCheckout && cart.length > 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  className="mt-4 w-full"
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to checkout
                </Button>
              )}
            </div>
          </Drawer>
        </>
      )}
    </div>
  );
};

export default DirectBuy;
