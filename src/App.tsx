import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';
import { Editor } from '@monaco-editor/react';
import io from 'socket.io-client';

interface User {
  userId: string;
  name: string;
  code: string;
}

const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);

function App() {
  const [myCode, setMyCode] = useState("");
  const [myUserId, setMyUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [chatMessage, setChatMessage] = useState("");

  const [code, setCode] = useState("");
  const [isViewingOthersCode, setIsViewingOthersCode] = useState(false);

  const isViewingOthersCodeRef = useRef(isViewingOthersCode);

  useLayoutEffect(() => {
    isViewingOthersCodeRef.current = isViewingOthersCode;
  }, [isViewingOthersCode]);

  const viewCode = (userId: string, code: string, isOthersCode: boolean) => {
    const index = users.findIndex(user => user.userId === userId);

    if (index !== -1) {
      const user = users[index];
      setCode(user.code);
    } else {
      if (!isOthersCode) {
        setMyCode(code);
      }
    }

    setIsViewingOthersCode(isOthersCode);
  };

  const updateUserCode = (userId: string, newCode: string) => {
    setUsers(currentUsers => {
      const index = currentUsers.findIndex(user => user.userId === userId);

      if (index !== -1) {
        const updatedUsers = [...currentUsers];
        updatedUsers[index] = { ...updatedUsers[index], code: newCode };

        return updatedUsers;
      }

      return currentUsers;
    });
  };

  useEffect(() => {
    socket.emit("joined");

    socket.on("welcome", (welcomeData: any) => {
      const { userId, name, code } = welcomeData;
      console.log(`Got welcomed: ${JSON.stringify(welcomeData)}`);

      setMyUserId(userId);
      setMyCode(code);
      setCode(code);
    });

    socket.on("current users", (currentUsers: any) => {
      setUsers(prevUsers => [...prevUsers, ...currentUsers]);
    });

    socket.on("user joined", (userData: any) => {
      setUsers(prevUsers => [...prevUsers, userData]);
    });

    socket.on("user left", (userData: any) => {
      setUsers(prevUsers => prevUsers.filter(user => user.userId !== userData.userId));
    });

    socket.on("code update", (updatedCode) => {
      if (updatedCode.userId === myUserId) {
        setMyCode(updatedCode.code);
      } else {
        updateUserCode(updatedCode.userId, updatedCode.code);
      }
    });

    socket.on("chat message", (chatMessageData) => {
      const { user, message } = chatMessageData;

      const chatMessageDiv = document.createElement("div");
      chatMessageDiv.innerHTML = `<div>${user}: ${message}</div>`;

      const chatLogs = document.getElementById("chat-logs");
      chatLogs?.appendChild(chatMessageDiv);
    });

    return () => {
      socket.off("code update");
    };
    // react-hooks/exhaustive-deps
  }, []);

  const handleEditorChange = (value: any, event: any) => {
    if (isViewingOthersCodeRef.current) return;

    setMyCode(value);
    socket.emit("code change", value);
  };

  const handleChatMessageEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      socket.emit("sent chat message", chatMessage);
      setChatMessage("");
    }
  };

  const handleChatMessage = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setChatMessage(event.currentTarget.value);
  };

  return (
    <div className="container">
      <div className="problem-statement">
      <p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p><p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p><p>You can return the answer in any order.</p><p>&nbsp;</p><p><strong className="example">Example 1:</strong></p><pre><strong>Input:</strong> nums = [2,7,11,15], target = 9<strong>Output:</strong> [0,1]<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</pre><p><strong className="example">Example 2:</strong></p><pre><strong>Input:</strong> nums = [3,2,4], target = 6<strong>Output:</strong> [1,2]</pre><p><strong className="example">Example 3:</strong></p><pre><strong>Input:</strong> nums = [3,3], target = 6<strong>Output:</strong> [0,1]</pre><p>&nbsp;</p><p><strong>Constraints:</strong></p><ul>	<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>	<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>	<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>	<li><strong>Only one valid answer exists.</strong></li></ul><p>&nbsp;</p><strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code>&nbsp; time complexity?
      </div>

      <div className="middle-content">
        <div className="editor--top">
          <button className="editor-tab" onClick={() => viewCode("", myCode, false)}>Me</button>
          {users.map((user) => (
            <button key={user.userId} className="editor-tab" onClick={() => viewCode(user.userId, user.code, true)}>{user.name}</button>
          ))}
        </div>
        <div className="editor">
          <Editor
            height={"95vh"}
            language={"python"}
            value={isViewingOthersCode ? code : myCode}
            onChange={handleEditorChange}
            options={{ readOnly: isViewingOthersCode }}
          />
        </div>
      </div>

      <div className="chatbox">
        <div id="chat-logs" className="chat-logs">
          <div>Welcome to Radix Sort</div>
        </div>

        <div className="chat-message">
          <textarea
            className="chat-message-input"
            placeholder="Start a new message"
            value={chatMessage}
            onKeyDown={handleChatMessageEnter}
            onChange={handleChatMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
