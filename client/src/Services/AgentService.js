export default {
    getAgents: () => {
      return fetch("/agent/agents").then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized", msgError: true } };
      });
    },
    // postEvent: (event) => {
    //   console.log("doing1",event);
    //   return fetch("/event/addevent", {
    //     method: "post",
    //     body: JSON.stringify(event),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((response) => {
    //     if (response.status !== 401) {
    //       return response.json().then((data) => data);
    //     } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    //   });
    // },
    // getEventByID: (id) => {
    //   return fetch("/event/geteventbyid", {
    //     method: "post",
    //     body: JSON.stringify({_id: id}),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((response) => {
    //     if (response.status !== 401) {
    //       return response.json().then((data) => data);
    //     } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    //   });
    // }, 
    editAgent: (agent, AID) => {
      console.log("helo")
      return fetch("/agent/editagent", {
        method: "post",
        body: JSON.stringify({AID: AID, agent: agent}),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status !== 401) {
          return response.json().then((data) => data);
        } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
      });
    }, 
    getAgentByID: (AID) => {
        return fetch("/agent/getagentbyid", {
          method: "post",
          body: JSON.stringify({_id: AID}),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          if (response.status !== 401) {
            return response.json().then((data) => data);
          } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
        });
      },
    // delEvent: (event) => {
    //   return fetch("/event/delevent", {
    //     method: "post",
    //     body: JSON.stringify(event),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }).then((response) => {
    //     if (response.status !== 401) {
    //       return response.json().then((data) => data);
    //     } else return { message: { msgBody: "UnAuthorized" }, msgError: true };
    //   });
    // },
  };
  