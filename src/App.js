import './App.css';
import { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";    //OpenAI 
import Typewriter from 'typewriter-effect';     //Typewriter effect

function App() {

  const [result, setresult] = useState("");     //Result from OpenIA
  const [messageList, setmessageList] = useState([
    {"role": "user", "content": "Assume you're a resume builder and have to generate LaTeX code whenever a user asks for it."},
    {"role": "system", "content": "Okay, I will generate the LaTeX code. I will ask the user to enter details for each section. This is the order for the sections:"},
    {"role": "system", "content": "1. Heading - This includes name, city, state, phone number, email, LinkedIn, GitHub, LeetCode account, GeekforGeeks account link, and portfolio link."},
    {"role": "system", "content": "2. Education - This section consists of education details."},
    {"role": "system", "content": "3. Experience - This is the section where you will mention internships and previous job experience."},
    {"role": "system", "content": "4. Projects"},
    {"role": "system", "content": "5. Achievements"},
    {"role": "system", "content": "6. Certificates"},
    {"role": "system", "content": "7. Technical Skills"},
    {"role": "user", "content": "Okay, that sounds great. But I would like to provide you with a specific format assume it is the standard format of the resume that you have create.  Then you can start with the:"},
    {"role": "user", "content": String.raw`
    \documentclass[letterpaper,11pt]{article}

      \usepackage{latexsym}
      \usepackage[empty]{fullpage}
      \usepackage{titlesec}
      \usepackage{marvosym}
      \usepackage[usenames,dvipsnames]{color}
      \usepackage{verbatim}
      \usepackage{enumitem}
      \usepackage[hidelinks]{hyperref}
      \usepackage{fancyhdr}
      \usepackage[english]{babel}
      \usepackage{tabularx}
      \usepackage{fontawesome5}
      \usepackage{multicol}
      \setlength{\multicolsep}{-3.0pt}
      \setlength{\columnsep}{-1pt}
      \input{glyphtounicode}

      \pagestyle{fancy}
      \fancyhf{} % clear all header and footer fields
      \fancyfoot{}
      \renewcommand{\headrulewidth}{0pt}
      \renewcommand{\footrulewidth}{0pt}

      % Adjust margins
      \addtolength{\oddsidemargin}{-0.6in}
      \addtolength{\evensidemargin}{-0.5in}
      \addtolength{\textwidth}{1.19in}
      \addtolength{\topmargin}{-.7in}
      \addtolength{\textheight}{1.4in}

      \urlstyle{same}

      \raggedbottom
      \raggedright
      \setlength{\tabcolsep}{0in}

      % Sections formatting
      \titleformat{\section}{
        \vspace{-4pt}\scshape\raggedright\large\bfseries
      }{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

      % Ensure that generate pdf is machine readable/ATS parsable
      \pdfgentounicode=1

      %-------------------------
      % Custom commands
      \newcommand{\resumeItem}[1]{
        \item\small{
        {#1 \vspace{-2pt}}
        }
      }

      \newcommand{\classesList}[4]{
        \item\small{
            {#1 #2 #3 #4 \vspace{-2pt}}
        }
      }

      \newcommand{\resumeSubheading}[4]{
        \vspace{-2pt}\item
        \begin{tabular*}{1.0\textwidth}[t]{l@{\extracolsep{\fill}}r}
          \textbf{#1} & \textbf{\small #2} \\
          \textit{\small#3} & \textit{\small #4} \\
        \end{tabular*}\vspace{-7pt}
      }

      \newcommand{\resumeSubSubheading}[2]{
        \item
        \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
          \textit{\small#1} & \textit{\small #2} \\
        \end{tabular*}\vspace{-7pt}
      }

      \newcommand{\resumeProjectHeading}[1]{
          \item
          \begin{tabular*}{\textwidth}{@{}p{\textwidth}@{}}
            \small#1 \\
          \end{tabular*}\vspace{-7pt}
      }

      \newcommand{\resumeSubItem}[1]{\resumeItem{#1}\vspace{-4pt}}

      \renewcommand\labelitemi{$\vcenter{\hbox{\tiny$\bullet$}}$}
      \renewcommand\labelitemii{$\vcenter{\hbox{\tiny$\bullet$}}$}

      \newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.0in, label={}]}
      \newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
      newcommand{\resumeItemListStart}{\begin{itemize}}
      \newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}

      \begin{document}
    `},
    {"role" : "user" , "content" : "I will maintain a global variable it initially consists of the above standard format code .I will write a program that will extract the code within <LaTeX> Tag and store it in a variable. Whenever you generate code within the <LaTeX> Tag this messages will be forwarded to that file it will extract and store it a variable."},
    {"role" : "user" , "content" : "I will provide you with a template use that"},
    {"role" : "user" , "content" :String.raw`

\begin{document}
\linespread{1.0}
%----------HEADING----------


\begin{center}
    {\Huge \scshape Bandi Hemanth} \\ \vspace{1pt}
    Palakollu, Andhra Pradesh \\ \vspace{1pt}

    \small \raisebox{-0.1\height}\faPhone\ +91 7731023599 ~ \href{mailto:bandihemanth7731@gmail.com}{\raisebox{-0.2\height}\faEnvelope\  \underline{bandihemanth7731@gmail.com}} ~
    \href{https://www.linkedin.com/in/bandi-hemanth-835280211}{\raisebox{-0.2\height}\faLinkedin\ \underline{linkedin.com/in/bandi-hemanth}}
    \href{https://github.com/bannu773}{\raisebox{-0.2\height}\faGithub\ \underline{github.com/bannu773}} \newline
    \vspace{-3pt}
    \href{https://leetcode.com/bandibannu773/}{\raisebox{-0.2\height}\faCode\ \underline{Leetcode - bandi hemanth}}
    \href{https://auth.geeksforgeeks.org/user/bandibannu773}{\raisebox{-0.2\height}\faCode\ \underline{GeekForGeeks - bandi hemanth}}
    \href{https://hemanth-portfolio-phi.vercel.app/}{\raisebox{-0.2\height}\faCode\ \underline{Portfolio - bandi hemanth}}
    \vspace{-8pt}
    \vspace{0pt}
\end{center}



%-----------EDUCATION-----------
\section{Education}
  \resumeSubHeadingListStart
    \resumeSubheading
    {Aditya Institute of Technology and Mangement}{August 2020 - June 2024}
    {Bachelor of Technology in Computer Science(CGPA of 9.56)}{Srikakulam, India}
  \resumeSubHeadingListEnd


%-----------EXPERIENCE-----------
\section{Experience}
  \resumeSubHeadingListStart
    \resumeSubheading
    {Cyient}{June 2023 - August 2023}
    {Software Development Engineer Intern}{Hyderabad, India}
    \resumeItemListStart
        \resumeItem{
        Collaborative effort in developing a platform for \textbf{Managing employee information}, incorporating essential features like \textbf{OAuth} access and onboarding pages using \textbf{Firebase and React JS} and positively impacting
employee productivity.}
        \resumeItem{Implemented \textbf{Automatic value} calculations based on employee input, improving \textbf{Data reporting accuracy}.}
    \resumeItemListEnd
     \resumeSubheading
    {Arum Innovations}{April 2023 - May 2023}
    {Android Development Intern}{Hyderabad, India}
    \resumeItemListStart
        \resumeItem{Led the development of a cutting-edge \textbf{Home Automation App }using \textbf{Flutter}. Gathered user feedback and improved the app's usability with the product team.}
            \resumeItem{Designed and implemented the interface, utilizing \textbf{Flutter's Provider} for efficient Data passing between components.}
            \resumeItem{Implemented \textbf{Dark, Light, and Gradient Themes}, with \textbf{Automatic} detection of the \textbf{System Theme}. }
    \resumeItemListEnd

  \resumeSubHeadingListEnd
\vspace{-16pt}

%-----------PROJECTS-----------
\section{Projects}

\resumeSubHeadingListStart
\resumeProjectHeading
{\href{https://whatsapp-clone-rho-nine.vercel.app/}{\textbf{Real-Time Chat Application (WhatsApp Clone)}} $|$ \emph{React JS, Node JS, Express JS, MongoDB, Google OAuth, Socket.io}}
\resumeItemListStart
  \resumeItem{Developed an \textbf{intuitive interface} facilitating the addition of contacts, fostering seamless \textbf{Real-time interactions.}}
  \resumeItem{Utilized \textbf{Socket.io} to \textbf{dynamically} track user \textbf{Online/Offline status,} enhancing the overall user experience.}
  \resumeItem{Acquired proficiency in creating \textbf{stable APIs} and writing \textbf{structured code}, contributing to increased productivity.}
\resumeItemListEnd
\resumeSubHeadingListEnd


\resumeSubHeadingListStart
\resumeProjectHeading
  {\href{google collab}{\textbf{E-Commerce Website (Flipkart Clone)}} $|$ \emph{HTML, CSS, JavaScript, React, Node.js, Express JS, MongoDB}}
  \resumeItemListStart
    \resumeItem{ Implemented user-friendly interfaces for features such as \textbf{product listing}, \textbf{search, and product details}.}
     \resumeItem{Implemented user \textbf{Authentication}, \textbf{shopping cart functionality}, and seamless \textbf{order processing}.}
    \resumeItem{Implemented a \textbf{secure payment gateway} and developed a\textbf{ robust backend }with \textbf{Node.js} and \textbf{MongoDB.}}
  \resumeItemListEnd
\resumeSubHeadingListEnd

\resumeSubHeadingListStart
\resumeProjectHeading
  {\href{https://hackaton-final-puce.vercel.app/}{\textbf{AVISHKAAR}} $|$ \emph{HTML, CSS, JavaScript, Parallax, Animation, Gradient Design, React-parallax-scroll}}
  \resumeItemListStart
    \resumeItem{Collaboratively Led a team to create a captivating \textbf{Parallax website} for a college hackathon using \textbf{React-parallax-scroll}.}
    \resumeItem{Crafted an Interactive Timeline and Implemented Captivating \textbf{Gradient Designs }Appeals the Overall Website.}
    \resumeItem{Developed \textbf{Animated Cards} with \textbf{Neon }Effects, Adding a Dynamic Element to Effectively Engage Participants.}
  \resumeItemListEnd
\resumeSubHeadingListEnd


%-----------Achievements-----------
\section{Achievements}
\begin{itemize}[label=$\bullet$, left=0.15in, labelsep=0.5em, itemsep=-3pt]
    \item Achieved the \textbf{63rd All India Rank} in \textbf{CodeKaze} (2023), Coding Ninjas with over \textbf{200,000+} participants.
    \item Secured an \textbf{All India Rank of 476} at Coding Ninjas' competition, among more than \textbf{1 lakh} participants.
    \item Attained \textbf{College Rank 1}, demonstrating excellence in the Coding Ninjas' competition within the college.
    \item \textbf{Mentored} and \textbf{guided} aspiring programmers, significantly improving their coding skills and their abilities.
    \item Solved \textbf{900+ DSA} questions on (GFG and Leetcode)
    \item Awarded a \textbf{T-Shirt} from \textbf{GeeksforGeeks} for consistent problem-solving efforts.
    \item Achieved \textbf{College Rank 1} in the Hour Storm coding competition.
\end{itemize}
\vspace{-16pt}




%-----------CERTIFICATES-----------
\section{Certificates}
\resumeSubHeadingListStart
  \resumeSubheading
    {Web Development - Internshalla }{Oct 2022}
    {Udemy}{Online}
  % \resumeSubheading
  %   {Data Science Specialization - Johns Hopkins University}{December 2022}
  %   {Coursera}{Online}
\resumeSubHeadingListEnd
%-----------PROGRAMMING SKILLS-----------
\section{Technical Skills}
 \begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
    \textbf{Languages}{: C++, Python, Java, C , HTML/CSS, JavaScript} \\
    \textbf{Frontend}{: ReactJS, Redux, Node Js, Express Js BOOTSTRAP, TAILWIND CSS, Material UI, Material Table, ReactStrap } \\
        \textbf{Database}{: SQL, MongoDB, Firebase} \\
        \textbf{Android}{: FLUTTER, Bloc} \\
        \textbf{Developing Tools}{: Git, Visual Studio Code, Android Studio} \\


    }}
 \end{itemize}
 \vspace{-16pt}

\end{document}Name

    ` },


    {
        "role" : "user" ,
        "content" : "another thing to remember is whenever the user wants to change something (like heading or projects or experience) you have to generate 2 codes the actual code that is going to change and the changed code and important one is both the codes must be wrapped with <LateX> Tag"
    },
    {
        "role" : "system",
        "content" : "okay I will generate the original code and also the changed code"
    },
     {
        "role" : "user" ,
        "content" : "now start with the heading section ask the required data from the user and finally generate the code the assistent only generate the the code. Remember when you generate the code Wrap it in a <LaTeX> Tag"
    },
    {
      "role" : "user",
      "content" : "i have provided the standard format code start after \begin{document} start by asking the heading section"
    }
  ])
  const [prompt, setprompt] = useState("");     //Prompt question to OpenIA
  const [isLoading, setisLoading] = useState(false);     //Prompt question to OpenIA
  const [isTypeWriting, setisTypeWriting] = useState(false);     //If the typewriter effect is loading.
  const [welcomeText, setwelcomeText] = useState("Auto Resume AI is a digital diviner designed to provide helpful and informative responses to your questions and inquiries with the help of artificial intelligence.");
  const [isTypingWelcome, setisTypingWelcome] = useState(true); //If the welcoming test is loading

  // Create configuration object
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });


  // create OpenAI configuration object
  const openai = new OpenAIApi(configuration);


  // Submit form 
  function submitForm(event){

    //Preventing page refresh
    event.preventDefault();

    // Call the OpenAI completion Function 
    completion()
 }

  // new messages list 
  let newMessages = [
   

  ]

  // Send request 
  const completion = async () => {
    // 
    console.log(prompt)
    if(!prompt) {return}      //return if there is no prompt message    
    if(isLoading) {return}    //return if request is already loading

    
    setisLoading(true);     // Set loading to true
    setresult("");    // Set result to empty string

    // Set the message. Role as user
    newMessages = [...messageList]
    newMessages.push({role: "user", content: prompt})
    setmessageList(newMessages)

    //Set the prompt to nothing. This is done in order to remove the text from the textarea
    setprompt("")
 
    // Send the request 
    try {

      console.log("HI");
      let response = await openai.createChatCompletion({ 
        
        model: "gpt-3.5-turbo",
        temperature: 0,
        // max_tokens: 4000,
        messages: newMessages,
      });
      console.log(response)
      // console.log(response)
      setisTypeWriting(true) //Set the typewriter effect to true

      //set the result to answer
      let answer = response.data.choices[0].message.content;
      console.log(answer)
      setresult(answer.trim())

      //Add response to the message List as role:assistant
      //Read the chat-completion OpenAI Docs for more context https://platform.openai.com/docs/api-reference/chat/create
      newMessages.push({role: "assistant", content: answer})
      setmessageList(newMessages)
      console.log(newMessages)

      

    }

    // Check if any errors 
    catch(error){
      console.log(error); 
    }
  
    // If Request is complete 
    finally{
      setisLoading(false)
    }


};


  return (

    // Main box 
    <div className="App mx-auto">

      {/* Navbar */}
      <nav className="nav-header font-bold pl-5 pr-5">   
        <div className='nav-div pb-4'>
          Auto Resume    
          
          {/* Link to codebase  */}
          <a href='https://github.com/bannu773' rel="noreferrer" target="_blank" >
            <span className='float-right mr-4'> <i className="fa fa-brands fa-github text-gray-400"></i></span>
          </a>
        </div>
      </nav>



        {/* Display paragraph */}

        <br></br><br></br><br></br><br></br>
        <div className='main pr-5 pl-5'>

            {/* About Auto Resume AI  */}         
              <div className='leading-loose text-sm text-gray-700'>
                <div className='font-bold text-pink-500'>Auto Resume</div>
                {isTypingWelcome ?
                  <Typewriter
                      onInit={(typewriter) => {
                        typewriter.typeString(welcomeText)
                      .start()
                      .callFunction(() => {
                        setisTypingWelcome(false)
                      })
                      }}
                      options={{
                        delay: 10,
                      }}
                    /> :
                    welcomeText
                  }
                
              </div>
          

            {/* Result paragraph */}
            <section>
              <div className='display-paragraph text-sm text-gray-700 leading-loose'>

              {/* Loop through the messages  */}
              {Array.isArray(messageList) ? messageList.map((post,index) => (
                  <div key={index} className="message-list">

                  {/* The role  */}
                  {
                    post.role ==='user' ?
                    <div className='mt-4 text-blue-500 font-bold'>Me</div>
                    :
                    <div className='mt-4 text-pink-500 font-bold'>Auto Resume</div>
                  }
                  

                  {/* Add type writter effect for new incoming messages  */}
                  {(index + 1 === messageList.length) && isTypeWriting ?   
                      <Typewriter
                      onInit={(typewriter) => {
                        typewriter.typeString(result)
                      .start()
                      .callFunction(() => {
                        setisTypeWriting(false)
                      })
                      }}
                      options={{
                        delay: 15,
                      }}
                    /> 
                    :post.content.trim()
                  }
                </div>
                  )) : ""}

                {/* If request is loading  */}
                { isLoading && 
                <div>
                  <div className='mt-4 text-pink-500 font-bold'>Auto Resume</div>
                  <span className='text-gray-400'>Searching...</span>
                </div>
                }
                
              </div>

            </section>
            

              <br></br>


          {/* Form input  */}
            <form className='mt-7' onSubmit={submitForm} method="post">
              <textarea 
              type="text" 
              required
              autoFocus={true}
              placeholder='Ask Auto Resume anything...'
              onChange = {e => setprompt(e.target.value)}
              value={prompt}
              className='w-full text-gray-700 text-sm p-2 pt-3 pb-3 pr-5 pl-5 rounded border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-0.5 focus:border-100 transition duration-0 hover:duration-150'
              ></textarea>

    
              <br></br>

              {/* submit button  */}
              <button 
                type="submit"
                disabled={isLoading}
                className={(isLoading ? 'none bg-gray-200 hover:bg-gray-200 text-gray-500 ' : ' bg-blue-500  hover:bg-blue-700') + 'none float-right rounded mt-7 text-sm text-white font-bold py-2 px-4 '}>
                Send <i className="fa-regular fa-paper-plane"></i>
              </button>


            </form>

        </div>

      <br></br><br></br><br></br>

       <div className='pl-5 pr-5'>
          <p className='reference text-xs text-gray-400'>Knowledge base up to September 2021</p>
          <a href='https://openai.com' rel="noreferrer" target="_blank" className='reference text-xs text-gray-400'>Reference: OpenAI.com</a>
      </div>
      <br></br><br></br><br></br>

     
    </div>
  );
}

export default App;
