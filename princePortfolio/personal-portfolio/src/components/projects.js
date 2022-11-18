import React from "react";
import "./projects.scss";
export default function Projects() {
  let projects = [
    {
      projectName: "Markdown",
      date_of_creation: "Jan 12 2022",
      img_url:
        "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80",
      url: "https://codepen.io/prince8920/pen/NWwGJMV",
    },
    {
      projectName: "JS Calculator",
      date_of_creation: "Mar 20 2022",
      img_url:
        "https://media.istockphoto.com/photos/calculator-on-yellow-background-calculation-in-business-finance-or-picture-id1320740500?b=1&k=20&m=1320740500&s=170667a&w=0&h=THbySiuHoFFDF0R74FN5BQZWxLI2YwZEdY0cUYV-jkc=",
      url: "https://codepen.io/prince8920/pen/abEZOmo",
    },
    {
      projectName: "D3 bar-chart",
      date_of_creation: "Apr 6 2022",
      img_url:
        "https://images.unsplash.com/photo-1533135044283-42dc2b70abfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      url: "https://codepen.io/prince8920/pen/popaYPG",
    },
    {
      projectName: "Random quotes machine",
      date_of_creation: "June 09 2022",
      img_url:
        "https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80",
      url: "https://codepen.io/prince8920/pen/BawGxOJ",
    },
    {
      projectName: "Scatter plot chart",
      date_of_creation: "Apr 20 2022",
      img_url:
        "https://images.unsplash.com/photo-1639754390580-2e7437267698?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1141&q=80",
      url: "https://codepen.io/prince8920/pen/xxpMppY",
    },
    {
      projectName: "Choropleth map",
      date_of_creation: "May 29 2022",
      img_url:
        "https://images.unsplash.com/photo-1580715911453-d6d9cffd5771?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=807&q=80",
      url: "https://codepen.io/prince8920/pen/WNMMMYW",
    },
    {
      projectName: "TreeMap",
      date_of_creation: "Jun 09 2022",
      img_url:
        "https://images.unsplash.com/photo-1581273154768-0a9a16887d2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1212&q=80",
      url: "https://codepen.io/prince8920/pen/dydgepN",
    },
    {
      projectName: "Drumpad",
      date_of_creation: "Feb 10 2022",
      img_url:
        "https://images.unsplash.com/photo-1643989996350-01addb8c8228?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      url: "https://codepen.io/prince8920/pen/JjONZYj",
    },
    {
      projectName: "Product landing page",
      date_of_creation: "Mar 03 2021",
      img_url:
        "https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      url: "https://codepen.io/prince8920/pen/yLVEONO",
    },
    {
      projectName: "25+5 clock",
      date_of_creation: "Mar 13 2022",
      img_url:
        "https://images.unsplash.com/photo-1550534791-2677533605ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2xvY2t8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      url: "https://codepen.io/prince8920/pen/oNpNdXW",
    },
    {
      projectName: "URL shortner",
      date_of_creation: "Aug 13 2022",
      img_url:
        "https://images.unsplash.com/photo-1623354582128-d8e232a8649e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      url: "https://url-shortner-by-prince.herokuapp.com/",
    },
    {
      projectName: "Heatmap",
      date_of_creation: "May 20 2022",
      img_url:
        "https://images.unsplash.com/photo-1584291527905-f930791fb1ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
      url: "https://codepen.io/prince8920/pen/wvyeJdb",
    },
    {
      projectName: "Technical documentation page",
      date_of_creation: "Mar 02 2021",
      img_url:
        "https://images.unsplash.com/photo-1600267204091-5c1ab8b10c02?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      url: "https://codepen.io/prince8920/pen/RwoydNP",
    },
    {
      projectName: "Survey form",
      date_of_creation: "Feb 17 2021",
      img_url:
        "https://images.unsplash.com/photo-1589568533820-ae6345184dd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      url: "https://codepen.io/prince8920/pen/ExNmGLK",
    },

    {
      projectName: "Tribute page",
      date_of_creation: "Feb 13 2021",
      img_url:
        "https://images.unsplash.com/photo-1576430321818-7eb0a95038e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      url: "https://codepen.io/prince8920/pen/MWbJJJx",
    },
  ];
  return (
      <section id="projects">
        <div id="layout">
      <div id="projects-header"><h2>These are some of my projects</h2></div>
      <div>
        <ul id="projects-grid">
          {projects.map((project, index) => {
            return (
              <li id="project_list" key={index}>
                <div id="project_container">
                  <a rel="noreferrer"
                    className="img_anchor"
                    href={project.url}
                    target="_blank" 
                  >
                    <img
                      id="project_img"
                      src={project.img_url}
                      alt={project.projectName}
                    />
                    <div id="overlay">
                      <ul>
                        <li>Project name : {project.projectName}. </li>
                        <li>Date of creation : {project.date_of_creation} </li>
                        <li>Created by : Prince</li>
                      </ul>
                    </div>
                  </a>

                  <div id="project-name">
                    <div>
                    <span className="code">{"< "}</span>
                    <a
                      id="name_link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.projectName}
                    </a>
                    <span className="code">{" />"}</span>
                  </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        </div>
        </div>
      </section>
  );
}
