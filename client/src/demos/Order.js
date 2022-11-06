import React, { useContext, useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/hero/BackgroundAsImageWithCenteredContent.js";

import Orders from "components/features/Orders.js";


import tw from "twin.macro";

import Footer from "components/footers/MiniCenteredFooter.js";
import { AuthContext } from "../Context/AuthContext";
const Subheading = tw.span`uppercase tracking-wider text-sm`;

export default (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);  

  const agentID = props.location.search.slice(1);
console.log(agentID)

  // console.log(props.location.search.slice(1));
  // console.log(event);
  const adminLP = () => {
    return (
      <>
        <AnimationRevealPage>
          <Hero getstarted="#bookaslot" />
         
          <div id="orders">
            <Orders AID={agentID}/>
          </div>
        </AnimationRevealPage>
        <Footer />
      </>
    );
  };
  const page = () => {
    if (isAuthenticated && isAdmin) return adminLP();
  };
  return <>{page()}</>;
};
