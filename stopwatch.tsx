"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isRunning) {
      intervalId = setInterval(() => setTime(time => time + 10), 10)
    }
    return () => clearInterval(intervalId)
  }, [isRunning])

  const hours = Math.floor(time / 3600000)
  const minutes = Math.floor((time % 3600000) / 60000)
  const seconds = Math.floor((time % 60000) / 1000)
  const milliseconds = time % 1000

  const formatTime = (val: number) => val.toString().padStart(2, '0')

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Stopwatch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-6xl font-mono text-center mb-6 tabular-nums">
            {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}.${formatTime(Math.floor(milliseconds / 10))}`}
          </div>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={handleStartStop}
              variant={isRunning ? "destructive" : "default"}
            >
              {isRunning ? 'Stop' : 'Start'}
            </Button>
            <Button 
              onClick={handleReset}
              variant="outline"
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}