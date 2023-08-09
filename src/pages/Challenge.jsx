import { Suspense, useState } from "react";
import { defer, useLoaderData, Await } from "react-router-dom";
import { getChallengeById } from "../api/api";
import * as React from 'react'
import Split from 'react-split'
import './challenge.css'

import { SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview,
  SandpackFileExplorer,
  SandpackTests,
  SandpackCodeViewer,
  SandpackConsole,

  useActiveCode,
  SandpackStack,
  FileTabs,
  useSandpack,
} from "@codesandbox/sandpack-react"
import { Editor } from "@monaco-editor/react";

export const loadChallenge = async ({ params }) => {
  const challengeId = params.challengeId
  const challenge = await getChallengeById(challengeId);
  return defer({ challenge });
};

function MonacoEditor(){
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  
  return (
    <SandpackStack style={{ height: "100%", margin: 0 }}>
      <FileTabs />
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="60vh"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      </div>
    </SandpackStack>
  );
  }

const Challenge = () => {
  const { challenge } = useLoaderData();
  console.log('challenges : ', challenge)
  const [files, setFiles] = useState(() => (JSON.parse(challenge.data.files)))
  const [showConsole, setShowConsole] = useState(true)
  const [showConsoleOnRight, setShowConsoleOnRight] = useState(true)
  console.log('files : ', files)

  if(!challenge.status){
    return <div>Error</div>
  }
  return (
    <>
    <SandpackProvider template="react" 
    theme="dark" 
    files={files}
    options={{ 
      visibleFiles: ["package.json"],
      activeFile: "/App.js",
      readOnly: true
    }}
  >
    <SandpackLayout>
     <div className="main_container">
      <div className="header_section">Header</div>
      <div className="main_section">
        <Split
        className="container"
        sizes={[50,50]}
        minSize={0}
        expandToMin={false}
        gutterSize={3}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        {
           !showConsoleOnRight ? showConsole ? (
            <div className="preview">
            <Split
              className="preview_console_container"
              sizes={[60,40]}   
              minSize={0}
              direction="vertical"
              gutterSize={3}
          >
              <div>
                <div className="section_header console_header">
                  <div>Problem</div>
                  <div>Preview</div>
                </div>
                <div >
                <div><SandpackPreview showNavigator  /></div>
                </div>
              </div>
              <div>
                <div className="console">
                 <div>Console / Tests</div>
                 <div><button onClick={() => setShowConsoleOnRight(current => !current)}>Right</button></div>
                </div>
                <div>
                <div><SandpackTests showNavigator style={{height: '100%', padding: '5px'}} /></div>
                </div>
              </div>
            </Split>
            <div className="console">
              <div><button onClick={() => setShowConsole(current => !current)}>Console</button></div>
              <div><button>Submit</button></div>
            </div>
            </div>
          ) : (
            <div className="preview">
            <div>
                <div className="section_header console_header">
                  <div>Problem</div>
                  <div>Preview</div>
                </div>
                <div>
                  <SandpackPreview />
                </div>
            </div>
            <div className="console">
              <div><button onClick={() => setShowConsole(current => !current)}>Console</button></div>
              <div><button>Submit</button></div>
            </div>
            </div>
          ) : (
            <div className="preview">
             <div>
                <div className="section_header console_header">
                  <div>Problem</div>
                  <div>Preview</div>
                </div>
                <div >
                <div><SandpackPreview showNavigator  /></div>
                </div>
             </div>
            </div>
          )
        }

       {
          showConsoleOnRight ? showConsole ? (
            <div className="preview">
            <Split
              className="preview_console_container"
              sizes={[60,40]}   
              minSize={0}
              direction="vertical"
              gutterSize={3}
          >
              <div>
                <div className="section_header console_header">
                  <div>javascript</div>
                  <div>Reset</div>
                </div>
                <MonacoEditor />
              </div>
              <div>
                <div className="console console_header">
                 <div>Console / Tests</div>
                 <div><button onClick={() => setShowConsoleOnRight(current => !current)}>Right</button></div>
                </div>
                <div style={{position: 'relative'}}>
                  <div><SandpackTests showNavigator style={{height: '100%', padding: '5px'}} /></div>
                </div>
              </div>
            </Split>
            <div className="console">
              <div><button onClick={() => setShowConsole(current => !current)}>Console</button></div>
              <div><button>Submit</button></div>
            </div>
            </div>
          ) : (
            <div className="preview">
            <div>
              <div className="section_header console_header">
                <div>javascript</div>
                <div>Reset</div>
              </div>
              <MonacoEditor />
            </div>
            <div className="console">
              <div><button onClick={() => setShowConsole(current => !current)}>Console</button></div>
              <div><button>Submit</button></div>
            </div>
          </div>
          ) : (
            <div className="preview">
               <div className="section_header console_header">
                  <div>javascript</div>
                  <div>Reset</div>
                </div>
                {/* <div> */}
                <MonacoEditor />
                {/* </div> */}
            </div>
          )
        }
  
        </Split>
      </div>
     </div>
     </SandpackLayout>
    </SandpackProvider>
    </>
  );
};

export default Challenge;
