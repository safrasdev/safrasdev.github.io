let startBtn = document.querySelector(".start_btn");
let startScreen = document.querySelector(".start_screen");
let animateScreen = document.querySelector(".animation_screen");
let tasks = document.querySelectorAll(".task");
let infoText = document.querySelector(".description_area");
let outputText = document.querySelector(".output_container");


startBtn.addEventListener("click", () => {
    startBtn.classList.add('animate');
    document.querySelector(".start_screen")
    .classList.add('fadeout');
    setTimeout(() => {
        startScreen.style.display = "none";
        if(startScreen.style.display = "none"){
            animateScreen.style.display = "flex";
            animateScreen.classList.add('fadein');

            setTimeout(() => {
                document.querySelector(".bottom_panel").classList.add('panel_up');
                tasks.forEach((task, index) => {
                    setTimeout(() => {
                        task.classList.add("left_in");
                    }, index * 300);
                })
                setTimeout(() => {
                    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                    async function asyncTasks() {
                        let text1 = document.createElement("p")
                        text1.textContent = "> Checking the First Task";
                        infoText.append(text1);
                        document.querySelector(".o1").classList.add('blink');
                        await wait(3000);
                        
                        text1.remove();
                        let text2 = document.createElement("p")
                        text2.textContent = "> Completed the First Task";
                        infoText.append(text2);
                        document.querySelector(".task1").classList.add("left_out");
                        let text3 = document.createElement("p");
                        text3.textContent = "Start";
                        outputText.append(text3);
                        await wait(3000);

                        text2.remove();
                        let text4 = document.createElement("p")
                        let text5 = document.createElement("p")
                        text4.textContent = "> Checking the Second Task";
                        text5.textContent = ": Asynchronous Task Detected";
                        infoText.append(text4);
                        infoText.append(text5);
                        document.querySelector(".o2").classList.add('blink');
                        await wait(5000);

                        text4.remove();
                        text5.remove();
                        let text6 = document.createElement("p");
                        text6.textContent = "> Moving the Task to Web API Until the Timer Ends";
                        infoText.append(text6);
                        document.querySelector(".task2").classList.replace("left_in", "move_animations1")
                        document.querySelector(".o2").classList.remove('blink');
                        await wait(6000);

                        document.querySelector(".timer").classList.add('fill_bar');
                        text6.remove();
                        let text7 = document.createElement("p");
                        text7.textContent = "> Checking the Third Task";
                        document.querySelector(".o3").classList.add('blink');
                        infoText.append(text7)
                        await wait(4000)

                        text7.remove();
                        let text8 = document.createElement("p");
                        text8.textContent = "> Completed the Third Task";
                        infoText.append(text8)
                        document.querySelector(".task3").classList.add("left_out");
                        let text9 = document.createElement("p");
                        text9.textContent = "End";
                        outputText.append(text9);
                        await wait(6000)

                        text8.remove();
                        let text10 = document.createElement("p");
                        text10.textContent = "> Move the Asynchronous Task to CallBack Queue (After the Timer hits 0)";
                        infoText.append(text10);
                        await wait(3000);

                        text10.remove();
                        let text11 = document.createElement("p");
                        text11.textContent = "> Event Loop Checks the Call Stack Empty or Not";
                        infoText.append(text11);
                        document.querySelector(".loop_text").classList.add("blink_text");
                        await wait(4000);

                        text11.remove();
                        let text12 = document.createElement("p");
                        text12.textContent = "> If Yes, Move The CallBack Task to CallStack";
                        infoText.append(text12);
                        document.querySelector(".loop_text").classList.remove("blink_text");
                        await wait(3000)

                        text12.remove();
                        let text13 = document.createElement("p");
                        text13.textContent = "> Then CallStack Complete the Final Task";
                        infoText.append(text13);
                        let text14 = document.createElement("p");
                        text14.textContent = "Async Task";
                        outputText.append(text14);
                    }
                    asyncTasks();
                }, 2000);
            }, 100);

        }
    }, 500);
});