"use client"

import { useState } from "react"

export default function CommentForm() {
    // control the comment value with state
    const [comment, setComment] = useState("");

    return (
        <form className="p-2">
            <label htmlFor="comment">Make a Comment</label>
            <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => {
                    e.preventDefault();
                    setComment(e.target.value);
                }}
                className="border rounded w-full p-1"></textarea>
            <button type="submit" className="border rounded bg-gray-300 hover:bg-gray-400 active:bg-gray-500 hover:cursor-pointer px-1">Comment</button>
        </form>
    )
}