export default function validationLogin(playerDate: string): boolean {
  const regex = {
    searchGroupedDate: new RegExp(
      '(?<year>[0-9]{2})-(?<month>[0-9]{2})-(?<day>[0-9]{2})',
    ),
  };

  const matchResultCurrent = new Date()
    .toISOString()
    .match(regex.searchGroupedDate);
  const matchResultPlayer = playerDate.match(regex.searchGroupedDate);
  // console.log(matchResult);
  // console.log(matchResult?.groups);

  const pDay = matchResultPlayer?.groups?.day || 0;
  const pMonth = matchResultPlayer?.groups?.month || 0;
  const pYear = matchResultPlayer?.groups?.year || 0;

  const cDay = matchResultCurrent?.groups?.day || 0;
  const cMonth = matchResultCurrent?.groups?.month || 0;
  const cYear = matchResultCurrent?.groups?.year || 0;

  if (pYear > cYear) return true;
  if (pMonth > cMonth) return true;
  if (pDay > cDay) return true;

  return false;
}
