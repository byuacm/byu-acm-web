import React from "react";

const About = () => {
    return (
        <div className="About">
            <div>
                <h1>About Us</h1>
                <p>
                The Association for Computing Machinery is the largest and oldest international
                scientific and educational computing society in the industry today. The ACM is
                dedicated to advancing the art, science, engineering, and application of information
                technology. The BYU chapter is just one of many student chapters throughout
                the United States. Our vision for the BYU chapter of ACM is:
                </p>

                <blockquote><b>
                    "Enhancing our university experience through Networking, Education and Service"
                </b></blockquote>
            </div>

            <div>
                <h2>Networking</h2>
                ...as in people networking. This aspect of our vision includes getting to know representatives from local and international companies, the faculty here at BYU and other universities and each other! Activites include:

                Presentations from faculty and industrial sponsor representatives

                Career placement presenatations

                Social Events
            </div>

            <div>
                <h2>Education</h2>
                <p>
                This is why we're here at BYU, right? But beyond the learning we do in the classroom,
                there are other topics that are important to helping us transition into the workplace.
                Plus, it's fun to learn cool stuff! Activites include:
                </p>
                <ul>
                    <li>Monthly Workshops on various topics</li>
                    <li>ACM International Collegiate Programming Contest</li>
                    <li>Graduate School Information</li>
                </ul>
            </div>

            <div>
                <h2>Service</h2>
                <p>
                We are all blessed with talents and abilities and now BYU ACM is providing opportunites to use those to help others! At least once a semester we have our Weekend of Code service project where we all get together and work on a project. There is always food and we all learn a lot about a new programming paradigm or language we weren't familiar with before.
                </p>
            </div>
        </div>
    )
}

export default About;
