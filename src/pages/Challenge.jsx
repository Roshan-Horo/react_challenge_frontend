import { defer, useLoaderData, Await } from "react-router-dom";

import { getChallengeByName } from "../api";

export const challengeLoader = async ({ params }) => {
  const challengeName = params.challengeName;
  const challenge = await getChallengeByName(challengeName);
  return defer({ challenge });
};

import Editor from '@monaco-editor/react'


const Challenge = () => {
  const {challenge} = useLoaderData()

  // return (
  //   <section>
  //     <h2>{challenge?.data._id}</h2>
  //     <p>{challenge?.data.title}</p>

  //   </section>
  // );

  return (
    <div className="main_container">
     <div className="header_section">Header</div>
     <div className="main_section">
      <div className="description">
        <div className="section_header console_header">
          <div>Problem</div>
          <div>Preview</div>
        </div>
      </div>
      <div className="editor_and_test">
        <div className="section_header console_header">
          <div>javascript</div>
          <div>Reset</div>
        </div>
        <div>
        <Editor height="60vh" defaultLanguage="javascript" defaultValue="// some comment" />
        </div>
      </div>
     </div>
    </div>
  )
};

export default Challenge;
