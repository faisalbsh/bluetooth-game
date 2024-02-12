"use client";
import cx from "classnames";
import styles from "./GameEnd.module.scss";
import Header from "@/components/common/Header/Header";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";

export default function GameEnd({ user = -1, winner = -1, setIsGameBodyActive }) {

    let resetGame = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            redirect: 'follow',
            headers: myHeaders,
        };

        fetch("https://us-central1-bluetooth-race.cloudfunctions.net/app/race-clean", requestOptions)
            .then(response => response.text())
            .then(result => { console.log(222, result); location.reload(); })
            .catch(error => console.log('error', error));

        //   setTime(timer)




    }
    useGSAP(() => {
        gsap.to(`.${styles.patternTop}`, {
            top: 0,
            duration: 2,
        })
        gsap.to(`.${styles.patternBottom}`, {
            bottom: 0,
            duration: 2,
        }, "<")
    }, { dependencies: [winner] })

    useEffect(() => {
        setTimeout(() => {
            resetGame();
            // location.reload();
        }, 3000)
    }, [])



    return (
        <>
            {/* <Header /> */}
            <div className={cx(styles.section, "text-center bg-black color-white space-horizontal")}>
                {
                    ((user === 1 && winner === 1) || (user === 2 && winner === 2)) && <>
                        <div className={cx(styles.patternTop)}>
                            <img src="/assets/media/site/congrats_1.svg" alt="" />
                        </div>
                        <div className={cx(styles.patternBottom)}>
                            <img src="/assets/media/site/congrats_2.svg" alt="" />
                        </div>

                    </>
                }

                <div className={cx(styles.sectionContainer)}>
                    {
                        ((user === 1 && winner === 1) || (user === 2 && winner === 2)) ?
                            <div className={cx(styles.info)}>
                                <div className={cx(styles.logo)}>
                                    <svg width="242" height="37" viewBox="0 0 242 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.19325 9.98253C9.0156 9.27271 9.06001 8.56289 9.14884 8.16362C9.37089 7.05453 10.1259 5.85671 12.3021 5.85671C14.345 5.85671 15.4997 7.09889 15.4997 9.00653C15.4997 9.62762 15.4997 11.136 15.4997 11.136H24.1156V8.69598C24.1156 1.19853 17.3206 0.000706125 12.4353 0.000706125C6.35089 -0.0436575 1.33235 1.99707 0.399705 7.63126C0.133234 9.18398 0.088823 10.5593 0.488529 12.2894C1.99853 19.3433 14.3006 21.384 16.0771 25.8647C16.4324 26.7076 16.2991 27.7724 16.1659 28.4378C15.8994 29.5913 15.1 30.7891 12.7906 30.7891C10.6144 30.7891 9.32648 29.5469 9.32648 27.6393V24.312H0V26.9738C0 34.6931 6.08442 37 12.5685 37C18.8306 37 23.938 34.8705 24.7818 29.1033C25.1815 26.1309 24.8706 24.1789 24.7374 23.4691C23.3162 16.1491 10.1703 14.0196 9.19325 9.98253ZM121.688 10.0713C121.555 9.4058 121.6 8.65162 121.644 8.29671C121.91 7.18762 122.621 5.9898 124.797 5.9898C126.796 5.9898 127.95 7.23198 127.95 9.09526C127.95 9.71635 127.95 11.2247 127.95 11.2247H136.478V8.82907C136.478 1.37598 129.816 0.222524 124.975 0.222524C118.89 0.222524 113.916 2.21889 112.984 7.80871C112.762 9.31708 112.673 10.6924 113.072 12.4225C114.538 19.3433 126.707 21.384 128.483 25.8204C128.794 26.6633 128.705 27.728 128.528 28.3491C128.261 29.5025 127.506 30.656 125.197 30.656C123.065 30.656 121.733 29.4138 121.733 27.5505V24.2233H112.54V26.8407C112.54 34.4713 118.535 36.7782 124.975 36.7782C131.148 36.7782 136.255 34.6487 137.055 28.9702C137.455 25.9978 137.144 24.0902 137.01 23.3804C135.634 16.1934 122.665 14.064 121.688 10.0713ZM200.208 28.8815L192.081 1.06543H179.246V35.2698H187.729L187.24 6.56653L195.989 35.2698H208.291V1.06543H199.764L200.208 28.8815ZM37.0395 1.06543L30.6442 35.6247H39.9706L44.8115 3.63853L49.5192 35.6247H58.8013L52.406 1.06543H37.0395ZM89.2678 1.06543L84.9154 28.0829L80.563 1.06543H66.4401L65.6851 35.6247H74.3454L74.5675 3.63853L80.5186 35.6247H89.2678L95.2634 3.63853L95.4854 35.6247H104.146L103.391 1.06543H89.2678ZM169.653 1.06543H160.904V26.6189C160.904 27.0625 160.904 27.5505 160.815 27.9498C160.638 28.7927 159.927 30.4785 157.484 30.4785C155.086 30.4785 154.375 28.8371 154.198 27.9498C154.109 27.5949 154.109 27.0625 154.109 26.6189V1.06543H145.36V25.8204C145.36 26.4414 145.404 27.7724 145.449 28.0829C146.07 34.5156 151.133 36.6451 157.484 36.6451C163.835 36.6451 168.943 34.56 169.564 28.0829C169.609 27.728 169.698 26.4414 169.653 25.8204V1.06543ZM229.698 16.2378V21.2953H233.251V26.264C233.251 26.7076 233.251 27.1956 233.162 27.5949C233.029 28.5265 232.141 30.1236 229.609 30.1236C227.122 30.1236 226.234 28.5265 226.101 27.5949C226.056 27.1956 226.012 26.7076 226.012 26.264V10.4705C226.012 9.8938 226.056 9.31708 226.189 8.82907C226.367 7.98617 227.122 6.34471 229.609 6.34471C232.274 6.34471 232.896 8.07489 233.073 8.82907C233.162 9.31708 233.162 10.16 233.162 10.16V12.0676H241.867V10.9142C241.867 10.9142 241.911 9.71635 241.822 8.60726C241.156 2.13016 235.827 0.0894338 229.698 0.0894338C223.569 0.0894338 218.329 2.17453 217.574 8.60726C217.485 9.18398 217.396 10.2487 217.396 10.9142V25.4211C217.396 26.0422 217.396 26.5302 217.529 27.6836C218.106 33.9833 223.569 36.2015 229.698 36.2015C235.871 36.2015 241.289 33.9833 241.867 27.6836C241.956 26.5302 242 26.0422 242 25.4211V16.2378H229.698Z" fill="white" />
                                    </svg>
                                </div>
                                <h2 className={cx(styles.title)}>Congratulations!</h2>
                                <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>You won the game!</div>
                            </div>
                            : <div className={cx(styles.info)}>
                                <h2 className={cx(styles.title)}>Hard Luck!</h2>
                                <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>You lost the game!</div>
                            </div>
                    }

                    {/* <div className={cx(styles.stats)}>
                        <div className={cx(styles.statsItem, "bg-blue")}>
                            <div className={cx(styles.itemLabel, "body2-size")}>Average Speed</div>
                            <div className={cx(styles.itemValue)}>
                                <span className={cx(styles.number, "digital2-size")}>150</span>
                                <span className={cx(styles.unit, "body3-size")}>km/h</span>
                            </div>
                        </div>
                        <div className={cx(styles.statsItem, "bg-blue")}>
                            <div className={cx(styles.itemLabel, "body2-size")}>Total Time</div>
                            <div className={cx(styles.itemValue)}>
                                <span className={cx(styles.number, "digital2-size")}>01:50</span>                            </div>
                        </div>
                    </div> */}
                </div>
            </div >
        </>

    )
}
