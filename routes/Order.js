const express = require("express");
const orderRouter = express.Router();

const Order = require("../models/Order");

orderRouter.post("/addorder", (req, res) => {
  console.log("hello1");
  const { dname,quantity,location,name,no,SEID,AID,status,email } = req.body;

  const newOrder = new Order({
    dname,
    quantity,
    location,
    name,
    no,
    SEID,
    AID,
    status,
    email
  });
  newOrder.save((err) => {
    if (err) {
      console.log(err);

      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    } else
      res.status(201).json({
        order:newOrder,
        message: {
          msgBody: "Order successfully added",
          msgError: false,
        },
      });
  });
});

orderRouter.post("/delorder", (req, res) => {
 Order.findByIdAndRemove(req.body._id, (err) => {
    if (err) {
      console.log("order failed to delete");
      res.status(500).json({
        message: { msgBody: "order failed to delete", msgError: true },
      });
    } else {
      console.log("order deleted successfully");
    }
  });
});
orderRouter.post("/editorder", (req, res) => {
  console.log(req.body.order)
  Order.findByIdAndUpdate(req.body.OID, req.body.order, (err) => {
    if (err) {
      console.log("Order failed to update");
      res.status(500).json({
        message: { msgBody: "Order failed to update", msgError: true },
      });
    } else {
      console.log("Order updated successfully");
    }
  });
});

orderRouter.post("/orders", (req, res) => {
  console.log("Fetching Orders", req.body.SEID);
  Order.find().exec((err, document) => {
    if (err) {
      console.log("Orders failed to fetch");
      res.status(500).json({
        message: { msgBody: "Orders failed to fetch", msgError: true },
      });
    } else {
      console.log("Orders fetched successfully");
      var ord = [];
      for (const doc of document) {
        if (doc.SEID === req.body.SEID) {
          ord.push(doc);
        } 
      }
      res.status(200).json({ orders: ord });
    }
  });
});
orderRouter.get("/allorders", (req, res) => {
  Order.find().exec((err, document) => {
    if (err) {
      console.log("Orders failed to fetch");
      res.status(500).json({
        message: { msgBody: "Orders failed to fetch", msgError: true },
      });
    } else {
      console.log("Orders fetched successfully",document);
      res.status(200).json({ orders: document });
    }
  });
});

orderRouter.post("/getorderbyid", (req, res) => {
  console.log("Fetching order");
  Order.findById(req.body._id).exec((err, document) => {
    if (err) {
      console.log("Order failed to fetch");
      res.status(500).json({
        message: { msgBody: "Order failed to fetch", msgError: true },
      });
    } else {
      console.log("Order fetched successfully");
      res.status(200).json({ order: document });
    }
  });
});
orderRouter.post("/ordersbyAID", (req, res) => {
  console.log("Fetching Orders", req.body.AID);
  Order.find().exec((err, document) => {
    if (err) {
      console.log("Orders failed to fetch");
      res.status(500).json({
        message: { msgBody: "Orders failed to fetch", msgError: true },
      });
    } else {
      console.log("Orders fetched successfully",orders);
      var ord = [];
      for (const doc of document) {
        if (doc.AID === req.body.AID) {
          ord.push(doc);
        } 
      }
      res.status(200).json({ orders: ord });
    }
  });
});
module.exports = orderRouter;
