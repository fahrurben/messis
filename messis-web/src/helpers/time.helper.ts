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

export { strTimeToSeconds }
