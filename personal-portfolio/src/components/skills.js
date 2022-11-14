import React from "react";
import "./skills.scss";
export default function Skills() {
  const frontend = [
    { name: "Javascript", icon: "js.png" },
    { name: "Ajax", icon: "ajax.png" },
    { name: "HTML 5", icon: "html.png" },
    { name: "CSS 3", icon: "css.png" },
    { name: "React", icon: "react.png" },
    { name: "Redux", icon: "redux.png" },
    { name: "Sass", icon: "sass.png" },
    { name: "Bootstrap", icon: "bootstrap.png" },
    { name: "Jquery", icon: "jquery.png" },
  ];

  const backend = [
    { name: "Node.js", icon: "node.png" },
    { name: "Express", icon: "express.png" },
    { name: "Json", icon: "json.png" },
    { name: "Passport", icon: "passport.png" },
    { name: "Mocha", icon: "mocha.png" },
    { name: "Chai", icon: "chai.png" },
    { name: "Mongoose", icon: "mongoose.png" },
    { name: "MongoDb", icon: "mongodb.png" },
   { name: "EJS", icon: "ejs.png" },
  ];
  return (
    <>
      <section id="skills">
        <h2>About my skills</h2>

        <div id="skill">
          <div id="frontend">
            <div className="info">
              <h1>Frontend</h1>
              <p>
                Frontend is an integral part of web development. To devlop
                frontend (client-side) there are lot of languages frameworks and
                libraries are avialable. As a frontend developer i use different
                types of languages, frameworks and libraries to maxmize my
                productivity.
              </p>
            </div>

            <div className="lang">
              <ul className="lang_ul">
                {frontend.map((skill, index) => {
                  return (
                    <li key={index}>
                      <div className="group">
                        <img
                          className="lang_icon"
                          src={require(`../assets/pngIcons/${skill.icon}`)}
                          alt={skill.name}
                        />
                        <h4>{skill.name}</h4>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div id="backend">
            <div className="info">
              <h1>Backend</h1>
              <p>
                As a backend developer I use a variety of technologies to manage databases,
                back-end logic, application programming interfaces (APIs),
                architectures, and servers. some of them are like.
              </p>
            </div>

            <div className="lang">
              <ul className="lang_ul">
                {backend.map((skill, index) => {
                  return (
                    <li key={index}>
                      <div className="group">
                        <img
                          className="lang_icon"
                          src={require(`../assets/pngIcons/${skill.icon}`)}
                          alt={skill.name}
                        />
                        <h4>{skill.name}</h4>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
