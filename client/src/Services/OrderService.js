export default {
  getOrders: (SEID) => {
    return fetch("/order/orders", {
      method: "post",
      body: JSON.stringify({SEID: SEID}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  postOrder: (order) => {
    return fetch("/order/addorder", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
  delOrder: (order) => {
    return fetch("/order/delorder", {
      method: "post",
      body: JSON.stringify(order),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status !== 401) {
        return response.json().then((data) => data);
      } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    });
  },
};
