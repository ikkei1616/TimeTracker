  //数字を"00:00"の形式に変化する関数
export const  formatSecondsToTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const paddedMins = String(mins).padStart(2, '0');
    const paddedSecs = String(secs).padStart(2, '0');
    return `${paddedMins}:${paddedSecs}`;
}