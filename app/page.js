"use client"

import React, { useState, useCallback, useEffect, useRef } from "react"

export default function Home() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

// useRef

const passwordRef = useRef(null)

  const copyToClipboard = useCallback(() => {
    const inputElement = document.getElementById('inputField');

    if (inputElement) {
      const textToCopy = inputElement.value;
      if (textToCopy) {
        // here we cant get window pbject in next so i used js code
        navigator.clipboard.writeText(textToCopy)
          .then(() => passwordRef.current?.select())
          .catch(error => console.error('Could not copy to clipboard: ', error));
      }
      
    }
  },[password])
  

    const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (numberAllowed) str += "0123456789"
      if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"


      //  generating password 

      for (let i = 1; i <= length; i++) {
        let char = Math.floor(Math.random() * str.length + 1)
        pass += str.charAt(char)
      }
      setPassword(pass)
    }, [length, numberAllowed, charAllowed, setPassword])

    useEffect(() => { passwordGenerator() }, [length, numberAllowed, charAllowed, passwordGenerator])

  
    return (
      <>
        <div className=" h-[175px] w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8  text-orange-500 bg-gray-700">
          <br />
          <h1 className="text-white text-center my-3 ">Password Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text"
              id="inputField"
              ref={passwordRef}
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              readOnly />

            <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" onClick={copyToClipboard}>Copy</button>
          </div>

          <div className="flex text-sm gap-x-2">

            {/* radio */}
            <div className="flex item-center gap-x-1">
              <input
                type="range"
                min={6} max={100}
                value={length}
                className="curser-pointer"
                onChange={(e) => { setLength(e.target.value) }} />
              <label>Length : {length}</label>
            </div>

            {/* number checkbox */}
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                className="curser-pointer"
                onChange={() => { setNumberAllowed((prev) => !prev) }} />
              <label>Numbers</label>
            </div>

            {/* character checkbox */}
            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                className="curser-pointer"
                onChange={() => { setCharAllowed((prev) => !prev) }} />
              <label>Characters</label>
            </div>

          </div>

        </div>
      </>
    )
  };



