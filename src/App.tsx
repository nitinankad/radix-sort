import React, { useState } from 'react';
import './App.css';
import { Editor } from '@monaco-editor/react';

function App() {
  const [code, setCode] = useState("");
  const getCode = () => {
    setCode(`def test():
    pass`);
  };

  return (
    <div className="container">
      <div className="problem-statement">
      Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.



Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]



Constraints:

    2 {"<"}= nums.length {"<"}= 104
    -109 {"<"}= nums[i] {"<"}= 109
    -109 {"<"}= target {"<"}= 109
    Only one valid answer exists.
      </div>

      <div className="middle-content">
        <div className="editor--top">
          <button className="editor-tab" onClick={getCode}>Person 1</button>
          <button className="editor-tab" onClick={getCode}>Person 2</button>
          <button className="editor-tab" onClick={getCode}>Person 3</button>
        </div>
        <div className="editor">
          <Editor
            height={"95vh"}
            language={"python"}
            value={code}
          />
        </div>
      </div>

      <div className="chatbox">
        <div className="chat-logs">
          test
        </div>

        <div className="chat-message">
          <textarea className="chat-message-input" placeholder="Start a new message" />
        </div>
      </div>
    </div>
  );
}

export default App;
