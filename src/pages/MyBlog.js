import { useState } from "react";
import { FaArrowRight, FaCalendar, FaIdBadge, FaTerminal } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import BounceButton from "../components/BounceButton";

const TerminalCommand = ({ text, output }) => {
    const [copied, setCopied] = useState(false)
    return (
        <div className="my-8">
            <BounceButton
                className={`bg-slate-100 w-full text-left p-2 rounded-lg border-[1px] ${copied ? 'border-blue-400 border-[2px]' : ''}`}
                onClick={() => { setCopied(!copied) }}
            >
                <FaTerminal className="inline mr-3 text-gray-400" /> {text}
                {/* <span className="text-right w-100 bg-red-200">COPIED</span> */}
            </BounceButton>
            <div className="bg-slate-50 mt-5 p-2 rounded-lg border-[1px] text-gray-500">
                {output.split('\n').map(t => <div>{t}</div>)}
            </div>
        </div>
    )
}

const CodeSnippet = (props) => {
    return (
        <BounceButton className='block w-full mb-6'>
            <SyntaxHighlighter
                language={props.language}
                className='rounded-lg text-left border-[1px]'
                customStyle={{ padding: '20px', backgroundColor: '#FAFAFA' }}
                wrapLines={true}
                showLineNumbers={true}
                lineProps={(i) => { return { style: { opacity: (props.newLines.includes(i)) ? '100%' : '50%' } } }}
            >
                {props.code}
            </SyntaxHighlighter>
        </BounceButton >
    )
}
const MyBlog = () => {
    return (
        <div className="py-16 px-32">
            <div className="mb-6">
                <h1 className="text-4xl ">Lorem ipsum dolox sit amet?</h1>
                <div className="text-slate-400 align-middle">

                    15th June, 2022
                </div>

            </div>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <TerminalCommand text={"python my_stript.py"} output={"Hello world\nHello wotld."} />
            <p className="my-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h1 className="text-2xl mb-6">Lorem ipsum dolox sit amet?</h1>
            <p className="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <h1 className="text-2xl mb-6">Lorem ipsum dolox sit amet?</h1>
            <p className="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <CodeSnippet
                language='python'
                newLines={[1, 3]}
                code={`x = 8\ndef hello():\n\tpass`}
            />
            <p className="mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>


            <TerminalCommand text={"python my_stript.py"} output={"Hello world\nHello wotld."} />
            <hr />

        </div>
    )
}

export default MyBlog;