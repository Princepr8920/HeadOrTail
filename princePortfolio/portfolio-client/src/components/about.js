import React from "react";
import "./about.scss";
export default function About() {
  const lang = [
    { name: "Javascript", icon: "js.png" },
    { name: "HTML 5", icon: "html.png" },
    { name: "CSS 3", icon: "css.png" },
    { name: "React", icon: "react.png" },
    { name: "Sass", icon: "sass.png" },
    { name: "mongoose", icon: "mongoose.png" },
    { name: "Bootstrap", icon: "bootstrap.png" },
    { name: "Node.js", icon: "node.png" },
    { name: "MongoDb", icon: "mongodb.png" },
  ];

  return (
    <section id="about">
      <div id="prince_div">
        <div className="circle">
          <div className="circle--image">
            <img src={require("../assets/prince.jpg")} alt="prince_img" />

            {lang.map((e, i) => {
              return (
                <div key={i} className={`circle--info info--${i}`}>
                  <div className="icon">
                    <ion-icon name="add-outline"></ion-icon>
                  </div>
                  <div className="info--image">
                    <img
                      src={require(`../assets/48px_png/${e.icon}`)}
                      alt="info image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div id="info">
        <h1>About me</h1>
        <div className="my_paragraph">
          <p> 
            Hello, my name is Prince. I am the person who is born only for
            technology and learning new things. My journey as a frontend
            developer started on 3rd December 2020 when I wrote my first HTML
            code and that code changed my life. Because now I was doing the work
            that I wanted to do. I was learning what I wanted to learn. Because
            I believe that you should do what you want to do, not what others
            want you to do. My abundant energy fuels me in the pursuit of many
            interests, hobbies, areas of study and artistic endeavors. I’m a
            fast learner, able to pick up new skills and juggle different
            projects and roles with relative ease. I prefer to keep learning,
            continue challenging myself, and do interesting things that matter.
            My personality type is{" "}
            <a
              href="http://www.personalitypage.com/ENTJ.html"
              rel="noreferrer"
              target="_blank"
            >
              ENTJ
            </a>
            . I currently work remotely with a selected freelance client base
            and are open for new opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
