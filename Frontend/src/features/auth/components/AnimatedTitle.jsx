import React, { useEffect, useState } from 'react'

const words = ['AI', 'Resume', 'Builder', 'and', 'Interview', 'Assistance']

const AnimatedTitle = () => {
    const [phase, setPhase] = useState('typing')
    const [wordIndex, setWordIndex] = useState(0)
    const [charIndex, setCharIndex] = useState(0)
    const [typedWords, setTypedWords] = useState([])

    useEffect(() => {
        const currentWord = words[wordIndex]
        let timeout

        if (phase === 'typing') {
            if (charIndex < currentWord.length) {
                timeout = setTimeout(() => setCharIndex(charIndex + 1), 120)
            } else {
                if (wordIndex === words.length - 1) {
                    timeout = setTimeout(() => setPhase('deleting'), 1000)
                } else {
                    timeout = setTimeout(() => {
                        setTypedWords(prev => [...prev, currentWord])
                        setWordIndex(prev => prev + 1)
                        setCharIndex(0)
                    }, 800)
                }
            }
        } else if (phase === 'deleting') {
            if (charIndex > 0) {
                timeout = setTimeout(() => setCharIndex(charIndex - 1), 80)
            } else {
                if (typedWords.length > 0) {
                    timeout = setTimeout(() => {
                        const nextIndex = wordIndex - 1
                        setTypedWords(prev => prev.slice(0, -1))
                        setWordIndex(nextIndex)
                        setCharIndex(words[nextIndex].length)
                    }, 500)
                } else {
                    timeout = setTimeout(() => {
                        setPhase('typing')
                        setWordIndex(0)
                        setCharIndex(0)
                    }, 1000)
                }
            }
        }

        return () => clearTimeout(timeout)
    }, [phase, wordIndex, charIndex, typedWords])

    const currentWord = words[wordIndex]
    const currentSegment = currentWord.slice(0, charIndex)
    const displayText = [...typedWords, currentSegment].filter(Boolean).join(' ')

    return (
        <div className="animated-title">
            <span>{displayText}</span>
            <span className="animated-title__cursor" aria-hidden="true">|</span>
        </div>
    )
}

export default AnimatedTitle
