export const formatTime = (seconds: number) => {
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}ч${minutes > 0 ? ' ' + minutes + ' мин' : ''}`;
  } else {
    return `${minutes} мин`;
  }
}

export const formatDistance = (meters: number) => {
  if (meters >= 1000) {
    const km = (meters / 1000).toFixed(1).replace('.', ',');
    return `${km} км`;
  } else {
    return `${meters} м`;
  }
}