"use client";
import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import styles from "./QuizBody.module.scss";
import { useRouter } from "next/navigation";
import Link from "next/link";

const questionsList = [
    {
        question: "What is the name of the breed of this cat?",
        answer: "Egyptian Mau",
    },
    {
        question: "What is the full birth name of Post Malone?",
        answer: "Austin Richard Post",
    },
    {
        question: "At what time did khalid make a reservation at the restaurant?",
        answer: "8pm",
    },
    {
        question: "Question 4 Title",
        answer: "ans4",
    },
]

export default function QuizBody() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [submitValue, setSubmitValue] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailsPopup, setShowFailsPopup,] = useState(false);
    let inputRef = useRef();
    const router = useRouter();
    const [inactiveTimer, setInactiveTimer] = useState(120000)
    const [showCongrats, setShowCongrats,] = useState(true);

    useEffect(() => {
        let timer;

        timer = setTimeout(() => {
            userInactiveRedirect();
        }, inactiveTimer);



        // const waitTime = 1000;

        //  const messageInput = document.getElementById('message');

        inputRef.current.addEventListener('keydown', event => {
            clearTimeout(timer);
        })

        inputRef.current.addEventListener('keyup', event => {
            clearTimeout(timer);

            timer = setTimeout(() => {
                userInactiveRedirect();
            }, inactiveTimer);
        });

        let userInactiveRedirect = () => {
            router.push("/")
        }
    }, [])

    const questionSubmit = (exactAns, userAns, isLastQuestion) => {
        let isCorrectAnswer = checkAnswer(exactAns, userAns);
        handlePopups(isCorrectAnswer, isLastQuestion);
    }

    const checkAnswer = (exactAns, userAns) => {
        if (userAns.toLowerCase() === exactAns.toLowerCase()) return true;
        else return false
    }

    const handlePopups = (isCorrectAnswer, isLastQuestion) => {
        if (isCorrectAnswer) {
            setShowSuccessPopup(true)

            if (!isLastQuestion) {
                setTimeout(() => {
                    setShowSuccessPopup(false)
                }, 2000);

                setSubmitValue("");
                setCurrentQuestion(p => p + 1);
            }
        }

        else {
            setShowFailsPopup(true)

            //if (!isLastQuestion) {
            setTimeout(() => {
                setShowFailsPopup(false);
            }, 2000);

            setSubmitValue("");
            setCurrentQuestion(p => p);
            //  }
        }
    }



    return (

        <>
            <div className={cx(styles.section, "space-horizontal")}>
                <div className={cx(styles.sectionContainer)}>
                    {
                        questionsList.map(({ question, answer, image }, index) => {
                            return currentQuestion === index &&
                                <div className={cx(styles.questionContainer)}>

                                    <h5 className={cx(styles.question, "")}>{question}</h5>
                                    <div className={cx(styles.fieldsContainer)}>
                                        <div className={cx(styles.questionInput, "")}>
                                            <input ref={inputRef} value={submitValue} onInput={(e) => setSubmitValue(e.target.value)} type="text" />
                                        </div>
                                        <button
                                            onClick={
                                                () => questionSubmit(answer, submitValue, index === questionsList.length - 1)
                                            }
                                            className={cx(styles.questionSubmit, "body1-size color-white")}>
                                            <svg width="52" height="28" viewBox="0 0 52 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 14L50 14" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M38 2L50 14L38 26" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                        })
                    }
                </div>
            </div>

            {
                showSuccessPopup &&
                <div className={cx(styles.successPopup, "bg-black")}>
                    <div className={cx(styles.popupContainer)}>
                        <div className={cx(styles.title, "h1")}>Great Job</div>
                        <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>Your answer is right</div>
                    </div>
                </div>
            }
            {
                showFailsPopup &&
                <div className={cx(styles.failsPopup, "bg-black")}>
                    <div className={cx(styles.popupContainer)}>
                        <div className={cx(styles.title, "h1")}>Oops!</div>
                        <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>Your answer is wrong</div>
                        <button className={cx(styles.tryAgainBtn, "subTitle3-size color-white")}>
                            Try again
                        </button>
                    </div>
                </div>
            }


            {
                showCongrats &&
                <div className={cx(styles.congrats, "bg-black")}>
                    <div className={cx(styles.container)}>
                        <Link href={"/"} className={cx(styles.logo)}>
                            <svg width="242" height="37" viewBox="0 0 242 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.19325 9.98253C9.0156 9.27271 9.06001 8.56289 9.14884 8.16362C9.37089 7.05453 10.1259 5.85671 12.3021 5.85671C14.345 5.85671 15.4997 7.09889 15.4997 9.00653C15.4997 9.62762 15.4997 11.136 15.4997 11.136H24.1156V8.69598C24.1156 1.19853 17.3206 0.000706125 12.4353 0.000706125C6.35089 -0.0436575 1.33235 1.99707 0.399705 7.63126C0.133234 9.18398 0.088823 10.5593 0.488529 12.2894C1.99853 19.3433 14.3006 21.384 16.0771 25.8647C16.4324 26.7076 16.2991 27.7724 16.1659 28.4378C15.8994 29.5913 15.1 30.7891 12.7906 30.7891C10.6144 30.7891 9.32648 29.5469 9.32648 27.6393V24.312H0V26.9738C0 34.6931 6.08442 37 12.5685 37C18.8306 37 23.938 34.8705 24.7818 29.1033C25.1815 26.1309 24.8706 24.1789 24.7374 23.4691C23.3162 16.1491 10.1703 14.0196 9.19325 9.98253ZM121.688 10.0713C121.555 9.4058 121.6 8.65162 121.644 8.29671C121.91 7.18762 122.621 5.9898 124.797 5.9898C126.796 5.9898 127.95 7.23198 127.95 9.09526C127.95 9.71635 127.95 11.2247 127.95 11.2247H136.478V8.82907C136.478 1.37598 129.816 0.222524 124.975 0.222524C118.89 0.222524 113.916 2.21889 112.984 7.80871C112.762 9.31708 112.673 10.6924 113.072 12.4225C114.538 19.3433 126.707 21.384 128.483 25.8204C128.794 26.6633 128.705 27.728 128.528 28.3491C128.261 29.5025 127.506 30.656 125.197 30.656C123.065 30.656 121.733 29.4138 121.733 27.5505V24.2233H112.54V26.8407C112.54 34.4713 118.535 36.7782 124.975 36.7782C131.148 36.7782 136.255 34.6487 137.055 28.9702C137.455 25.9978 137.144 24.0902 137.01 23.3804C135.634 16.1934 122.665 14.064 121.688 10.0713ZM200.208 28.8815L192.081 1.06543H179.246V35.2698H187.729L187.24 6.56653L195.989 35.2698H208.291V1.06543H199.764L200.208 28.8815ZM37.0395 1.06543L30.6442 35.6247H39.9706L44.8115 3.63853L49.5192 35.6247H58.8013L52.406 1.06543H37.0395ZM89.2678 1.06543L84.9154 28.0829L80.563 1.06543H66.4401L65.6851 35.6247H74.3454L74.5675 3.63853L80.5186 35.6247H89.2678L95.2634 3.63853L95.4854 35.6247H104.146L103.391 1.06543H89.2678ZM169.653 1.06543H160.904V26.6189C160.904 27.0625 160.904 27.5505 160.815 27.9498C160.638 28.7927 159.927 30.4785 157.484 30.4785C155.086 30.4785 154.375 28.8371 154.198 27.9498C154.109 27.5949 154.109 27.0625 154.109 26.6189V1.06543H145.36V25.8204C145.36 26.4414 145.404 27.7724 145.449 28.0829C146.07 34.5156 151.133 36.6451 157.484 36.6451C163.835 36.6451 168.943 34.56 169.564 28.0829C169.609 27.728 169.698 26.4414 169.653 25.8204V1.06543ZM229.698 16.2378V21.2953H233.251V26.264C233.251 26.7076 233.251 27.1956 233.162 27.5949C233.029 28.5265 232.141 30.1236 229.609 30.1236C227.122 30.1236 226.234 28.5265 226.101 27.5949C226.056 27.1956 226.012 26.7076 226.012 26.264V10.4705C226.012 9.8938 226.056 9.31708 226.189 8.82907C226.367 7.98617 227.122 6.34471 229.609 6.34471C232.274 6.34471 232.896 8.07489 233.073 8.82907C233.162 9.31708 233.162 10.16 233.162 10.16V12.0676H241.867V10.9142C241.867 10.9142 241.911 9.71635 241.822 8.60726C241.156 2.13016 235.827 0.0894338 229.698 0.0894338C223.569 0.0894338 218.329 2.17453 217.574 8.60726C217.485 9.18398 217.396 10.2487 217.396 10.9142V25.4211C217.396 26.0422 217.396 26.5302 217.529 27.6836C218.106 33.9833 223.569 36.2015 229.698 36.2015C235.871 36.2015 241.289 33.9833 241.867 27.6836C241.956 26.5302 242 26.0422 242 25.4211V16.2378H229.698Z" fill="white" />
                            </svg>
                        </Link>
                        <div className={cx(styles.title, "h1")}>Congratulations!</div>
                        <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>You won the game</div>
                    </div>

                    <img className={cx(styles.pattern1)} src="/assets/media/pattern_1.svg" alt="" />
                    <img className={cx(styles.pattern2)} src="/assets/media/pattern_2.svg" alt="" />
                    <img className={cx(styles.pattern3)} src="/assets/media/pattern_3.svg" alt="" />
                </div>
            }

        </>
    )
}