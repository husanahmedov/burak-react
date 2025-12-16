import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { Order, OrderUpdateInput } from "../../libs/types/order";
import { setPausedOrders } from "./slice";
import { retrievePausedOrders } from "./selector";
import { Product } from "../../libs/types/products";
import { Messages, serverApi } from "../../libs/config";
import { sweetErrorHandling } from "../../libs/sweetAlert";
import { T } from "../../libs/types/common";
import { OrderStatus } from "../../libs/types/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";

const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
});
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  (pausedOrders) => ({
    pausedOrders,
  })
);
interface PausedOrdersProps {
  setValue: (input: string) => void;
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props;
  const { authMember, setOrderBuilder } = useGlobals();
  const { pausedOrders } = useSelector(pausedOrdersRetriever);

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      };
      const confirm = window.confirm("Are You Sure?");
      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      };
      const confirm = window.confirm("Are You Sure to make a payment?");
      if (confirm) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("2");
        setOrderBuilder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order.orderItems.map((item) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${
                    product.productImages ? product.productImages[0] : ""
                  }`;
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img src={imagePath} className={"order-dish-img"} />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p> $ {item.itemPrice}</p>
                        <img src={"/icons/close.svg"} />
                        <p>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              <Box className="total-price-box">
                <Box className="box-total">
                  <Box className={"box-total"}>
                    <p>Product price</p>
                    <p>$ {order.orderTotal - order.orderDelivery}</p>
                    <img
                      src={"/icons/plus.svg"}
                      style={{ marginLeft: "20px" }}
                    />
                    <p>Delivery cost</p>
                    <p>$ {order.orderDelivery}</p>
                    <img
                      src={"/icons/pause.svg"}
                      style={{ marginLeft: "20px" }}
                    />
                    <p>Total</p>
                    <p>${order.orderTotal}</p>
                  </Box>
                  <Button
                    value={order._id}
                    variant="contained"
                    color="secondary"
                    className={"cancel-button"}
                    onClick={deleteOrderHandler}
                  >
                    Cancel
                  </Button>

                  <Button
                    value={order._id}
                    variant="contained"
                    className={"pay-button"}
                    onClick={processOrderHandler}
                  >
                    Payment
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!pausedOrders ||
          (pausedOrders.length === 0 && (
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              className="no-orders-box"
            >
              <img
                className="no-orders-box img "
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}
