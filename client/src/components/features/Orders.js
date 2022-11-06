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
import EventService from "../../Services/EventService";
import AgentService from "../../Services/AgentService";
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

const Orders = ({
    subheading = "CapiBull",
    heading = "Orders ",
    description = "Here are some orders.",

    primaryButtonText = "Learn More",
    primaryButtonUrl = "https://timerse.com",
    AID = "",
}) => {
    const {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        setIsAdmin,
    } = useContext(AuthContext);
    const inputRef = useRef();
    useEffect(() => {
        OrderService.getAllOrders().then((data) => {
            for (const order of data.orders) {
                // console.log(order.AID, user._id)
                if (order.AID === user._id) {
                    EventService.getEventByID(order.SEID).then((data1) => {
                        setEvents([...events, data1.event]);
                        setOrders([...orders, order]);
                    });

                }
            }
        });
    }, [inputRef]);
    const editOrder = (order) => {
        let newOrder = order;
        newOrder.status = "Delivered";
        OrderService.editOrder(newOrder, order._id).then((data) => {
            const { message } = data;
            let newAgent = user;
            newAgent.status = "free";
            newAgent.sector = order.location;
            console.log("newAgent",newAgent);
            AgentService.editAgent(newAgent, user._id).then((data1) => {
                const { message1 } = data1;
                if (!message1.msgError) {
                    setTimeout(() => {
                    }, 2000);
                }
                console.log("agent updated successfully")
            });
            if (!message.msgError) {
                setTimeout(() => {
                }, 2000);
            }
        });

    }

    const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

    const toggleQuestion = (questionIndex) => {
        if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
        else setActiveQuestionIndex(questionIndex);
    };
    const [orders, setOrders] = useState([]);
    const [events, setEvents] = useState([]);
    // console.log("orders", orders)
    // console.log("events", events)
    return (

        // <AnimationRevealPage>
        <Container tw="m-8">
            <ContentWithPaddingXl>
                <Column>
                    <HeaderContent>
                        <br></br>
                        <br></br>
                        <Heading>Orders - Details</Heading>

                    </HeaderContent>
                    <FAQSContainer>
                        {orders.map((order, index) => (
                            <FAQ>
                                <Question
                                    key={index}
                                    onClick={() => {
                                        toggleQuestion(index);
                                    }}
                                    className="group"
                                >
                                    <img src={Logopdf} alt="logo" css={logocss} />
                                    <QuestionText>Status: {order.status}</QuestionText>
                                    <QuestionText>Delivery Location: Sector- {order.location}</QuestionText>
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
                                        Dish Name: {order.dname}
                                        <br />
                                        Quantity of dish: {order.quantity}
                                        <br/>

                                    </p>
                                    <br></br>
                                    <MyStyledParagraph>Restaurant Details </MyStyledParagraph>
                                    <br></br>
                                    <br></br>
                                    <p
                                        key={index}
                                        onClick={() => {
                                            toggleQuestion(index);
                                        }}
                                        className="group"
                                    >
                                        Restaurant Name: {events[index].title}
                                        <br />
                                        Restaurant Location: Sector - {events[index].sector}
                                        <br />
                                    </p>
                                    {order.status=="Pending"?<p align="right">
                                        <NewPrimaryButton
                                            as="a"
                                            ref={inputRef}
                                            onClick={() => editOrder(order)}
                                        >
                                            {(primaryButtonText = "Update Delivery Status")}
                                        </NewPrimaryButton>

                                    </p>:null}

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

export default Orders; 
