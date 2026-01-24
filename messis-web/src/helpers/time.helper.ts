const strTimeToSeconds = (time: string): number => {
  const arr = time.split(":")
  if (arr.length > 1) {
    const [hourStr, minuteStr] = arr
    const hour = parseInt(hourStr)
    const minute = parseInt(minuteStr)

    return hour * 3600 + minute * 60
  }

  return 0
}

const secondsToTime = (seconds: number) => {
  const total_hour = Math.floor(seconds / 3600)
  const total_hour_str = total_hour.toString().padStart(2, "0")

  const total_minutes = Math.floor(seconds / 60)
  let total_minutes_str =
    total_minutes == 0 || total_minutes == 60 ? 0 : total_minutes
  total_minutes_str = total_minutes_str.toString().padStart(2, "0")

  return `${total_hour_str}:${total_minutes_str}`
}

export { strTimeToSeconds, secondsToTime }
