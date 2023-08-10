import { defer, useLoaderData, Await, json } from "react-router-dom";
import Editor from '@monaco-editor/react'
import Split from 'react-split'
import { getChallengeByName } from "../api";

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
import Tabs, {TabContent} from "../components/Tabs";
import { useState } from "react";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export const challengeLoader = async ({ params }) => {
  const challengeName = params.challengeName;
  const challenge = await getChallengeByName(challengeName);
  return defer({ challenge });
};

const someJSCodeExample = `
  // The source (has been changed) is https://github.com/facebook/react/issues/5465#issuecomment-157888325

  const CANCELATION_MESSAGE = {
    type: 'cancelation',
    msg: 'operation is manually canceled',
  };

  function makeCancelable(promise) {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
      promise.then(val => hasCanceled_ ? reject(CANCELATION_MESSAGE) : resolve(val));
      promise.catch(reject);
    });

    return (wrappedPromise.cancel = () => (hasCanceled_ = true), wrappedPromise);
  }

  export default makeCancelable;
`;
const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`
const testMarkdown = `
## Overview

* Follows [CommonMark](https://commonmark.org)
* Optionally follows [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual React elements instead of using dangerouslySetInnerHTML
* Lets you define your own components (to render MyHeading instead of h1)
* Has a lot of plugins

## Table of contents

Here is an example of a plugin in action
([remark-toc](https://github.com/remarkjs/remark-toc)).
This section is replaced by an actual table of contents.

## Syntax highlighting

Here is an example of a plugin to highlight code:
[rehype-highlight](https://github.com/rehypejs/rehype-highlight).


`


function MonacoEditor(){
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();
  
  return (
    <SandpackStack style={{ height: "100%", margin: 0 }}>
      <FileTabs />
      {/* <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}> */}
        <Editor
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => updateCode(value || "")}
        />
      {/* </div> */}
    </SandpackStack>
  );
  }

const Challenge = () => {
  const {challenge} = useLoaderData()
  const [allTabs, setAllTabs] = useState([
    {
      tabName: "Challenge Description",
      content:  <ReactMarkdown className="markdown" rehypePlugins={[remarkGfm]}>{testMarkdown}</ReactMarkdown>,
    },
    {
      tabName: "Preview",
      content: <SandpackPreview showNavigator  />
    },
    {
      tabName: "Console",
      content: <SandpackConsole />
    }
  ]);
  const [activeTab, setActiveTab] = useState(allTabs[0]);

  // return (
  //   <section>
  //     <h2>{challenge?.data._id}</h2>
  //     <p>{challenge?.data.title}</p>

  //   </section>
  // );

  return (
    <SandpackProvider template="react" 
    theme="dark" 
    files={filesWithTests}
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
        gutterSize={5}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
      <div className="description">
      <Split
        className="vertical_container"
        sizes={[70,30]}
        minSize={10}
        expandToMin={false}
        gutterSize={5}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
      >
        <div>
          <Tabs
            allTabs={allTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabContent activeTab={activeTab} />
        </div>
        <div className="preview">
         <SandpackPreview showNavigator={true}  />
        </div>
      </Split>


      </div>
      <div className="editor_and_test">
      <Split
        className="vertical_container"
        sizes={[70,30]}
        minSize={10}
        expandToMin={false}
        gutterSize={5}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="vertical"
        cursor="row-resize"
      >
        <div>
          <div className="section_header console_header">
            <div>javascript</div>
            <div>Reset</div>
          </div>
          <div className="editor_container">
           <MonacoEditor />
          {/* <Editor 
            height="100%"
            theme="vs-dark"
            defaultLanguage="javascript" 
            defaultValue={someJSCodeExample}
          /> */}
          </div>
        </div>
        <div className="test_section">
          <div><SandpackTests showNavigator style={{height: '100%', padding: '5px'}} /></div>
        </div>
      </Split>

      </div>
      </Split>

     </div>
    </div>
    </SandpackLayout>
    </SandpackProvider>
  )
};

export default Challenge;

const filesWithTests = {
  "/styles.css": {
    code: `body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}`,
  },
  "/App.js": {
    code: `export default function App() {
return <h1>Doggy Directory</h1>
}
`,
  },
  "/index.js": {
    code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
<StrictMode>
  <App />
</StrictMode>
);`,
  },
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
  },
  "/tests/setup.js": {
    code: `
    import {expect, afterEach} from 'vitest'
    import {cleanup} from '@testing-library/react'
    import matchers from '@testing-library/jest-dom/matchers'

    expect.extend(matchers)

    afterEach(() => {
      cleanup();
    })
    `,
  },
  "/tests/App.test.jsx": {
    code: `
    import {render, screen} from '@testing-library/react'
    import App from '../App.js'
    import '@testing-library/jest-dom/extend-expect';

      test('renders headline', () => {
        render(<App />);
      
        expect(screen.getByRole("heading")).toHaveTextContent(/Doggy Directory/);
      })
    
    `,
  },
  "/add.ts": {
    code: `export const add = (a,b) => a + b;`,
  },
  "/package.json": {
    code: JSON.stringify({
      scripts: {
        start: "react-scripts start"
      },
      dependencies: {
        react: "^18.0.0",
        "react-dom": "^18.0.0",
        "react-scripts": "^5.0.0",
        "@testing-library/jest-dom": "^5.17.0",
        "@testing-library/react": "^14.0.0",
        "jsdom": "^22.1.0",
        "vitest": "^0.33.0",
      },
      main: "/index.js",
    }),
  },

};