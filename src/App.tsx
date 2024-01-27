import React, { useState } from 'react';
import './App.css';
import { Editor } from '@monaco-editor/react';

function App() {
  const [code, setCode] = useState("");
  const getCode = () => {
    setCode(`def test():
    pass`);
  };

  const handleEditorChange = (value: any, event: any) => {
    setCode(value);
  };

  return (
    <div className="container">
      <div className="problem-statement">
      <p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong className="example">Example 1:</strong></p><pre><strong>Input:</strong> nums = [2,7,11,15], target = 9<strong>Output:</strong> [0,1]<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</pre><p><strong className="example">Example 2:</strong></p><pre><strong>Input:</strong> nums = [3,2,4], target = 6<strong>Output:</strong> [1,2]</pre><p><strong className="example">Example 3:</strong></p><pre><strong>Input:</strong> nums = [3,3], target = 6<strong>Output:</strong> [0,1]</pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul>	<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>	<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>	<li><strong>Only one valid answer exists.</strong></li></ul><p>&nbsp;</p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code>&nbsp; time complexity?
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
            onChange={handleEditorChange}
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
