import React, { useState, useRef, useEffect, useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import {
  SectionHeading,
  Subheading as SubheadingBase,
} from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import OrderService from "../../Services/OrderService";
import AgentService from "../../Services/AgentService";
import EventService from "../../Services/EventService";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/log-in.svg";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import Logopdf from "../../images/icons8-financial-64.png";
import { AuthContext } from "../../Context/AuthContext";

const logocss = tw`w-8 h-8`;

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;

const Description = tw(SectionDescription)`items-center w-full text-center`;

const Column = tw.div`flex flex-col items-center -mt-32`;
const HeaderContent = tw.div``;

const Form = tw.form`mx-auto max-w-3xl`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-600 placeholder-gray-600 text-sm focus:outline-none focus:border-gray-500 focus:bg-white mt-5 focus:placeholder-gray-500 first:mt-0`;

const SubmitButton = styled.button`
  ${tw`mt-5 px-5 tracking-wide font-semibold bg-primary-600 text-gray-100 w-2/6 py-3 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const NewPrimaryButton = tw(
  PrimaryButtonBase
)`bg-transparent hover:bg-red-600 text-red-600 font-semibold hover:text-white py-1 px-3 border-2 border-red-600 hover:border-transparent rounded`;

const FAQSContainer = tw.dl`mt-12 max-w-4xl w-full relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`mx-6 text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`text-sm sm:text-base leading-relaxed`);
const MyStyledParagraph = tw.span`mx-6 text-lg lg:text-lg font-semibold`;
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const AddOrders = ({
  subheading = "CapiBull",
  heading = "Orders ",
  description = "Here are some orders.",
  primaryButtonText = "Learn More",
  primaryButtonUrl = "https://timerse.com",
  SEID = "",
}) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const [order, setOrder] = useState({
    dname: "",
    quantity: "",
    location: "",
    name: "",
    no: "",
    SEID: SEID,
    AID: "",
    status: "Pending",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setOrder({
      dname: "",
      quantity: "",
      location: "",
      name: "",
      no: "",
      SEID: "",
      AID: "",
      status: "",
    });
  };

  const [details, setDetails] = useState({
    orders: [],
    agents: [],
    // agent: null
  });
  const [agent, setAgent] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    AgentService.getAgents().then((data1) => {
      EventService.getEventByID(SEID).then((data2) => {
        let event = data2.event;
        let agent1;
        let mn = Number.MAX_VALUE;
        for (const a of data1.agents) {
          if (a.status == "free") {
            if (Math.abs(a.sector - event.sector) < mn) {
              mn = Math.abs(a.sector - event.sector);
              agent1 = a
            }
          }
        }
        let order1 = order;
        order1.AID = agent1._id;
        OrderService.postOrder(order1).then((data3) => {
          let newAgent = agent1;
          newAgent.status = "busy";
          AgentService.editAgent(newAgent, agent1._id).then((data4) => {
            const { message } = data4;
            setMessage(message);
            if (!message.msgError) {
              timerID = setTimeout(() => {
              }, 2000);
            }
          });
        });
      });
    });
  };
  const inputRef = useRef();
  useEffect(() => {
    OrderService.getOrders(SEID).then((data) => {
      let ags = [];
      let ords = [];
      for (const ord of data.orders) {
        AgentService.getAgentByID(ord.AID).then((data1) => {
          ords.push(ord);
          ags.push(data1.agent);
          console.log("ags",ags)
          console.log("ords", ords)
          setDetails({ orders: [...details.orders, ...ords], agents: [...details.agents, ...ags] })
        });
      }
    });

  }, [inputRef]);

  console.log("details", details.agents, details.orders)
  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  const deleteOrder = (order) => {
    const tmpOrders = [...details.orders];
    OrderService.delOrder(order).then((data) => {
      const { message } = data;
      setMessage(message);
    });
  };
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    // <AnimationRevealPage>
    <Container tw="m-8">
      <ContentWithPaddingXl>
        <Column>
          <>
            <HeaderContent>
              {/* <Subheading>CapiBull</Subheading> */}
              <Heading>Submit order Details</Heading>
              <p align="center">
                <Description>
                  Add dish name, quantity, delivery location, contact name and contact no.
                </Description>
              </p>
            </HeaderContent>
            <br />
            <br />
            <br />
            <Form onSubmit={onSubmit}>
              <Input
                type="text"
                name="dname"
                value={order.dname}
                onChange={onChange}
                placeholder="Dish Name"
                required
              />
              <Input
                type="number"
                name="quantity"
                value={order.quantity}
                onChange={onChange}
                placeholder="Quantity"
                required
              />
              <Input
                type="number"
                name="location"
                value={order.location}
                onChange={onChange}
                placeholder="Delivery Location: Sector"
                required
              />
              <Input
                type="text"
                name="name"
                value={order.name}
                onChange={onChange}
                placeholder="Contact Name"
                required
              />
              <Input
                type="tel"
                name="no"
                value={order.no}
                onChange={onChange}
                placeholder="Contact Number"
                required
              />

              <p align="right">
                <SubmitButton type="submit">
                  <SignUpIcon className="icon" />
                  <span className="text">Submit</span>
                </SubmitButton>
              </p>
            </Form>
          </>
          <HeaderContent>
            <br></br>
            <br></br>
            <Heading>Orders - Details</Heading>

          </HeaderContent>
          <FAQSContainer>
            {details.orders.map((order, index) => (
              <FAQ>
                <Question
                  key={index}
                  onClick={() => {
                    toggleQuestion(index);
                  }}
                  className="group"
                >
                  <img src={Logopdf} alt="logo" css={logocss} />
                  <QuestionText>Status: {order.status}&nbsp; &nbsp; &nbsp;Ordered Dish: {order.dname}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 },
                    }}
                    initial="collapsed"
                    animate={
                      activeQuestionIndex === index ? "open" : "collapsed"
                    }
                    transition={{
                      duration: 0.02,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{
                    duration: 0.3,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                >
                  <p
                    key={index}
                    onClick={() => {
                      toggleQuestion(index);
                    }}
                    className="group"
                  >
                    Contact Name: {order.name}
                    <br />
                    Contact Number: {order.no}
                    <br />
                    Quantity of dish: {order.quantity}
                    <br />
                    Location: Sector- {order.location}
                  </p>
                  <br></br>
                  <MyStyledParagraph>Assigned Delivery Agent Details </MyStyledParagraph>
                  <br></br>
                  <br></br>
                  <p
                    key={index}
                    onClick={() => {
                      toggleQuestion(index);
                    }}
                    className="group"
                  >
                    Agent Name: {details.agents[index].name}
                    <br />
                    Agent Email: {details.agents[index].email}
                    <br />
                    Location: Sector - {details.agents[index].sector}
                    <br />
                  </p>

                  {/* <p align="right">
                    <NewPrimaryButton
                      as="a"
                      ref={inputRef}
                      onClick={() => deleteOrder(order)}
                    >
                      {(primaryButtonText = "Delete")}
                    </NewPrimaryButton>

                  </p> */}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
    // </AnimationRevealPage>
  );
};

export default AddOrders;
