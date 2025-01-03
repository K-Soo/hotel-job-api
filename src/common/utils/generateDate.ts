export function generateDate() {
  const now = new Date();
  const year = now.getFullYear().toString().substring(2); // 4자리에서 뒤 2자리만
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 1월이 0이므로 +1, 두 자리로 맞춤
  const day = now.getDate().toString().padStart(2, '0'); // 두 자리로 맞춤
  const hours = now.getHours().toString().padStart(2, '0'); // 두 자리로 맞춤
  const minutes = now.getMinutes().toString().padStart(2, '0'); // 두 자리로 맞춤
  const seconds = now.getSeconds().toString().padStart(2, '0'); // 두 자리로 맞춤

  const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

  return formattedDate;
}
